import { WPPost } from './types';
import { exhibitions, exhibitionToWPPost } from './exhibitionsDataNew';

// Reference date: March 10, 2026
const today = new Date(2026, 2, 10);

// Get upcoming exhibitions (start date is after today)
export function getUpcomingExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions
    .filter(exhibition => {
      // Priority 1: Check explicit status tag
      if (exhibition.status === 'upcoming') return true;
      if (exhibition.status === 'current' || exhibition.status === 'past') return false;
      
      // Priority 2: Fall back to date calculation if status doesn't match
      const startDate = new Date(exhibition.fromDate);
      return startDate > today;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(exhibition => exhibitionToWPPost(exhibition, language));
}

// Get current exhibitions (today is between start and end date)
export function getCurrentExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions
    .filter(exhibition => {
      // Priority 1: Check explicit status tag
      if (exhibition.status === 'current') return true;
      if (exhibition.status === 'upcoming' || exhibition.status === 'past') return false;
      
      // Priority 2: Fall back to date calculation if status doesn't match
      const startDate = new Date(exhibition.fromDate);
      // Handle "Onwards" as ongoing exhibitions (no end date)
      const endDate = exhibition.toDate === 'Onwards' 
        ? new Date(9999, 11, 31) // Far future date for ongoing exhibitions
        : new Date(exhibition.toDate);
      return today >= startDate && today <= endDate;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(exhibition => exhibitionToWPPost(exhibition, language));
}

// Get past exhibitions (end date is before today)
export function getPastExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions
    .filter(exhibition => {
      // Priority 1: Check explicit status tag
      if (exhibition.status === 'past') return true;
      if (exhibition.status === 'current' || exhibition.status === 'upcoming') return false;
      
      // Priority 2: Fall back to date calculation if status doesn't match
      // Ongoing exhibitions (Onwards) are never past
      if (exhibition.toDate === 'Onwards') return false;
      const endDate = new Date(exhibition.toDate);
      return endDate < today;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(exhibition => exhibitionToWPPost(exhibition, language));
}

export const exhibitionHelpers = {
  getUpcomingExhibitions,
  getCurrentExhibitions,
  getPastExhibitions
};
// @ts-nocheck
/**
 * Exhibition Helper Functions
 * Implements status-first filtering pattern from DATA_ARCHITECTURE_DETAIL_LISTING.md
 */

import { WPPost } from './types';
import { exhibitions, Exhibition, getExhibitionBySlug } from './exhibitionsDataNew';
import { getCurrentDate } from './dateHelpers';

/**
 * Convert Exhibition to WPPost format (for display)
 */
export function exhibitionToWPPost(
  exhibition: Exhibition,
  language: 'en' | 'th'
): WPPost {
  return {
    id: exhibition.id,
    slug: exhibition.slug,
    type: 'exhibition',
    title: exhibition.title[language],
    date: exhibition.dateDisplay[language],
    content: '',
    categories: exhibition.tags ? exhibition.tags.split(',').map(t => t.trim()) : [],
    featuredImage: exhibition.featuredImage ? {
      sourceUrl: exhibition.featuredImage,
      altText: exhibition.title[language]
    } : undefined,
    gallery: exhibition.gallery,
    acf: {
      artist: exhibition.artist[language],
      curator: exhibition.curator[language],
      fromDate: exhibition.fromDate,
      toDate: exhibition.toDate,
      status: exhibition.status,
      listing_summary: exhibition.listingSummary?.[language],
      imageCredits: exhibition.imageCredits,
    }
  };
}

/**
 * Status-First Filtering: Current Exhibitions
 * 
 * Priority 1: Check explicit status field
 * Priority 2: Fall back to date calculation
 */
export function getCurrentExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  const today = getCurrentDate();
  
  return exhibitions
    .filter(ex => {
      // ═══════════════════════════════════════════════════════
      // PRIORITY 1: Explicit Status
      // ═══════════════════════════════════════════════════════
      if (ex.status === 'current') return true;
      if (ex.status === 'upcoming' || ex.status === 'past') return false;
      
      // ═══════════════════════════════════════════════════════
      // PRIORITY 2: Date Calculation Fallback
      // ═══════════════════════════════════════════════════════
      const start = new Date(ex.fromDate);
      const end = ex.toDate === 'Onwards' 
        ? new Date(9999, 11, 31)  // Ongoing = far future
        : new Date(ex.toDate);
      
      return today >= start && today <= end;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

/**
 * Status-First Filtering: Upcoming Exhibitions
 */
export function getUpcomingExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  const today = getCurrentDate();
  
  return exhibitions
    .filter(ex => {
      // Priority 1: Explicit status
      if (ex.status === 'upcoming') return true;
      if (ex.status === 'current' || ex.status === 'past') return false;
      
      // Priority 2: Date fallback
      const start = new Date(ex.fromDate);
      return today < start;
    })
    .sort((a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

/**
 * Status-First Filtering: Past Exhibitions
 */
export function getPastExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  const today = getCurrentDate();
  
  return exhibitions
    .filter(ex => {
      // Priority 1: Explicit status
      if (ex.status === 'past') return true;
      if (ex.status === 'current' || ex.status === 'upcoming') return false;
      
      // Priority 2: Date fallback
      if (ex.toDate === 'Onwards') return false;
      const end = new Date(ex.toDate);
      return today > end;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

/**
 * Get all exhibitions (for archives)
 */
export function getAllExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

/**
 * Get exhibition by slug
 */
export function getExhibitionBySlugWithLanguage(
  slug: string,
  language: 'en' | 'th' = 'en'
): WPPost | undefined {
  const exhibition = getExhibitionBySlug(slug);
  return exhibition ? exhibitionToWPPost(exhibition, language) : undefined;
}

/**
 * Get exhibitions by year
 */
export function getExhibitionsByYear(
  year: string,
  language: 'en' | 'th' = 'en'
): WPPost[] {
  return exhibitions
    .filter(ex => ex.year === year)
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

/**
 * Get featured/permanent exhibitions
 */
export function getPermanentExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions
    .filter(ex => ex.toDate === 'Onwards')
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

/**
 * Search exhibitions by text
 */
export function searchExhibitions(
  query: string,
  language: 'en' | 'th' = 'en'
): WPPost[] {
  const lowerQuery = query.toLowerCase();
  
  return exhibitions
    .filter(ex => {
      const searchText = [
        ex.title[language],
        ex.artist[language],
        ex.curator[language],
        ex.listingSummary?.[language] || '',
        ex.tags || ''
      ].join(' ').toLowerCase();
      
      return searchText.includes(lowerQuery);
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

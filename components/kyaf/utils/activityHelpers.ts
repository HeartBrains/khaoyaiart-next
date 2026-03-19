// @ts-nocheck
/**
 * Activity Helper Functions
 * Implements status-first filtering pattern
 */

import { WPPost } from './types';
import { activities, Activity, getActivityBySlug } from './activitiesDataNew';
import { getCurrentDate } from './dateHelpers';

/**
 * Convert Activity to WPPost format (for display)
 */
export function activityToWPPost(
  activity: Activity,
  language: 'en' | 'th'
): WPPost {
  return {
    id: activity.id,
    slug: activity.slug,
    type: 'activity',
    title: activity.title[language],
    date: activity.dateDisplay[language],
    content: activity.description[language],
    categories: activity.category ? [activity.category] : [],
    featuredImage: activity.featuredImage ? {
      sourceUrl: activity.featuredImage,
      altText: activity.title[language]
    } : undefined,
    gallery: activity.gallery,
    acf: {
      location: activity.location?.[language],
      fromDate: activity.fromDate,
      toDate: activity.toDate,
      status: activity.status,
      listing_summary: activity.listingSummary?.[language],
      duration: activity.duration?.[language],
      imageCredits: activity.imageCredits,
    }
  };
}

/**
 * Status-First Filtering: Current Activities
 */
export function getCurrentActivities(language: 'en' | 'th' = 'en'): WPPost[] {
  const today = getCurrentDate();
  
  return activities
    .filter(act => {
      // Priority 1: Explicit status
      if (act.status === 'current') return true;
      if (act.status === 'upcoming' || act.status === 'past') return false;
      
      // Priority 2: Date fallback
      const start = new Date(act.fromDate);
      const end = act.toDate === 'Onwards' 
        ? new Date(9999, 11, 31)
        : new Date(act.toDate);
      
      return today >= start && today <= end;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

/**
 * Status-First Filtering: Upcoming Activities
 */
export function getUpcomingActivities(language: 'en' | 'th' = 'en'): WPPost[] {
  const today = getCurrentDate();
  
  return activities
    .filter(act => {
      // Priority 1: Explicit status
      if (act.status === 'upcoming') return true;
      if (act.status === 'current' || act.status === 'past') return false;
      
      // Priority 2: Date fallback
      const start = new Date(act.fromDate);
      return today < start;
    })
    .sort((a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

/**
 * Status-First Filtering: Past Activities
 */
export function getPastActivities(language: 'en' | 'th' = 'en'): WPPost[] {
  const today = getCurrentDate();
  
  return activities
    .filter(act => {
      // Priority 1: Explicit status
      if (act.status === 'past') return true;
      if (act.status === 'current' || act.status === 'upcoming') return false;
      
      // Priority 2: Date fallback
      if (act.toDate === 'Onwards') return false;
      const end = new Date(act.toDate);
      return today > end;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

/**
 * Get all activities (for archives)
 */
export function getAllActivities(language: 'en' | 'th' = 'en'): WPPost[] {
  return activities
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

/**
 * Get activity by slug
 */
export function getActivityBySlugWithLanguage(
  slug: string,
  language: 'en' | 'th' = 'en'
): WPPost | undefined {
  const activity = getActivityBySlug(slug);
  return activity ? activityToWPPost(activity, language) : undefined;
}

/**
 * Get activities by category
 */
export function getActivitiesByCategoryWithLanguage(
  category: string,
  language: 'en' | 'th' = 'en'
): WPPost[] {
  return activities
    .filter(act => act.category === category)
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

/**
 * Get ongoing/permanent activities
 */
export function getPermanentActivities(language: 'en' | 'th' = 'en'): WPPost[] {
  return activities
    .filter(act => act.toDate === 'Onwards')
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

/**
 * Search activities by text
 */
export function searchActivities(
  query: string,
  language: 'en' | 'th' = 'en'
): WPPost[] {
  const lowerQuery = query.toLowerCase();
  
  return activities
    .filter(act => {
      const searchText = [
        act.title[language],
        act.description[language],
        act.listingSummary?.[language] || '',
        act.category || '',
        act.location?.[language] || ''
      ].join(' ').toLowerCase();
      
      return searchText.includes(lowerQuery);
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(act => activityToWPPost(act, language));
}

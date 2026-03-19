/**
 * Data Adapter
 * Converts new data structures (Exhibition, Activity) to legacy WPPost format
 * This allows gradual migration while maintaining backward compatibility
 */

import { WPPost } from './types';
import { Exhibition } from './exhibitionsDataNew';
import { Activity } from './activitiesDataNew';

/**
 * Convert Exhibition to WPPost format (bilingual)
 */
export function exhibitionToWPPost(exhibition: Exhibition, language: 'en' | 'th'): WPPost {
  return {
    id: exhibition.id,
    slug: exhibition.slug,
    type: 'exhibition',
    title: exhibition.title[language],
    date: exhibition.dateDisplay[language],
    content: '', // Content comes from detailContent.ts
    featuredImage: {
      sourceUrl: exhibition.featuredImage,
      altText: exhibition.title[language]
    },
    categories: exhibition.categories[language],
    acf: {
      artist: exhibition.artist[language],
      curator: exhibition.curator[language],
      listing_summary: exhibition.listingSummary[language],
      status: exhibition.status,
      tags: exhibition.tags?.[language] || [],
      specifications: exhibition.specifications?.[language] || {}
    },
    gallery: exhibition.gallery || [exhibition.featuredImage]
  };
}

/**
 * Convert Activity to WPPost format (bilingual)
 */
export function activityToWPPost(activity: Activity, language: 'en' | 'th'): WPPost {
  return {
    id: activity.id,
    slug: activity.slug,
    type: 'activity',
    title: activity.title[language],
    date: activity.dateDisplay[language],
    content: '', // Content comes from detailContent.ts
    featuredImage: {
      sourceUrl: activity.featuredImage,
      altText: activity.title[language]
    },
    categories: activity.categories[language],
    acf: {
      artist: activity.artist?.[language],
      listing_summary: activity.listingSummary[language],
      status: activity.status,
      tags: activity.tags?.[language] || [],
      type_label: activity.typeLabel?.[language]
    },
    gallery: activity.gallery || [activity.featuredImage]
  };
}

/**
 * Create bilingual post object (matches old structure)
 */
export function createBilingualPost(
  exhibition: Exhibition
): { en: WPPost; th: WPPost };

export function createBilingualPost(
  activity: Activity
): { en: WPPost; th: WPPost };

export function createBilingualPost(
  item: Exhibition | Activity
): { en: WPPost; th: WPPost } {
  // Type guard to check if it's an Exhibition
  const isExhibition = 'curator' in item;
  
  if (isExhibition) {
    return {
      en: exhibitionToWPPost(item as Exhibition, 'en'),
      th: exhibitionToWPPost(item as Exhibition, 'th')
    };
  } else {
    return {
      en: activityToWPPost(item as Activity, 'en'),
      th: activityToWPPost(item as Activity, 'th')
    };
  }
}

/**
 * Get single post by slug (returns bilingual object)
 */
export function getPostBySlug(
  slug: string,
  exhibitions: Exhibition[],
  activities: Activity[]
): { en: WPPost; th: WPPost } | undefined {
  // Check exhibitions first
  const exhibition = exhibitions.find(ex => ex.slug === slug);
  if (exhibition) {
    return createBilingualPost(exhibition);
  }
  
  // Check activities
  const activity = activities.find(act => act.slug === slug);
  if (activity) {
    return createBilingualPost(activity);
  }
  
  return undefined;
}

/**
 * Get all posts of a specific type
 */
export function getPostsByType(
  type: 'exhibition' | 'activity',
  exhibitions: Exhibition[],
  activities: Activity[]
): { en: WPPost; th: WPPost }[] {
  if (type === 'exhibition') {
    return exhibitions.map(ex => createBilingualPost(ex));
  } else {
    return activities.map(act => createBilingualPost(act));
  }
}

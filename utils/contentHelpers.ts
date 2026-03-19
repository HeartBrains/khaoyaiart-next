/**
 * Content Filtering Helpers
 * Implements status-first logic pattern for all content types
 */

import { WPPost } from './types';
import { isDateInRange, isPastDate, isFutureDate } from './dateHelpers';

export type ContentStatus = 'current' | 'upcoming' | 'past';

/**
 * Status-First Logic Pattern
 * Always check explicit status FIRST, then fall back to date-based logic
 */

/**
 * Get current items (status-first logic)
 */
export function getCurrentItems(items: WPPost[]): WPPost[] {
  return items.filter(item => {
    // Priority 1: Check explicit status tag
    const status = item.acf?.status as ContentStatus | undefined;
    if (status === 'current') return true;
    if (status === 'upcoming' || status === 'past') return false;

    // Priority 2: Fall back to date calculation if no status or status doesn't match
    const fromDate = item.acf?.fromDate || item.date;
    const toDate = item.acf?.toDate || item.date;
    
    if (!fromDate) return false;
    return isDateInRange(fromDate, toDate);
  });
}

/**
 * Get upcoming items (status-first logic)
 */
export function getUpcomingItems(items: WPPost[]): WPPost[] {
  return items.filter(item => {
    // Priority 1: Check explicit status tag
    const status = item.acf?.status as ContentStatus | undefined;
    if (status === 'upcoming') return true;
    if (status === 'current' || status === 'past') return false;

    // Priority 2: Fall back to date calculation
    const fromDate = item.acf?.fromDate || item.date;
    
    if (!fromDate) return false;
    return isFutureDate(fromDate);
  });
}

/**
 * Get past items (status-first logic)
 */
export function getPastItems(items: WPPost[]): WPPost[] {
  return items.filter(item => {
    // Priority 1: Check explicit status tag
    const status = item.acf?.status as ContentStatus | undefined;
    if (status === 'past') return true;
    if (status === 'current' || status === 'upcoming') return false;

    // Priority 2: Fall back to date calculation
    const toDate = item.acf?.toDate || item.date;
    
    if (!toDate) return false;
    if (toDate === 'Onwards' || toDate === 'ต่อเนื่อง') return false;
    return isPastDate(toDate);
  });
}

/**
 * Get item by slug
 */
export function getItemBySlug(items: WPPost[], slug: string): WPPost | undefined {
  return items.find(item => item.slug === slug);
}

/**
 * Filter items by category
 */
export function getItemsByCategory(items: WPPost[], category: string): WPPost[] {
  return items.filter(item => 
    item.categories?.includes(category) || 
    item.acf?.categories?.includes(category)
  );
}

/**
 * Filter items by type
 */
export function getItemsByType(items: WPPost[], type: string): WPPost[] {
  return items.filter(item => item.type === type);
}

/**
 * Sort items by date (newest first)
 */
export function sortByDateDesc(items: WPPost[]): WPPost[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.acf?.fromDate || a.date);
    const dateB = new Date(b.acf?.fromDate || b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Sort items by date (oldest first)
 */
export function sortByDateAsc(items: WPPost[]): WPPost[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.acf?.fromDate || a.date);
    const dateB = new Date(b.acf?.fromDate || b.date);
    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Get featured items
 */
export function getFeaturedItems(items: WPPost[]): WPPost[] {
  return items.filter(item => item.acf?.featured === true);
}

/**
 * Search items by text (title, content, artist)
 */
export function searchItems(items: WPPost[], query: string): WPPost[] {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => {
    const searchableText = [
      item.title,
      item.content,
      item.acf?.artist,
      item.acf?.subtitle,
      ...(item.categories || [])
    ].join(' ').toLowerCase();
    
    return searchableText.includes(lowerQuery);
  });
}

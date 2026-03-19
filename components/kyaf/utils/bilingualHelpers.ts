/**
 * Bilingual Content Helpers
 * Utilities for working with bilingual data structures
 */

import { BilingualText } from './types';

/**
 * Get text in current language
 */
export function getText(
  bilingualText: BilingualText | string,
  language: 'en' | 'th'
): string {
  if (typeof bilingualText === 'string') {
    return bilingualText;
  }
  return bilingualText[language];
}

/**
 * Get class name with Thai line-height if needed
 */
export function getThaiClass(
  language: 'en' | 'th',
  baseClass: string = ''
): string {
  const thaiLineHeight = language === 'th' ? 'leading-[1.82em]' : '';
  return `${baseClass} ${thaiLineHeight}`.trim();
}

/**
 * Format list with language-specific separators
 * English: "Item 1, Item 2, and Item 3"
 * Thai: "รายการ 1, รายการ 2 และ รายการ 3"
 */
export function formatList(
  items: string[],
  language: 'en' | 'th'
): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    const separator = language === 'th' ? ' และ ' : ' and ';
    return items.join(separator);
  }
  
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1);
  const separator = language === 'th' ? ' และ ' : ', and ';
  
  return otherItems.join(', ') + separator + lastItem;
}

/**
 * Truncate text with language-appropriate ellipsis
 */
export function truncateText(
  text: string,
  maxLength: number,
  language: 'en' | 'th'
): string {
  if (text.length <= maxLength) return text;
  
  // For Thai, prefer breaking at spaces
  if (language === 'th') {
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }
  }
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Pluralize words (English only, Thai doesn't pluralize)
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string,
  language: 'en' | 'th'
): string {
  if (language === 'th') {
    return `${count} ${singular}`;
  }
  return `${count} ${count === 1 ? singular : plural}`;
}

/**
 * Get ordinal number text
 * English: "1st", "2nd", "3rd", "4th"
 * Thai: "ที่ 1", "ที่ 2", "ที่ 3", "ที่ 4"
 */
export function getOrdinal(
  num: number,
  language: 'en' | 'th'
): string {
  if (language === 'th') {
    return `ที่ ${num}`;
  }
  
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Combine bilingual content safely
 */
export function createBilingualText(
  en: string,
  th: string
): BilingualText {
  return { en, th };
}

/**
 * Check if text is empty in both languages
 */
export function isBilingualEmpty(text: BilingualText): boolean {
  return !text.en.trim() && !text.th.trim();
}

/**
 * Get reading time estimate (words per minute)
 * English: 200 WPM, Thai: 150 WPM (average)
 */
export function getReadingTime(
  text: string,
  language: 'en' | 'th'
): number {
  const wordsPerMinute = language === 'th' ? 150 : 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format reading time with language-specific text
 */
export function formatReadingTime(
  minutes: number,
  language: 'en' | 'th'
): string {
  if (language === 'th') {
    return `${minutes} นาที`;
  }
  return `${minutes} min read`;
}

// Language Context
export { useLanguage, LanguageProvider } from './languageContext';

// Translations
export { translations } from './translations';

// Site Configuration
export {
  siteConfig,
  getEmptyStateMessage,
  isMenuVisible,
  isSectionVisible,
  isHomeSectionVisible
} from './siteConfig';

// Date Helpers
export {
  formatDateDisplay,
  formatDateRange,
  toBuddhistYear,
  parseISODate,
  getCurrentDate,
  isPastDate,
  isFutureDate,
  isDateInRange
} from './dateHelpers';

// Content Helpers
export {
  getCurrentItems,
  getUpcomingItems,
  getPastItems,
  getItemBySlug,
  getItemsByCategory,
  getItemsByType,
  sortByDateDesc,
  sortByDateAsc,
  getFeaturedItems,
  searchItems
} from './contentHelpers';
export type { ContentStatus } from './contentHelpers';

// Exhibition Helpers
export {
  getCurrentExhibitions,
  getUpcomingExhibitions,
  getPastExhibitions,
  getAllExhibitions,
  getExhibitionBySlugWithLanguage,
  getPermanentExhibitions,
  searchExhibitions,
  exhibitionToWPPost
} from './exhibitionHelpers';

// Activity Helpers
export {
  getCurrentActivities,
  getUpcomingActivities,
  getPastActivities,
  getAllActivities,
  getActivityBySlugWithLanguage,
  getActivitiesByCategoryWithLanguage,
  getPermanentActivities,
  searchActivities,
  activityToWPPost
} from './activityHelpers';

// Bilingual Helpers
export {
  getText,
  getThaiClass,
  formatList,
  truncateText,
  pluralize,
  getOrdinal,
  createBilingualText,
  isBilingualEmpty,
  getReadingTime,
  formatReadingTime
} from './bilingualHelpers';

// Types
export type {
  WPImage,
  WPScheduleItem,
  WPPost,
  BilingualText,
  Exhibition,
  Activity,
  TeamMember,
  PressItem
} from './types';

// Data exports
export { exhibitions, getExhibitionBySlug, getExhibitionsByStatus, getExhibitionsByYear } from './exhibitionsDataNew';
export type { Exhibition as ExhibitionData } from './exhibitionsDataNew';

export { activities, getActivityBySlug, getActivitiesByStatus, getActivitiesByYear } from './activitiesDataNew';
export type { Activity as ActivityData } from './activitiesDataNew';

export {
  createBilingualPost,
  exhibitionToWPPost as convertExhibitionToPost,
  activityToWPPost as convertActivityToPost,
  getPostBySlug
} from './dataAdapter';

export * from './imageConstants';

// Team / Press / Residency
export { FOUNDER, DIRECTORS, ADVISORY_BOARD_MEMBERS } from './teamDataBilingual';
export { PRESS_ITEMS } from './pressDataBilingual';
export { ARTISTS_DATA } from './residencyData';

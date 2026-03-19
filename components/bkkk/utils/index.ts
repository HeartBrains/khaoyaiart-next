// Configuration
export { siteConfig, getEmptyStateMessage } from './siteConfig';

// Translation and Language
export { translations, getTranslation } from './translations';
export { LanguageProvider, useLanguage } from './languageContext';

// Types
export type { WPImage, WPScheduleItem, WPPost } from './types';

// Exhibitions
export { exhibitions, exhibitionToWPPost, getExhibitionsWithStatus, getExhibitionBySlug } from './exhibitionsDataNew';
export * from './exhibitionHelpers';

// Moving Image
export { movingImagePrograms, getMovingImageProgramBySlug, getCurrentMovingImageProgram } from './movingImageData';
export { movingImageGalleries } from './movingImageGalleryData';

// Residency
export { ARTISTS_DATA, getArtistWithContent } from './residencyData';
export { RESIDENCY_CREDITS, getResidencyCredits, getResidencyCreditByIndex } from './residencyCreditData';

// Team / Press / Mock
export { FOUNDER, DIRECTORS, TEAM_GROUPS } from './teamDataBilingual';
export { PRESS_ITEMS } from './pressDataBilingual';
export { MOCK_POSTS_BILINGUAL, getMockPost, getMockPostsByType, MOCK_POSTS, MOCK_ACTIVITY } from './mockDataBilingual';

// Detail Content
export {
  DETAIL_CONTENT,
  getDetailContent,
  getDetailsByCategory,
  getDetailContentByLanguage,
} from './detailContent';

export {
  DETAIL_CONTENT_THAI,
  getDetailContentThai,
} from './detailContentThaiData';

// Search
export { getFullSearchData } from './searchData';

// Date and Status Helpers
export {
  determineStatus,
  determineStatusFromPeriod,
  isCurrentlyActive,
  isUpcoming,
  isPast,
  sortByStatusAndDate,
} from './dateStatusHelper';

// Assets
export * from './assets';

// Records
export * from './records';

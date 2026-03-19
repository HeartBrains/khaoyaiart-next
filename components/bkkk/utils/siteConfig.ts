/**
 * Site Configuration
 * Centralized configuration for editable site-wide messages and settings
 */

export const siteConfig = {
  // Main menu visibility controls - toggle menu items
  menu: {
    home: true,
    visit: true,
    exhibitions: true,
    movingImage: true,
    activities: false,
    residency: true,
    blog: false,
    about: true,
    team: true,
    shop: false,
    archives: false,
    contact: true,
    languageSwitcher: false,
    search: true,
  },

  // Home page anchor menu visibility controls
  homeAnchors: {
    currentExhibitions: true,
    upcomingExhibitions: true,
    currentMovingImageProgram: true,
    currentActivities: false,
  },

  // Section visibility controls - toggle submenu items and listing pages
  visibility: {
    exhibitions: {
      upcoming: true,
      current: true,
      past: true,
    },
    movingImage: {
      upcoming: true,
      current: true,
      past: true,
    },
    activities: {
      publicProgram: true,
      screenings: true,
    },
    residency: {
      upcoming: true,
      current: true,
      past: true,
    },
    shop: {
      bookings: true,
      products: true,
    },
    archives: {
      pastExhibitions: true,
      pastActivities: true,
    }
  },
  
  // Empty state messages - editable from here
  emptyStates: {
    comingSoon: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
    noCurrentActivities: {
      th: 'ไม่มีกิจกรรมปัจจุบัน',
      en: 'No current activities'
    },
    noCurrentExhibitions: {
      th: 'ไม่มีนิทรรศการในขณะนี้',
      en: 'No current exhibitions'
    },
    noUpcomingExhibitions: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
    noPastExhibitions: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
    noCurrentMovingImage: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
    noUpcomingMovingImage: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
    noPastMovingImage: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
    noCurrentResidency: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    }
  }
};

/**
 * Helper function to get empty state message
 * @param key - The key for the empty state message
 * @param language - The current language ('th' or 'en')
 * @returns The translated message
 */
export function getEmptyStateMessage(
  key: keyof typeof siteConfig.emptyStates, 
  language: 'th' | 'en'
): string {
  return siteConfig.emptyStates[key][language];
}
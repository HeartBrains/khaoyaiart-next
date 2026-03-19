/**
 * Activities Data Architecture
 * Following the same pattern as exhibitionsDataNew.ts
 */

/**
 * Activity Interface (Modern Bilingual Structure)
 */
export interface Activity {
  // Identifiers
  id: string;
  slug: string;
  
  // Bilingual Content
  title: {
    en: string;
    th: string;
  };
  artist?: {
    en: string;
    th: string;
  };
  
  // Date display
  dateDisplay: {
    en: string;
    th: string;
  };
  
  // Status & Classification
  status: 'current' | 'upcoming' | 'past';
  year: string;
  
  // Categories
  categories: {
    en: string[];
    th: string[];
  };
  
  // Media
  featuredImage: string;
  gallery?: string[];
  imageCredits?: string;
  
  // Preview text for listings
  listingSummary: {
    en: string;
    th: string;
  };
  
  // Additional metadata
  tags?: {
    en: string[];
    th: string[];
  };
  typeLabel?: {
    en: string;
    th: string;
  };
}

const BASE = 'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-4.+Activities-';

export const activities: Activity[] = [
  // ─── K-BAR Experience ───────────────────────────────────────────────────────
  {
    id: "1",
    slug: "k-bar-experience",
    title: {
      en: "K-BAR Experience",
      th: "K-BAR Experience"
    },
    artist: {
      en: "Elmgreen & Dragset",
      th: "เอล์มกรีน และ แดร็กเซ็ต"
    },
    dateDisplay: {
      en: "Every second Saturday of each month",
      th: "ทุกวันเสาร์ที่สองของเดือน"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Event', 'Social', 'Gastronomy'],
      th: ['กิจกรรม', 'สังคม', 'อาหารและเครื่องดื่ม']
    },
    featuredImage: BASE + 'K-BAR+Experience--K-BAR-+Andrea+Rossetti+4+-+COVER-1920w.jpg',
    gallery: [
      BASE + 'K-BAR+Experience--K-BAR-+Andrea+Rossetti+6+-+Copy-1920w.jpg',
      BASE + 'K-BAR+Experience--K-BAR+Menu-+Rungkit+Tangtongpon+1-1920w.jpg',
      BASE + 'K-BAR+Experience--K-BAR+Menu-+Rungkit+Tangtongpon+3-1920w.jpg',
      BASE + 'K-BAR+Experience--K-BAR+Menu-+Rungkit+Tangtongpon+5-1920w.jpg',
      BASE + 'K-BAR+Experience--K-BAR+Menu-+Rungkit+Tangtongpon+6-1920w.jpg',
    ],
    imageCredits: "Photo by Andrea Rossetti, Rungkit Tangtongpon",
    listingSummary: {
      en: "An intimate bar experience open once a month, offering craft cocktails in the heart of the forest.",
      th: "ประสบการณ์บาร์สุดพิเศษที่เปิดเดือนละครั้ง เสิร์ฟค็อกเทลคราฟท์ท่ามกลางป่า"
    },
    tags: {
      en: ["K-BAR", "Elmgreen & Dragset", "Monthly Event", "Cocktails", "Art Experience", "Limited Access", "Reservation Required", "Forest Bar", "Contemporary Art", "Social Art"],
      th: ["K-BAR", "เอล์มกรีน และ แดร็กเซ็ต", "กิจกรรมรายเดือน", "ค็อกเทล", "ประสบการณ์ศิลปะ", "การเข้าถึงจำกัด", "ต้องจองล่วงหน้า", "บาร์ในป่า", "ศิลปะร่วมสมัย", "ศิลปะสังคม"]
    },
    typeLabel: {
      en: "Monthly Event",
      th: "กิจกรรมรายเดือน"
    }
  },

  // ─── Bamboo Journey ──────────────────────────────────────────────────────────
  {
    id: "2",
    slug: "bamboo-journey",
    title: { en: "Bamboo Journey", th: "Bamboo Journey" },
    dateDisplay: { en: "", th: "" },
    status: 'current',
    year: "2025",
    categories: { en: [], th: [] },
    featuredImage: BASE + 'Bamboo+Journey--Food-+Nawaphon+20+COVER-1920w.jpg',
    gallery: [
      BASE + 'Bamboo+Journey--Activity+-+People-+Puttisin+4-1920w.jpg',
      BASE + 'Bamboo+Journey--Food-+Rungkit+-+Pongsakorn+1-1920w.jpg',
      BASE + 'Bamboo+Journey--Food-+Nawaphon+11-1920w.jpg',
      BASE + 'Bamboo+Journey--Food-+Nawaphon+23-1920w.jpg',
      BASE + 'Bamboo+Journey--Activity+-+People-+Rungkit+-+Pongsakorn+4-1920w.jpg',
      BASE + 'Bamboo+Journey--Food-+Nawaphon+25-1920w.jpg',
    ],
    listingSummary: { en: "", th: "" },
  },

  // ─── Forest Table ────────────────────────────────────────────────────────────
  {
    id: "3",
    slug: "forest-table",
    title: { en: "Forest Table", th: "Forest Table" },
    dateDisplay: { en: "", th: "" },
    status: 'current',
    year: "2025",
    categories: { en: [], th: [] },
    featuredImage: BASE + 'Forest+Table--2B2A0548+COVER-1920w.jpg',
    gallery: [
      BASE + 'Forest+Table--481324010_17942258174959752_1210894244914354469_n-1920w.jpg',
      BASE + 'Forest+Table--Activity+-+People-+Puttisin+5-1920w.jpg',
      BASE + 'Forest+Table--2B2A0558-1920w.jpg',
      BASE + 'Forest+Table--Activity+-+People-+Rungkit+-+Pongsakorn+7-1920w.jpg',
      BASE + 'Forest+Table--2B2A0548-1920w.jpg',
    ],
    listingSummary: { en: "", th: "" },
  },

  // ─── Forest Print ────────────────────────────────────────────────────────────
  {
    id: "4",
    slug: "forest-print",
    title: { en: "Forest Print", th: "Forest Print" },
    dateDisplay: { en: "", th: "" },
    status: 'current',
    year: "2025",
    categories: { en: [], th: [] },
    featuredImage: BASE + 'Forest+Print--Activity+-+People-+Nawaphon-+Film+60+COVER-1920w.jpg',
    gallery: [
      BASE + 'Forest+Print--Activity+-+People-+Nawaphon-+Film+7-1920w.jpg',
      BASE + 'Forest+Print--Activity+-+People-+Nawaphon-+Film+58-1920w.jpg',
      BASE + 'Forest+Print--Activity+-+People-+Nawaphon-+Film+59-1920w.jpg',
      BASE + 'Forest+Print--Activity+-+People-+Nawaphon-+Film+60-1920w.jpg',
    ],
    listingSummary: { en: "", th: "" },
  },
];

/**
 * Get activity by slug
 */
export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find(act => act.slug === slug);
}

/**
 * Get activities by status
 */
export function getActivitiesByStatus(status: 'current' | 'upcoming' | 'past'): Activity[] {
  return activities.filter(act => act.status === status);
}

/**
 * Get all activities for a specific year
 */
export function getActivitiesByYear(year: string): Activity[] {
  return activities.filter(act => act.year === year);
}

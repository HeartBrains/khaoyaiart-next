export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface WPScheduleItem {
  title: string;
  details: string;
}

/**
 * Bilingual text structure
 */
export interface BilingualText {
  en: string;
  th: string;
}

/**
 * Content status for status-first logic
 */
export type ContentStatus = 'current' | 'upcoming' | 'past';

export interface WPPost {
  id: string;
  slug: string;
  type: 'activity' | 'exhibition' | 'post';
  title: string;
  content: string; // HTML or long text
  date: string;
  categories?: string[];
  featuredImage?: WPImage;
  gallery?: string[]; // Array of URLs
  acf?: {
    artist?: string;
    subtitle?: string;
    location?: string;
    schedule?: WPScheduleItem[];
    additionalContent?: string; // HTML
    fromDate?: string; // ISO date format
    toDate?: string; // ISO date format or "Onwards"
    status?: ContentStatus; // Explicit status override
    curator?: string;
    listing_summary?: string;
    featured?: boolean;
    categories?: string[];
    [key: string]: any;
  };
}

/**
 * Exhibition data structure (modern bilingual format)
 */
export interface Exhibition {
  id: string;
  slug: string;
  title: BilingualText;
  artist: BilingualText;
  description: BilingualText;
  fromDate: string; // ISO format
  toDate: string; // ISO format or "Onwards"
  status: ContentStatus;
  featuredImage?: string;
  gallery?: string[];
  curator?: BilingualText;
  categories?: string[];
}

/**
 * Activity data structure (modern bilingual format)
 */
export interface Activity {
  id: string;
  slug: string;
  title: BilingualText;
  description: BilingualText;
  fromDate: string;
  toDate: string;
  status: ContentStatus;
  featuredImage?: string;
  gallery?: string[];
  location?: BilingualText;
  categories?: string[];
}

/**
 * Team member structure
 */
export interface TeamMember {
  id: string;
  name: BilingualText;
  role: BilingualText;
  bio?: BilingualText;
  image?: string;
  order?: number;
}

/**
 * Press item structure
 */
export interface PressItem {
  id: string;
  slug: string;
  title: BilingualText;
  publication: BilingualText;
  date: string;
  link?: string;
  image?: string;
  excerpt?: BilingualText;
}
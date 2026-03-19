export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface WPScheduleItem {
  title: string;
  details: string;
}

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
    [key: string]: any;
  };
}

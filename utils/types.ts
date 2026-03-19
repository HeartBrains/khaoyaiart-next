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

/** Safely extract a URL string from either a WPImage object or a plain string */
export function getImageUrl(img: string | { sourceUrl?: string } | undefined | null): string {
  if (!img) return '';
  if (typeof img === 'string') return img;
  return img.sourceUrl ?? '';
}

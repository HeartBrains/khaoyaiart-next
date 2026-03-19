/**
 * Maps raw WordPress REST API responses to the existing TypeScript interfaces
 * used by page components. Page components require zero changes.
 */
import type { WPRawPost, WPSite } from './wp-api';

type Lang = 'en' | 'th';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function m(post: WPRawPost, key: string): string {
  const val = post.meta?.[key];
  if (Array.isArray(val)) return val.join(',');
  return val ?? '';
}

// Featured image: native WP media (resolved at fetch time) → meta text URL fallback
function featuredImageUrl(post: WPRawPost): string {
  if (post.resolvedFeaturedImage) return post.resolvedFeaturedImage;
  if (post.meta?.['featured_image_url']) return post.meta['featured_image_url'] as string;
  // Fall back to first gallery image if no dedicated featured image
  const gallery = m(post, 'gallery');
  if (gallery) return gallery.split('|||').filter(Boolean)[0] ?? '';
  return '';
}

// Gallery: native WP media IDs (resolved at fetch time) merged with text URL fallback
function galleryUrls(post: WPRawPost): string[] {
  const resolved = post.resolvedGallery ?? [];
  const text = m(post, 'gallery') ? m(post, 'gallery').split('|||').filter(Boolean) : [];
  // Merge: resolved first, then any text URLs not already included
  const merged = [...resolved];
  for (const url of text) {
    if (!merged.includes(url)) merged.push(url);
  }
  return merged;
}

// ─── BKKK Exhibition ─────────────────────────────────────────────────────────

export function mapBkkkExhibition(post: WPRawPost) {
  return {
    id: String(post.id),
    slug: post.slug,
    title: { en: post.title.rendered, th: m(post, 'title_th') || post.title.rendered },
    artist: { en: m(post, 'artist_en'), th: m(post, 'artist_th') || m(post, 'artist_en') },
    curator: { en: m(post, 'curator_en'), th: m(post, 'curator_th') || m(post, 'curator_en') },
    fromDate: m(post, 'from_date'),
    toDate: m(post, 'to_date'),
    dateDisplay: {
      en: m(post, 'date_display_en'),
      th: m(post, 'date_display_th') || m(post, 'date_display_en'),
    },
    year: m(post, 'year'),
    status: (m(post, 'status') || 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    tags: m(post, 'tags_en'),
    content: {
      en: m(post, 'content_en') || post.content.rendered,
      th: m(post, 'content_th') || m(post, 'content_en') || post.content.rendered,
    },
    additionalInfo: m(post, 'additional_info'),
    site: m(post, 'site') as WPSite,
  };
}

// ─── KYAF Exhibition ─────────────────────────────────────────────────────────

export function mapKyafExhibition(post: WPRawPost) {
  return {
    id: String(post.id),
    slug: post.slug,
    title: { en: post.title.rendered, th: m(post, 'title_th') || post.title.rendered },
    artist: { en: m(post, 'artist_en'), th: m(post, 'artist_th') || m(post, 'artist_en') },
    curator: { en: m(post, 'curator_en'), th: m(post, 'curator_th') || m(post, 'curator_en') },
    fromDate: m(post, 'from_date'),
    toDate: m(post, 'to_date'),
    dateDisplay: {
      en: m(post, 'date_display_en'),
      th: m(post, 'date_display_th') || m(post, 'date_display_en'),
    },
    year: m(post, 'year'),
    status: (m(post, 'status') || 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    tags: { en: m(post, 'tags_en').split(',').map(t => t.trim()).filter(Boolean), th: [] },
    listingSummary: {
      en: m(post, 'content_en').replace(/<[^>]+>/g, '').slice(0, 200),
      th: m(post, 'content_th').replace(/<[^>]+>/g, '').slice(0, 200),
    },
    content: {
      en: m(post, 'content_en') || post.content.rendered,
      th: m(post, 'content_th') || m(post, 'content_en') || post.content.rendered,
    },
    site: m(post, 'site') as WPSite,
  };
}

// ─── Moving Image Program ─────────────────────────────────────────────────────

export function mapMovingImage(post: WPRawPost) {
  return {
    id: String(post.id),
    slug: post.slug,
    title: { en: post.title.rendered, th: m(post, 'title_th') || post.title.rendered },
    curator: { en: m(post, 'curator_en'), th: m(post, 'curator_th') || m(post, 'curator_en') },
    fromDate: m(post, 'from_date'),
    toDate: m(post, 'to_date'),
    dateDisplay: {
      en: m(post, 'date_display_en'),
      th: m(post, 'date_display_th') || m(post, 'date_display_en'),
    },
    year: m(post, 'year'),
    status: (m(post, 'status') || 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    additionalInfo: m(post, 'additional_info'),
    content: {
      en: m(post, 'content_en') || post.content.rendered,
      th: m(post, 'content_th') || m(post, 'content_en') || post.content.rendered,
    },
    site: m(post, 'site') as WPSite,
  };
}

// ─── Residency Artist ─────────────────────────────────────────────────────────

export function mapResidencyArtist(post: WPRawPost) {
  return {
    id: post.id,
    slug: post.slug,
    name: post.title.rendered,
    nameTH: m(post, 'title_th') || post.title.rendered,
    period: m(post, 'date_display_en'),
    periodTH: m(post, 'date_display_th') || m(post, 'date_display_en'),
    featuredImage: featuredImageUrl(post),
    status: (m(post, 'status') || 'past') as 'current' | 'past' | 'upcoming',
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    bio: m(post, 'bio_en') || post.content.rendered,
    bioTH: m(post, 'bio_th') || m(post, 'bio_en') || post.content.rendered,
    site: m(post, 'site') as WPSite,
  };
}

// ─── BKKK Team Member ─────────────────────────────────────────────────────────

export function mapBkkkTeamMember(post: WPRawPost) {
  return {
    name: post.title.rendered,
    role: m(post, 'role_en'),
    roleTH: m(post, 'role_th') || m(post, 'role_en'),
    bio: [m(post, 'bio_en')].filter(Boolean),
    bioTH: [m(post, 'bio_th') || m(post, 'bio_en')].filter(Boolean),
    image: post.resolvedFeaturedImage || m(post, 'photo_url') || undefined,
    group: m(post, 'group'),
    order: Number(m(post, 'order')) || 0,
    site: m(post, 'site') as WPSite,
  };
}

// ─── KYAF Team Member ─────────────────────────────────────────────────────────

export function mapKyafTeamMember(post: WPRawPost) {
  return {
    name: post.title.rendered,
    role: m(post, 'role_en'),
    roleTH: m(post, 'role_th') || m(post, 'role_en'),
    bio: m(post, 'bio_en') || undefined,
    bioTH: m(post, 'bio_th') || m(post, 'bio_en') || undefined,
    image: post.resolvedFeaturedImage || m(post, 'photo_url') || undefined,
    group: m(post, 'group'),
    order: Number(m(post, 'order')) || 0,
    site: m(post, 'site') as WPSite,
  };
}

// ─── Activity (shared BKKK + KYAF) ───────────────────────────────────────────

export function mapActivity(post: WPRawPost, lang: Lang = 'en') {
  const tags = m(post, 'tags_en').split(',').map(t => t.trim()).filter(Boolean);
  return {
    id: String(post.id),
    slug: post.slug,
    title: { en: post.title.rendered, th: m(post, 'title_th') || post.title.rendered },
    dateDisplay: {
      en: m(post, 'date_display_en'),
      th: m(post, 'date_display_th') || m(post, 'date_display_en'),
    },
    status: (m(post, 'status') || 'upcoming') as 'current' | 'upcoming' | 'past',
    categories: { en: tags, th: tags },
    typeLabel: { en: tags[0] ?? '', th: tags[0] ?? '' },
    artist: { en: m(post, 'artist_en'), th: m(post, 'artist_th') || m(post, 'artist_en') },
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    listingSummary: {
      en: m(post, 'content_en').replace(/<[^>]+>/g, '').slice(0, 200),
      th: (m(post, 'content_th') || m(post, 'content_en')).replace(/<[^>]+>/g, '').slice(0, 200),
    },
    content: {
      en: m(post, 'content_en') || post.content.rendered,
      th: m(post, 'content_th') || m(post, 'content_en') || post.content.rendered,
    },
    site: m(post, 'site') as WPSite,
  };
}

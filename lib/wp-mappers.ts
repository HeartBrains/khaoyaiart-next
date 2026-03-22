/**
 * Maps raw WordPress REST API responses to typed objects used by page components.
 */
import type { WPRawPost, WPSite } from './wp-api';

// ─── Exported types (inferred from mapper return types) ───────────────────────
export type ExhibitionItem = ReturnType<typeof mapBkkkExhibition>;
export type KyafExhibitionItem = ReturnType<typeof mapKyafExhibition>;
export type MovingImageItem = ReturnType<typeof mapMovingImage>;
export type ResidencyArtistItem = ReturnType<typeof mapResidencyArtist>;
export type TeamMemberItem = ReturnType<typeof mapBkkkTeamMember>;
export type ActivityItem = ReturnType<typeof mapActivity>;
export type PressItem = ReturnType<typeof mapPressItem>;

type Lang = 'en' | 'th';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function m(post: WPRawPost, key: string): string {
  const val = post.meta?.[key];
  if (Array.isArray(val)) return val.join(',');
  return val ?? '';
}

// Decode common HTML entities in plain-text fields (e.g. &amp; → &)
function decode(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// Split a pipe- or comma-separated URL string, supporting both legacy ||| and new , format
function splitUrls(value: string): string[] {
  if (!value) return [];
  const sep = value.includes('|||') ? '|||' : ',';
  return value.split(sep).map(u => u.trim()).filter(Boolean);
}

// Featured image: native WP media (resolved at fetch time) → meta text URL fallback
function featuredImageUrl(post: WPRawPost): string {
  if (post.resolvedFeaturedImage) return post.resolvedFeaturedImage;

  // featured_image_url: JetEngine image upload field — may return a URL string,
  // an object {id, url}, or an array [{id, url}]
  const raw = post.meta?.['featured_image_url'];
  if (raw) {
    if (typeof raw === 'string' && raw.startsWith('http')) return raw;
    if (Array.isArray(raw) && raw.length > 0) {
      const first = raw[0];
      if (typeof first === 'string' && first.startsWith('http')) return first;
      if (first && typeof first === 'object' && 'url' in first) return (first as { url: string }).url;
    }
    if (typeof raw === 'object' && !Array.isArray(raw) && 'url' in (raw as object)) {
      return (raw as { url: string }).url;
    }
  }

  // Fall back to gallery_media URLs
  const galleryMedia = post.meta?.['gallery_media'];
  if (Array.isArray(galleryMedia)) {
    const first = (galleryMedia as string[]).find(u => typeof u === 'string' && u.startsWith('http'));
    if (first) return first;
  }
  // Fall back to pipe-separated gallery text field
  const gallery = m(post, 'gallery');
  if (gallery) return splitUrls(gallery)[0] ?? '';
  return '';
}

// Gallery: native WP media IDs (resolved at fetch time) merged with text URL fallback
function galleryUrls(post: WPRawPost): string[] {
  const resolved = post.resolvedGallery ?? [];

  // gallery_media may be an array of URLs (from JetEngine media field)
  const galleryMedia = post.meta?.['gallery_media'];
  const mediaUrls: string[] = Array.isArray(galleryMedia)
    ? (galleryMedia as string[]).filter(u => typeof u === 'string' && u.startsWith('http'))
    : [];

  const text = splitUrls(m(post, 'gallery'));

  // Merge all sources, deduplicated
  const merged = [...resolved];
  for (const url of [...mediaUrls, ...text]) {
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
    artist: { en: decode(m(post, 'artist_en')), th: decode(m(post, 'artist_th') || m(post, 'artist_en')) },
    curator: { en: decode(m(post, 'curator_en')), th: decode(m(post, 'curator_th') || m(post, 'curator_en')) },
    fromDate: m(post, 'from_date'),
    toDate: m(post, 'to_date'),
    dateDisplay: {
      en: decode(m(post, 'date_display_en')),
      th: decode(m(post, 'date_display_th') || m(post, 'date_display_en')),
    },
    year: m(post, 'year'),
    status: (m(post, 'status') || 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    tags: m(post, 'tags_en'),
    content: {
      en: m(post, 'content_en') || post.content?.rendered || '',
      th: m(post, 'content_th') || m(post, 'content_en') || post.content?.rendered || '',
    },
    additionalInfo: m(post, 'additional_info'),
    ctaLeft:  { label: m(post, 'cta_label'),  url: m(post, 'cta_url') },
    ctaRight: { label: m(post, 'cta2_label'), url: m(post, 'cta2_url') },
    site: m(post, 'site') as WPSite,
  };
}

// ─── KYAF Exhibition ─────────────────────────────────────────────────────────

export function mapKyafExhibition(post: WPRawPost) {
  return {
    id: String(post.id),
    slug: post.slug,
    title: { en: post.title.rendered, th: m(post, 'title_th') || post.title.rendered },
    artist: { en: decode(m(post, 'artist_en')), th: decode(m(post, 'artist_th') || m(post, 'artist_en')) },
    curator: { en: decode(m(post, 'curator_en')), th: decode(m(post, 'curator_th') || m(post, 'curator_en')) },
    fromDate: m(post, 'from_date'),
    toDate: m(post, 'to_date'),
    dateDisplay: {
      en: decode(m(post, 'date_display_en')),
      th: decode(m(post, 'date_display_th') || m(post, 'date_display_en')),
    },
    year: m(post, 'year'),
    status: (m(post, 'status') || 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    additionalInfo: m(post, 'additional_info'),
    ctaLeft:  { label: m(post, 'cta_label'),  url: m(post, 'cta_url') },
    ctaRight: { label: m(post, 'cta2_label'), url: m(post, 'cta2_url') },
    tags: { en: m(post, 'tags_en').split(',').map(t => t.trim()).filter(Boolean), th: [] },
    listingSummary: {
      en: m(post, 'content_en').replace(/<[^>]+>/g, '').slice(0, 200),
      th: m(post, 'content_th').replace(/<[^>]+>/g, '').slice(0, 200),
    },
    content: {
      en: m(post, 'content_en') || post.content?.rendered || '',
      th: m(post, 'content_th') || m(post, 'content_en') || post.content?.rendered || '',
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
    curator: { en: decode(m(post, 'curator_en')), th: decode(m(post, 'curator_th') || m(post, 'curator_en')) },
    fromDate: m(post, 'from_date'),
    toDate: m(post, 'to_date'),
    dateDisplay: {
      en: decode(m(post, 'date_display_en')),
      th: decode(m(post, 'date_display_th') || m(post, 'date_display_en')),
    },
    year: m(post, 'year'),
    status: (m(post, 'status') || 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    additionalInfo: m(post, 'additional_info'),
    ctaLeft:  { label: m(post, 'cta_label'),  url: m(post, 'cta_url') },
    ctaRight: { label: m(post, 'cta2_label'), url: m(post, 'cta2_url') },
    content: {
      en: m(post, 'content_en') || post.content?.rendered || '',
      th: m(post, 'content_th') || m(post, 'content_en') || post.content?.rendered || '',
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
    period: decode(m(post, 'date_display_en')),
    periodTH: decode(m(post, 'date_display_th') || m(post, 'date_display_en')),
    role: m(post, 'role_en'),
    roleTH: m(post, 'role_th') || m(post, 'role_en'),
    featuredImage: featuredImageUrl(post),
    status: (m(post, 'status') || 'past') as 'current' | 'past' | 'upcoming',
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    additionalInfo: m(post, 'additional_info'),
    bio: m(post, 'bio_en') || post.content?.rendered || '',
    bioTH: m(post, 'bio_th') || m(post, 'bio_en') || post.content?.rendered || '',
    ctaLabel: m(post, 'cta_label'),
    ctaUrl: m(post, 'cta_url'),
    cta2Label: m(post, 'cta2_label'),
    cta2Url: m(post, 'cta2_url'),
    site: m(post, 'site') as WPSite,
  };
}

// ─── BKKK Team Member ─────────────────────────────────────────────────────────

export function mapBkkkTeamMember(post: WPRawPost) {
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
      en: decode(m(post, 'date_display_en')),
      th: decode(m(post, 'date_display_th') || m(post, 'date_display_en')),
    },
    status: (m(post, 'status') || 'upcoming') as 'current' | 'upcoming' | 'past',
    categories: { en: tags, th: tags },
    typeLabel: { en: tags[0] ?? '', th: tags[0] ?? '' },
    artist: { en: m(post, 'artist_en'), th: m(post, 'artist_th') || m(post, 'artist_en') },
    curator: { en: m(post, 'curator_en'), th: m(post, 'curator_th') || m(post, 'curator_en') },
    featuredImage: featuredImageUrl(post),
    gallery: galleryUrls(post),
    imageCredits: m(post, 'image_credits'),
    additionalInfo: m(post, 'additional_info'),
    ctaLeft:  { label: m(post, 'cta_label'),  url: m(post, 'cta_url') },
    ctaRight: { label: m(post, 'cta2_label'), url: m(post, 'cta2_url') },
    listingSummary: {
      en: m(post, 'content_en').replace(/<[^>]+>/g, '').slice(0, 200),
      th: (m(post, 'content_th') || m(post, 'content_en')).replace(/<[^>]+>/g, '').slice(0, 200),
    },
    content: {
      en: m(post, 'content_en') || post.content?.rendered || '',
      th: m(post, 'content_th') || m(post, 'content_en') || post.content?.rendered || '',
    },
    site: m(post, 'site') as WPSite,
  };
}


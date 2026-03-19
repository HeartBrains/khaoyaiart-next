/**
 * Mock data adapters for each WP hook.
 * Each function returns the same shape as the corresponding WP mapper so
 * useWPData.ts can swap between real and mock without touching page components.
 */

import { exhibitions as bkkkExhibitions } from '../components/bkkk/utils/exhibitionsDataNew';
import { exhibitions as kyafExhibitions } from '../components/kyaf/utils/exhibitionsDataNew';
import { movingImagePrograms } from '../components/bkkk/utils/movingImageData';
import { ARTISTS_DATA } from '../components/bkkk/utils/residencyData';
import { activities as kyafActivities } from '../components/kyaf/utils/activitiesDataNew';
import { getMockPostsByType } from '../components/bkkk/utils/mockDataBilingual';

// ─── BKKK Exhibitions ────────────────────────────────────────────────────────

export function getMockBkkkExhibitions() {
  return bkkkExhibitions.map(e => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    artist: e.artist,
    curator: e.curator,
    fromDate: e.fromDate,
    toDate: e.toDate,
    dateDisplay: e.dateDisplay,
    year: e.year,
    status: (e.status ?? 'past') as 'current' | 'upcoming' | 'past',
    featuredImage: e.featuredImage ?? '',
    gallery: e.gallery ?? [],
    imageCredits: e.imageCredits,
    tags: e.tags ?? '',
    content: { en: '', th: '' },
    additionalInfo: '',
    site: 'bkkk' as const,
  }));
}

// ─── KYAF Exhibitions ─────────────────────────────────────────────────────────

export function getMockKyafExhibitions() {
  return kyafExhibitions.map(e => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    artist: e.artist,
    curator: e.curator,
    fromDate: '',
    toDate: '',
    dateDisplay: e.dateDisplay,
    year: e.year,
    status: e.status,
    featuredImage: e.featuredImage,
    gallery: e.gallery ?? [],
    imageCredits: e.imageCredits,
    tags: { en: e.tags?.en ?? [], th: e.tags?.th ?? [] },
    listingSummary: e.listingSummary,
    content: { en: '', th: '' },
    site: 'kyaf' as const,
  }));
}

// ─── Moving Images ────────────────────────────────────────────────────────────

export function getMockMovingImages() {
  return movingImagePrograms.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    curator: p.curator,
    fromDate: p.fromDate,
    toDate: p.toDate,
    dateDisplay: p.dateDisplay,
    year: '',
    status: p.status,
    featuredImage: p.featuredImage ?? '',
    gallery: p.gallery ?? [],
    imageCredits: '',
    additionalInfo: p.additionalInfo ?? '',
    content: { en: '', th: '' },
    site: 'bkkk' as const,
  }));
}

// ─── Residency Artists ────────────────────────────────────────────────────────

export function getMockResidencyArtists() {
  return ARTISTS_DATA.map(a => ({
    id: a.id,
    slug: a.slug,
    name: a.name,
    nameTH: a.nameTH,
    period: a.period,
    periodTH: a.periodTH,
    featuredImage: a.featuredImage,
    status: a.status,
    gallery: a.gallery,
    imageCredits: '',
    bio: '',
    bioTH: '',
    site: 'bkkk' as const,
  }));
}

// ─── BKKK Activities ─────────────────────────────────────────────────────────

export function getMockBkkkActivities() {
  return getMockPostsByType('activity', 'en').map(p => {
    const tags = p.categories ?? [];
    return {
      id: p.id,
      slug: p.slug,
      title: { en: p.title, th: p.title },
      dateDisplay: { en: p.date, th: p.date },
      status: 'upcoming' as const,
      categories: { en: tags, th: tags },
      typeLabel: { en: tags[0] ?? '', th: tags[0] ?? '' },
      artist: { en: '', th: '' },
      featuredImage: p.featuredImage?.sourceUrl ?? '',
      gallery: p.gallery ?? [],
      imageCredits: '',
      listingSummary: { en: '', th: '' },
      content: { en: p.content, th: p.content },
      site: 'bkkk' as const,
    };
  });
}

// ─── KYAF Activities ──────────────────────────────────────────────────────────

export function getMockKyafActivities() {
  return kyafActivities.map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    dateDisplay: a.dateDisplay,
    status: a.status,
    categories: a.categories,
    typeLabel: a.typeLabel ?? { en: '', th: '' },
    artist: a.artist ?? { en: '', th: '' },
    featuredImage: a.featuredImage,
    gallery: a.gallery ?? [],
    imageCredits: a.imageCredits ?? '',
    listingSummary: a.listingSummary,
    content: { en: '', th: '' },
    site: 'kyaf' as const,
  }));
}

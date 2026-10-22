import type { WPSite } from './wp-api';

export type RelatedContentType =
  | 'exhibitions'
  | 'activities'
  | 'moving-image'
  | 'artists'
  | 'blog';

export interface RelatedContentItem {
  id: string;
  slug: string;
  type: RelatedContentType;
  title: { en: string; th: string };
  image?: string;
  category?: string;
  site: WPSite;
}

const RELATED_TYPES = new Set<RelatedContentType>([
  'exhibitions',
  'activities',
  'moving-image',
  'artists',
  'blog',
]);

export function parseRelatedContent(value: unknown): RelatedContentItem[] {
  const source = Array.isArray(value) ? value[0] : value;
  if (typeof source !== 'string' || source.trim() === '') return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(source);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const seen = new Set<string>();
  return parsed.flatMap((entry): RelatedContentItem[] => {
    if (!entry || typeof entry !== 'object') return [];
    const item = entry as Record<string, unknown>;
    const id = String(item.id ?? '');
    const slug = typeof item.slug === 'string' ? item.slug.trim() : '';
    const type = (item.type === 'residency' ? 'artists' : item.type) as RelatedContentType;
    const site = item.site as WPSite;
    if (
      !id || !slug ||
      !RELATED_TYPES.has(type) ||
      (site !== 'bkkk' && site !== 'kyaf')
    ) return [];

    // Moving-image details currently exist only under the BK route.
    if (type === 'moving-image' && site !== 'bkkk') return [];

    const key = `${site}:${type}:${id}`;
    if (seen.has(key)) return [];
    seen.add(key);

    const rawTitle = item.title;
    const titleObject = rawTitle && typeof rawTitle === 'object'
      ? rawTitle as Record<string, unknown>
      : {};
    const fallbackTitle = typeof rawTitle === 'string' ? rawTitle : slug;
    const en = typeof titleObject.en === 'string' ? titleObject.en : fallbackTitle;
    const th = typeof titleObject.th === 'string' ? titleObject.th : en;

    return [{
      id,
      slug,
      type,
      title: { en, th },
      image: typeof item.image === 'string' ? item.image : undefined,
      category: typeof item.category === 'string' ? item.category : undefined,
      site,
    }];
  });
}

export function relatedContentHref(item: RelatedContentItem): string | null {
  if (!RELATED_TYPES.has(item.type)) return null;
  if (item.type === 'moving-image' && item.site !== 'bkkk') return null;
  const sitePrefix = item.site === 'bkkk' ? '/bk' : '/kyaf';
  return `${sitePrefix}/${item.type}/${encodeURIComponent(item.slug)}/`;
}

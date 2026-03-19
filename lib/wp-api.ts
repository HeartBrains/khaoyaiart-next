const WP_BASE =
  process.env.WP_BASE_URL ?? 'https://content.bkkkapp.com/wp-json/wp/v2';

export type WPSite = 'bkkk' | 'kyaf';

export interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  meta: Record<string, string>;
}

/**
 * Fetch a list of CPT records filtered by site.
 * Called at build time from generateStaticParams and page components.
 */
export async function fetchCPT(
  cptSlug: string,
  site: WPSite,
  perPage = 100,
): Promise<WPRawPost[]> {
  const url = new URL(`${WP_BASE}/${cptSlug}`);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('meta_query[0][key]', 'site');
  url.searchParams.set('meta_query[0][value]', site);

  try {
    const res = await fetch(url.toString(), { cache: 'force-cache' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Fetch a single CPT record by slug.
 * Called at build time from generateMetadata and page components.
 */
export async function fetchCPTBySlug(
  cptSlug: string,
  slug: string,
): Promise<WPRawPost | null> {
  const url = `${WP_BASE}/${cptSlug}?slug=${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return null;
    const data: WPRawPost[] = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

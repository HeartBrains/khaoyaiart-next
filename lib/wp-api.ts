const WP_BASE =
  (process.env.WP_BASE_URL ?? 'https://content.bkkkapp.com/wp-json/wp/v2').replace(/\/$/, '');

export type WPSite = 'bkkk' | 'kyaf';

export interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  meta: Record<string, string>;
  featured_media?: number;
  _embedded?: Record<string, unknown>;
}

// Fetch all pages of a CPT and filter by site meta field
export async function fetchCPT(cpt: string, site: WPSite): Promise<WPRawPost[]> {
  try {
    const allPosts: WPRawPost[] = [];
    let page = 1;
    while (true) {
      const url = `${WP_BASE}/${cpt}?per_page=100&page=${page}&_fields=id,slug,title,content,date,modified,meta,featured_media`;
      const res = await fetch(url, { cache: 'force-cache' });
      if (!res.ok) break;
      const data: WPRawPost[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allPosts.push(...data);
      const total = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
      if (page >= total) break;
      page++;
    }
    // Filter by site meta — posts with no site field are shared
    return allPosts.filter(p => !p.meta?.site || p.meta.site === site);
  } catch {
    return [];
  }
}

// Resolve comma-separated WP attachment IDs to source URLs (client-side use)
export async function resolveMediaIds(ids: string): Promise<string[]> {
  const list = ids.split(',').map(s => s.trim()).filter(Boolean);
  if (list.length === 0) return [];
  const results = await Promise.all(
    list.map(async id => {
      try {
        const res = await fetch(`${WP_BASE}/media/${id}?_fields=source_url`);
        if (!res.ok) return null;
        const data = await res.json();
        return (data.source_url as string) || null;
      } catch { return null; }
    })
  );
  return results.filter((u): u is string => u !== null);
}

export async function fetchCPTBySlug(cpt: string, slug: string): Promise<WPRawPost | null> {
  try {
    const url = `${WP_BASE}/${cpt}?slug=${slug}&_fields=id,slug,title,content,date,modified,meta,featured_media`;
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return null;
    const data: WPRawPost[] = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

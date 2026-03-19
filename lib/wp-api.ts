const WP_BASE =
  (process.env.WP_BASE_URL ?? 'https://content.bkkkapp.com/wp-json/wp/v2').replace(/\/$/, '');

// Maps registered post_type slugs to their WP REST API base paths
const REST_BASE: Record<string, string> = {
  exhibition:       'exhibitions',
  activity:         'activities',
  moving_image:     'moving-images',
  residency_artist: 'residency-artists',
  team_member:      'team-members',
  blog_post:        'blog-posts',
  press_item:       'press-items',
  post:             'posts',
  page:             'pages',
};

function restBase(cpt: string): string {
  return REST_BASE[cpt] ?? cpt;
}

export type WPSite = 'bkkk' | 'kyaf';

export interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  meta: Record<string, string | string[]>;
  featured_media?: number;
  // Resolved at fetch time — safe flat strings, no nested WP objects
  resolvedFeaturedImage?: string;
  resolvedGallery?: string[];
}

// Batch-fetch media URLs for a set of IDs in one request
async function batchResolveMedia(ids: number[]): Promise<Map<number, string>> {
  const unique = [...new Set(ids.filter(id => id > 0))];
  if (unique.length === 0) return new Map();
  try {
    const url = `${WP_BASE}/media?include=${unique.join(',')}&per_page=100&_fields=id,source_url&_=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return new Map();
    const data: Array<{ id: number; source_url: string }> = await res.json();
    return new Map(data.map(m => [m.id, m.source_url]));
  } catch {
    return new Map();
  }
}

// Fetch all pages of a CPT, filter by site, and resolve media IDs to URLs
export async function fetchCPT(cpt: string, site: WPSite): Promise<WPRawPost[]> {
  try {
    const allPosts: WPRawPost[] = [];
    let page = 1;
    while (true) {
      const url = `${WP_BASE}/${restBase(cpt)}?per_page=100&page=${page}&_fields=id,slug,title,content,date,modified,meta,featured_media&_=${Date.now()}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) break;
      const data: WPRawPost[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allPosts.push(...data);
      const total = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
      if (page >= total) break;
      page++;
    }

    // Filter by site meta — posts with no site field are shared
    const filtered = allPosts.filter(p => !p.meta?.site || p.meta.site === site);

    // Collect all media IDs that need resolving
    const mediaIds: number[] = [];
    for (const post of filtered) {
      if (post.featured_media && post.featured_media > 0) {
        mediaIds.push(post.featured_media);
      }
      const galleryIds = post.meta?.gallery_media;
      if (Array.isArray(galleryIds)) {
        galleryIds.forEach(id => { const n = Number(id); if (n > 0) mediaIds.push(n); });
      }
    }

    // Batch-resolve all IDs in one request
    const mediaMap = await batchResolveMedia(mediaIds);

    // Attach resolved URLs to each post
    return filtered.map(post => {
      const featuredUrl = post.featured_media && post.featured_media > 0
        ? (mediaMap.get(post.featured_media) ?? '')
        : '';

      const galleryIds = post.meta?.gallery_media;
      const galleryUrls = Array.isArray(galleryIds)
        ? galleryIds.map(id => mediaMap.get(Number(id)) ?? '').filter(Boolean)
        : [];

      return { ...post, resolvedFeaturedImage: featuredUrl, resolvedGallery: galleryUrls };
    });
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
    const url = `${WP_BASE}/${restBase(cpt)}?slug=${slug}&_fields=id,slug,title,content,date,modified,meta,featured_media&_=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: WPRawPost[] = await res.json();
    const post = data[0] ?? null;
    if (!post) return null;

    // Resolve featured_media and gallery_media IDs to URLs
    const mediaIds: number[] = [];
    if (post.featured_media && post.featured_media > 0) mediaIds.push(post.featured_media);
    const gm = post.meta?.gallery_media;
    if (Array.isArray(gm)) gm.forEach(id => { const n = Number(id); if (n > 0) mediaIds.push(n); });

    const mediaMap = await batchResolveMedia(mediaIds);

    const featuredUrl = post.featured_media && post.featured_media > 0
      ? (mediaMap.get(post.featured_media) ?? '') : '';
    const galleryUrls = Array.isArray(gm)
      ? gm.map(id => mediaMap.get(Number(id)) ?? '').filter(Boolean) : [];

    return { ...post, resolvedFeaturedImage: featuredUrl, resolvedGallery: galleryUrls };
  } catch {
    return null;
  }
}

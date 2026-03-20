import { MetadataRoute } from 'next';
import { fetchCPT } from '@/lib/wp-api';

export const dynamic = 'force-static';

const BASE = 'https://khaoyai.bkkkapp.com/kyaf';

const staticRoutes = [
  '',
  '/exhibitions',
  '/activities',
  '/blog',
  '/team',
  '/about',
  '/visit',
  '/contact',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map(path => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const [exhibitions, activities, blogPosts] = await Promise.all([
    fetchCPT('exhibitions', 'kyaf').catch(() => []),
    fetchCPT('activities', 'kyaf').catch(() => []),
    fetchCPT('blog-posts', 'kyaf').catch(() => []),
  ]);

  for (const p of exhibitions) entries.push({ url: `${BASE}/exhibitions/${p.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  for (const p of activities) entries.push({ url: `${BASE}/activities/${p.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  for (const p of blogPosts) entries.push({ url: `${BASE}/blog/${p.slug}`, changeFrequency: 'monthly', priority: 0.6 });

  return entries;
}

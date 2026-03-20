import { MetadataRoute } from 'next';
import { fetchCPT } from '@/lib/wp-api';

export const dynamic = 'force-static';

const BASE = 'https://bkkk.bkkkapp.com/bkkk';

const staticRoutes = [
  '',
  '/exhibitions',
  '/activities',
  '/residency',
  '/moving-image',
  '/press',
  '/team',
  '/about',
  '/visit',
  '/contact',
  '/support',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map(path => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  // Dynamic routes
  const [exhibitions, activities, movingImages, residencyArtists] = await Promise.all([
    fetchCPT('exhibitions', 'bkkk').catch(() => []),
    fetchCPT('activities', 'bkkk').catch(() => []),
    fetchCPT('moving-images', 'bkkk').catch(() => []),
    fetchCPT('residency-artists', 'bkkk').catch(() => []),
  ]);

  for (const p of exhibitions) entries.push({ url: `${BASE}/exhibitions/${p.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  for (const p of activities) entries.push({ url: `${BASE}/activities/${p.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  for (const p of movingImages) entries.push({ url: `${BASE}/moving-image/${p.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  for (const p of residencyArtists) entries.push({ url: `${BASE}/artists/${p.slug}`, changeFrequency: 'monthly', priority: 0.6 });

  return entries;
}

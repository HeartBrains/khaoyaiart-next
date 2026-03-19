import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { mapActivity } from '@/lib/wp-mappers';
import { bkkkMetadata } from '@/lib/seo';
import { ActivityDetailClientPage } from '@/components/bkkk/ActivityDetailClientPage';
import { getMockBkkkActivities } from '@/lib/mock-data';

function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('activities', 'bkkk');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return getMockBkkkActivities().map(a => ({ slug: str(a.slug) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('activities', slug);
  const data = post ? mapActivity(post) : null;
  return bkkkMetadata(
    str(data?.title) ?? slug,
    str(data?.content)?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/bkkk/activities/${slug}`, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ActivityDetailClientPage site="bkkk" slug={slug} />;
}

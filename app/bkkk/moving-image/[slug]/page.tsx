import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { mapMovingImage } from '@/lib/wp-mappers';
import { bkkkMetadata } from '@/lib/seo';
import { MovingImageDetailClientPage } from '@/components/bkkk/MovingImageDetailClientPage';
import { movingImagePrograms } from '@/components/bkkk/utils/movingImageData';

function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('moving-images', 'bkkk');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return movingImagePrograms.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('moving-images', slug);
  const data = post ? mapMovingImage(post) : null;
  return bkkkMetadata(
    str(data?.title) ?? slug,
    str(data?.content)?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/bkkk/moving-image/${slug}`, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MovingImageDetailClientPage site="bkkk" slug={slug} />;
}

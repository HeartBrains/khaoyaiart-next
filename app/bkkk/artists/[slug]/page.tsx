import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { mapResidencyArtist } from '@/lib/wp-mappers';
import { bkkkMetadata } from '@/lib/seo';
import { ArtistDetailClientPage } from '@/components/bkkk/ArtistDetailClientPage';
import { ARTISTS_DATA } from '@/components/bkkk/utils/residencyData';

function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('residency-artists', 'bkkk');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return ARTISTS_DATA.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('residency-artists', slug);
  const data = post ? mapResidencyArtist(post) : null;
  return bkkkMetadata(
    data?.name ?? slug,
    data?.bio?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/bkkk/artists/${slug}`, image: data?.featuredImage, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArtistDetailClientPage site="bkkk" slug={slug} />;
}

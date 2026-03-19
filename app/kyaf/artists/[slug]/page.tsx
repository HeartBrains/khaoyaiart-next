import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { mapResidencyArtist } from '@/lib/wp-mappers';
import { kyafMetadata } from '@/lib/seo';
import { ArtistDetailClientPage } from '@/components/kyaf/ArtistDetailClientPage';
import { ARTISTS_DATA } from '@/components/kyaf/utils/residencyData';

export async function generateStaticParams() {
  const posts = await fetchCPT('residency-artists', 'kyaf');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return ARTISTS_DATA.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('residency-artists', slug);
  const data = post ? mapResidencyArtist(post) : null;
  return kyafMetadata(
    data?.name ?? slug,
    data?.bio?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/kyaf/artists/${slug}`, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArtistDetailClientPage site="kyaf" slug={slug} />;
}

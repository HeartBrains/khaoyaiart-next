import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { mapResidencyArtist } from '@/lib/wp-mappers';
import { kyafMetadata } from '@/lib/seo';
import { ArtistDetailClientPage } from '@/components/kyaf/ArtistDetailClientPage';


function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('residency-artists', 'kyaf');
  return posts.map(p => ({ slug: p.slug }));
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

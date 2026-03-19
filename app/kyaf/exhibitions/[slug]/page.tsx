import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { mapKyafExhibition } from '@/lib/wp-mappers';
import { kyafMetadata } from '@/lib/seo';
import { ExhibitionDetailClientPage } from '@/components/kyaf/ExhibitionDetailClientPage';


function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('exhibitions', 'kyaf');
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('exhibitions', slug);
  const data = post ? mapKyafExhibition(post) : null;
  return kyafMetadata(
    str(data?.title) ?? slug,
    str(data?.content)?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/kyaf/exhibitions/${slug}`, image: data?.featuredImage, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExhibitionDetailClientPage site="kyaf" slug={slug} />;
}

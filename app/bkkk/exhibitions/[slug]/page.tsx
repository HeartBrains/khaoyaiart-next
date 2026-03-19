import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { exhibitions } from '@/components/bkkk/utils/exhibitionsDataNew';
import { mapBkkkExhibition } from '@/lib/wp-mappers';
import { bkkkMetadata } from '@/lib/seo';
import { ExhibitionDetailClientPage } from '@/components/bkkk/ExhibitionDetailClientPage';


function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('exhibitions', 'bkkk');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return exhibitions.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('exhibitions', slug);
  const data = post ? mapBkkkExhibition(post) : null;
  return bkkkMetadata(
    str(data?.title) ?? slug,
    str(data?.content)?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/bkkk/exhibitions/${slug}`, image: data?.featuredImage, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExhibitionDetailClientPage site="bkkk" slug={slug} />;
}

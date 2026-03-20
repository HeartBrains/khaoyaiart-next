import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { exhibitions } from '@/components/bkkk/utils/exhibitionsDataNew';
import { mapBkkkExhibition } from '@/lib/wp-mappers';
import { bkkkMetadata } from '@/lib/seo';
import { JsonLd, exhibitionJsonLd, breadcrumbJsonLd } from '@/lib/JsonLd';
import { ExhibitionDetailClientPage } from '@/components/bkkk/ExhibitionDetailClientPage';


function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export const dynamicParams = false;

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
    { path: `/bk/exhibitions/${slug}`, image: data?.featuredImage, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchCPTBySlug('exhibitions', slug);
  const data = post ? mapBkkkExhibition(post) : null;
  const BASE = 'https://bkkk.bkkkapp.com/bk';

  return (
    <>
      {data && (
        <>
          <JsonLd data={exhibitionJsonLd({
            name: str(data.title),
            description: str(data.content)?.replace(/<[^>]+>/g, '').slice(0, 300),
            image: data.featuredImage,
            startDate: data.fromDate,
            endDate: data.toDate,
            url: `${BASE}/exhibitions/${slug}`,
            location: { name: 'Bangkok Kunsthalle', address: 'Bangkok, Thailand' },
            organizer: { name: 'Bangkok Kunsthalle', url: BASE },
          })} />
          <JsonLd data={breadcrumbJsonLd([
            { name: 'Bangkok Kunsthalle', url: BASE },
            { name: 'Exhibitions', url: `${BASE}/exhibitions` },
            { name: str(data.title), url: `${BASE}/exhibitions/${slug}` },
          ])} />
        </>
      )}
      <ExhibitionDetailClientPage site="bkkk" slug={slug} />
    </>
  );
}

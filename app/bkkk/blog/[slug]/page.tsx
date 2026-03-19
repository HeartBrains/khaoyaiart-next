import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { bkkkMetadata } from '@/lib/seo';
import { BlogDetailClientPage } from '@/components/bkkk/BlogDetailClientPage';


function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('posts', 'bkkk');
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('posts', slug);
  return bkkkMetadata(
    post?.title?.rendered ?? slug,
    post?.content?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/bkkk/blog/${slug}`, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailClientPage site="bkkk" slug={slug} />;
}

import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { kyafMetadata } from '@/lib/seo';
import { BlogDetailClientPage } from '@/components/kyaf/BlogDetailClientPage';


function str(v: string | { en: string; th: string } | undefined | null): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v.en ?? '';
}

export async function generateStaticParams() {
  const posts = await fetchCPT('posts', 'kyaf');
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('posts', slug);
  return kyafMetadata(
    post?.title?.rendered ?? slug,
    post?.content?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/kyaf/blog/${slug}`, type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailClientPage site="kyaf" slug={slug} />;
}

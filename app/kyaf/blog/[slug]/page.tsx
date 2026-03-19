import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { kyafMetadata } from '@/lib/seo';
import { BlogDetailClientPage } from '@/components/kyaf/BlogDetailClientPage';
import { MOCK_POSTS_BILINGUAL } from '@/components/bkkk/utils/mockDataBilingual';

export async function generateStaticParams() {
  const posts = await fetchCPT('posts', 'kyaf');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return Object.keys(MOCK_POSTS_BILINGUAL).map(slug => ({ slug }));
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

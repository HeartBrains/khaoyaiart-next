import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { bkkkMetadata } from '@/lib/seo';
import { BlogDetailClientPage } from '@/components/bkkk/BlogDetailClientPage';
import { MOCK_POSTS_BILINGUAL } from '@/components/bkkk/utils/mockDataBilingual';

export async function generateStaticParams() {
  const posts = await fetchCPT('posts', 'bkkk');
  if (posts.length > 0) return posts.map(p => ({ slug: p.slug }));
  return Object.keys(MOCK_POSTS_BILINGUAL).map(slug => ({ slug }));
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

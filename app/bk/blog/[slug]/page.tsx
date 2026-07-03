import type { Metadata } from 'next';
import { fetchCPT, fetchCPTBySlug } from '@/lib/wp-api';
import { bkkkMetadata } from '@/lib/seo';
import { BlogDetailClientPage } from '@/components/bkkk/BlogDetailClientPage';
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await fetchCPT('blog_post', 'bkkk');
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCPTBySlug('blog_post', slug);
  return bkkkMetadata(
    post?.title?.rendered ?? slug,
    post?.content?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    { path: `/bk/blog/${slug}`, image: post?.resolvedFeaturedImage || String(post?.meta?.featured_image_url ?? ''), type: 'article' },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailClientPage site="bkkk" slug={slug} />;
}

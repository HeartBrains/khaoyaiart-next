'use client';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';
import { BlogDetailPage } from '@/components/bkkk/components/pages/BlogDetailPage';

export function BlogDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <BlogDetailPage onNavigate={navigate} slug={slug} />;
}

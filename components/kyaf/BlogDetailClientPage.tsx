'use client';
import { useAppNavigate } from '@/components/kyaf/utils/useAppNavigate';
import { BlogDetailPage } from '@/components/kyaf/components/pages/BlogDetailPage';

export function BlogDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <BlogDetailPage onNavigate={navigate} slug={slug} />;
}

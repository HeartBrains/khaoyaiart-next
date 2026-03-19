'use client';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';
import { ActivityDetailPage } from '@/components/bkkk/components/pages/ActivityDetailPage';

export function ActivityDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <ActivityDetailPage onNavigate={navigate} slug={slug} />;
}

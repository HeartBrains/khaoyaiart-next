'use client';
import { useAppNavigate } from '@/components/kyaf/utils/useAppNavigate';
import { ActivityDetailPage } from '@/components/kyaf/components/pages/ActivityDetailPage';

export function ActivityDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <ActivityDetailPage onNavigate={navigate} slug={slug} />;
}

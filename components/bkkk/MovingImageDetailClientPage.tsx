'use client';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';
import { MovingImageDetailPage } from '@/components/bkkk/components/pages/MovingImageDetailPage';

export function MovingImageDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <MovingImageDetailPage onNavigate={navigate} slug={slug} />;
}

'use client';
import { useAppNavigate } from '@/components/kyaf/utils/useAppNavigate';
import { ExhibitionDetailPage } from '@/components/kyaf/components/pages/ExhibitionDetailPage';

export function ExhibitionDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <ExhibitionDetailPage onNavigate={navigate} slug={slug} />;
}

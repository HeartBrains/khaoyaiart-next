'use client';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';
import { ArtistDetailPage } from '@/components/bkkk/components/pages/ArtistDetailPage';

export function ArtistDetailClientPage({ slug, site }: { slug: string; site?: string }) {
  const navigate = useAppNavigate();
  return <ArtistDetailPage onNavigate={navigate} slug={slug} />;
}

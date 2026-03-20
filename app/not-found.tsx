'use client';
import { useEffect, useState } from 'react';

// KYAF detail components
import { ExhibitionDetailClientPage as KyafExhibitionDetail } from '@/components/kyaf/ExhibitionDetailClientPage';
import { ActivityDetailClientPage as KyafActivityDetail } from '@/components/kyaf/ActivityDetailClientPage';
import { ArtistDetailClientPage as KyafArtistDetail } from '@/components/kyaf/ArtistDetailClientPage';
import { BlogDetailClientPage as KyafBlogDetail } from '@/components/kyaf/BlogDetailClientPage';

// BKKK detail components
import { ExhibitionDetailClientPage as BkkkExhibitionDetail } from '@/components/bkkk/ExhibitionDetailClientPage';
import { ActivityDetailClientPage as BkkkActivityDetail } from '@/components/bkkk/ActivityDetailClientPage';
import { ArtistDetailClientPage as BkkkArtistDetail } from '@/components/bkkk/ArtistDetailClientPage';
import { BlogDetailClientPage as BkkkBlogDetail } from '@/components/bkkk/BlogDetailClientPage';
import { MovingImageDetailClientPage as BkkkMovingImageDetail } from '@/components/bkkk/MovingImageDetailClientPage';

type RouteMatch = {
  site: 'kyaf' | 'bkkk';
  cpt: string;
  slug: string;
} | null;

function matchRoute(pathname: string): RouteMatch {
  // Strip trailing slash
  const path = pathname.replace(/\/$/, '');
  const parts = path.split('/').filter(Boolean);
  // Expected: ['kyaf' | 'bkkk', cpt, slug]
  if (parts.length !== 3) return null;
  const [site, cpt, slug] = parts;
  if (site !== 'kyaf' && site !== 'bkkk') return null;
  const knownCpts = ['exhibitions', 'activities', 'moving-image', 'artists', 'blog'];
  if (!knownCpts.includes(cpt)) return null;
  return { site: site as 'kyaf' | 'bkkk', cpt, slug };
}

function DetailShell({ site, cpt, slug }: { site: 'kyaf' | 'bkkk'; cpt: string; slug: string }) {
  if (site === 'kyaf') {
    if (cpt === 'exhibitions') return <KyafExhibitionDetail slug={slug} site={site} />;
    if (cpt === 'activities')  return <KyafActivityDetail slug={slug} site={site} />;
    if (cpt === 'artists')     return <KyafArtistDetail slug={slug} site={site} />;
    if (cpt === 'blog')        return <KyafBlogDetail slug={slug} site={site} />;
  }
  if (site === 'bkkk') {
    if (cpt === 'exhibitions')  return <BkkkExhibitionDetail slug={slug} site={site} />;
    if (cpt === 'activities')   return <BkkkActivityDetail slug={slug} site={site} />;
    if (cpt === 'moving-image') return <BkkkMovingImageDetail slug={slug} site={site} />;
    if (cpt === 'artists')      return <BkkkArtistDetail slug={slug} site={site} />;
    if (cpt === 'blog')         return <BkkkBlogDetail slug={slug} site={site} />;
  }
  return null;
}

export default function NotFound() {
  const [route, setRoute] = useState<RouteMatch | 'loading'>('loading');

  useEffect(() => {
    setRoute(matchRoute(window.location.pathname));
  }, []);

  // Still detecting route
  if (route === 'loading') return null;

  // Matched a known detail route — render the client-side shell
  if (route !== null) {
    return <DetailShell {...route} />;
  }

  // Genuine 404
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans text-center px-6">
      <p className="text-6xl font-light mb-4">404</p>
      <p className="text-lg text-gray-500">Page not found</p>
    </div>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const PAGE_TO_PATH: Record<string, string> = {
  home: '/bkkk',
  khaoyai: '/kyaf',
  about: '/bkkk/about',
  vision: '/bkkk/about/vision',
  history: '/bkkk/about/history',
  founder: '/bkkk/team',
  team: '/bkkk/team',
  support: '/bkkk/support',
  visit: '/bkkk/visit',
  news: '/bkkk/news',
  activities: '/bkkk/activities',
  'activity-detail': '/bkkk/activities/:slug',
  blog: '/bkkk/blog',
  'blog-detail': '/bkkk/blog/:slug',
  exhibitions: '/bkkk/exhibitions',
  'exhibition-detail': '/bkkk/exhibitions/:slug',
  archives: '/bkkk/archives',
  residency: '/bkkk/residency',
  'artist-detail': '/bkkk/artists/:slug',
  'moving-image': '/bkkk/moving-image',
  'moving-image-detail': '/bkkk/moving-image/:slug',
  shop: '/bkkk/shop',
  press: '/bkkk/press',
  contact: '/bkkk/contact',
  'hidden-assets': '/bkkk/hidden-assets',
};

function pageToPath(page: string, slug?: string): string {
  const template = PAGE_TO_PATH[page] || `/bkkk/${page}`;
  if (slug && template.includes(':slug')) {
    return template.replace(':slug', slug);
  }
  return template;
}

export function useAppNavigate() {
  const router = useRouter();
  return useCallback(
    (page: string, slug?: string, sectionId?: string) => {
      const path = pageToPath(page, slug);
      router.push(path);
      if (!sectionId) window.scrollTo(0, 0);
    },
    [router]
  );
}

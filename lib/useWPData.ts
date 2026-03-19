'use client';
import { useState, useEffect } from 'react';
import type { WPRawPost } from './wp-api';
import {
  mapBkkkExhibition, mapKyafExhibition, mapMovingImage,
  mapActivity, mapResidencyArtist,
} from './wp-mappers';

const WP_BASE = (
  process.env.NEXT_PUBLIC_WP_BASE_URL ?? 'https://content.bkkkapp.com/wp-json/wp/v2'
).replace(/\/$/, '');

async function clientFetchCPT(cpt: string, site: 'bkkk' | 'kyaf'): Promise<WPRawPost[]> {
  try {
    const allPosts: WPRawPost[] = [];
    let page = 1;
    while (true) {
      const url = `${WP_BASE}/${cpt}?per_page=100&page=${page}&_fields=id,slug,title,content,date,modified,meta`;
      const res = await fetch(url);
      if (!res.ok) break;
      const data: WPRawPost[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allPosts.push(...data);
      const total = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
      if (page >= total) break;
      page++;
    }
    return allPosts.filter(p => !p.meta?.site || p.meta.site === site);
  } catch {
    return [];
  }
}

function useWPList<T>(cpt: string, site: 'bkkk' | 'kyaf', mapper: (p: WPRawPost) => T) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    clientFetchCPT(cpt, site).then(posts => {
      setData(posts.map(mapper));
      setLoading(false);
    });
  }, [cpt, site]);
  return { data, loading };
}

function useWPItem<T>(cpt: string, slug: string, mapper: (p: WPRawPost) => T) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!slug) return;
    fetchCPTBySlug(cpt, slug).then(post => {
      if (!post) setError('Not found');
      setData(post ? mapper(post) : null);
      setLoading(false);
    }).catch(e => {
      setError(String(e));
      setLoading(false);
    });
  }, [cpt, slug]);
  return { data, loading, error };
}

export const useBkkkExhibitions = () => useWPList('exhibitions', 'bkkk', mapBkkkExhibition);
export const useKyafExhibitions = () => useWPList('exhibitions', 'kyaf', mapKyafExhibition);
export const useBkkkActivities  = () => useWPList('activities', 'bkkk', mapActivity);
export const useKyafActivities  = () => useWPList('activities', 'kyaf', mapActivity);
export const useMovingImages    = () => useWPList('moving-images', 'bkkk', mapMovingImage);
export const useResidencyArtists = () => useWPList('residency-artists', 'bkkk', mapResidencyArtist);

export const useExhibitionBySlug    = (slug: string) => useWPItem('exhibitions', slug, mapBkkkExhibition);
export const useActivityBySlug      = (slug: string) => useWPItem('activities', slug, mapActivity);
export const useMovingImageBySlug   = (slug: string) => useWPItem('moving-images', slug, mapMovingImage);
export const useResidencyArtistBySlug = (slug: string) => useWPItem('residency-artists', slug, mapResidencyArtist);

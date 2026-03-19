'use client';
import { useState, useEffect } from 'react';
import { fetchCPTBySlug, type WPRawPost } from './wp-api';
import {
  mapBkkkExhibition, mapKyafExhibition, mapMovingImage,
  mapActivity, mapResidencyArtist, mapBkkkTeamMember, mapKyafTeamMember,
} from './wp-mappers';

const _WP_URL = (process.env.NEXT_PUBLIC_WP_BASE_URL ?? 'https://content.bkkkapp.com').replace(/\/$/, '');
const WP_BASE = _WP_URL.endsWith('/wp-json/wp/v2') ? _WP_URL : `${_WP_URL}/wp-json/wp/v2`;

async function batchResolveMedia(ids: number[]): Promise<Map<number, string>> {
  const unique = [...new Set(ids.filter(id => id > 0))];
  if (unique.length === 0) return new Map();
  try {
    const url = `${WP_BASE}/media?include=${unique.join(',')}&per_page=100&_fields=id,source_url`;
    const res = await fetch(url);
    if (!res.ok) return new Map();
    const data: Array<{ id: number; source_url: string }> = await res.json();
    return new Map(data.map(m => [m.id, m.source_url]));
  } catch {
    return new Map();
  }
}

async function clientFetchCPT(cpt: string, site: 'bkkk' | 'kyaf'): Promise<WPRawPost[]> {
  try {
    const allPosts: WPRawPost[] = [];
    let page = 1;
    while (true) {
      const url = `${WP_BASE}/${cpt}?per_page=100&page=${page}&_fields=id,slug,title,content,date,modified,meta,featured_media`;
      const res = await fetch(url);
      if (!res.ok) break;
      const data: WPRawPost[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      allPosts.push(...data);
      const total = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
      if (page >= total) break;
      page++;
    }
    const filtered = allPosts.filter(p => !p.meta?.site || p.meta.site === site);

    // Collect and batch-resolve all media IDs
    const mediaIds: number[] = [];
    for (const post of filtered) {
      if (post.featured_media && post.featured_media > 0) mediaIds.push(post.featured_media);
      const gm = post.meta?.gallery_media;
      if (Array.isArray(gm)) gm.forEach(id => { const n = Number(id); if (n > 0) mediaIds.push(n); });
    }
    const mediaMap = await batchResolveMedia(mediaIds);

    return filtered.map(post => {
      const featuredUrl = post.featured_media && post.featured_media > 0
        ? (mediaMap.get(post.featured_media) ?? '') : '';
      const gm = post.meta?.gallery_media;
      const galleryUrls = Array.isArray(gm)
        ? gm.map(id => mediaMap.get(Number(id)) ?? '').filter(Boolean) : [];
      return { ...post, resolvedFeaturedImage: featuredUrl, resolvedGallery: galleryUrls };
    });
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

export const useBkkkTeamMembers = () => useWPList('team-members', 'bkkk', mapBkkkTeamMember);
export const useKyafTeamMembers = () => useWPList('team-members', 'kyaf', mapKyafTeamMember);

export const useExhibitionBySlug        = (slug: string) => useWPItem('exhibitions', slug, mapBkkkExhibition);
export const useKyafExhibitionBySlug    = (slug: string) => useWPItem('exhibitions', slug, mapKyafExhibition);
export const useActivityBySlug      = (slug: string) => useWPItem('activities', slug, mapActivity);
export const useMovingImageBySlug   = (slug: string) => useWPItem('moving-images', slug, mapMovingImage);
export const useResidencyArtistBySlug = (slug: string) => useWPItem('residency-artists', slug, mapResidencyArtist);

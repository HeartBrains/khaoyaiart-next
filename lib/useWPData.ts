'use client';
import { useState, useEffect } from 'react';
import { fetchCPT, fetchCPTBySlug, type WPRawPost } from './wp-api';
import {
  mapBkkkExhibition, mapKyafExhibition, mapMovingImage,
  mapActivity, mapResidencyArtist,
} from './wp-mappers';

function useWPList<T>(cpt: string, site: 'bkkk' | 'kyaf', mapper: (p: WPRawPost) => T) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCPT(cpt, site).then(posts => {
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

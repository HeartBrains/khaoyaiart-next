import type { Metadata } from 'next';

const BKKK_BASE_URL = process.env.BKKK_BASE_URL ?? 'https://next.bkkapp.com/bkkk';
const KYAF_BASE_URL = process.env.KYAF_BASE_URL ?? 'https://next.bkkapp.com/kyaf';

export const BKKK_DEFAULT_OG_IMAGE = `${BKKK_BASE_URL}/og-bkkk.jpg`;
export const KYAF_DEFAULT_OG_IMAGE = `${KYAF_BASE_URL}/og-kyaf.jpg`;

export function bkkkMetadata(
  title: string,
  description: string,
  opts: { path?: string; image?: string; type?: 'website' | 'article' } = {},
): Metadata {
  const url = opts.path ? `${BKKK_BASE_URL}${opts.path}` : BKKK_BASE_URL;
  const image = opts.image ?? BKKK_DEFAULT_OG_IMAGE;
  return {
    title: `${title} | Bangkok Kunsthalle`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Bangkok Kunsthalle`,
      description,
      url,
      images: [{ url: image }],
      type: opts.type ?? 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Bangkok Kunsthalle`,
      description,
      images: [image],
    },
  };
}

export function kyafMetadata(
  title: string,
  description: string,
  opts: { path?: string; image?: string; type?: 'website' | 'article' } = {},
): Metadata {
  const url = opts.path ? `${KYAF_BASE_URL}${opts.path}` : KYAF_BASE_URL;
  const image = opts.image ?? KYAF_DEFAULT_OG_IMAGE;
  return {
    title: `${title} | Khao Yai Art Forest`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Khao Yai Art Forest`,
      description,
      url,
      images: [{ url: image }],
      type: opts.type ?? 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Khao Yai Art Forest`,
      description,
      images: [image],
    },
  };
}

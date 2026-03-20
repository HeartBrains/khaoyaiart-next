import type { Metadata } from 'next';
import { LandingClient } from './landing-client';

export const metadata: Metadata = {
  title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
  description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
  alternates: { canonical: 'https://khaoyaiart.org' },
  openGraph: {
    title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
    url: 'https://khaoyaiart.org',
    siteName: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://khaoyaiart.org/og-landing.jpg', width: 1200, height: 630, alt: 'Bangkok Kunsthalle / Khao Yai Art Forest' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
    images: ['https://khaoyaiart.org/og-landing.jpg'],
  },
};

export default function Page() {
  return <LandingClient />;
}

import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/utils/languageContext';

export const metadata: Metadata = {
  title: {
    default: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    template: '%s | Bangkok Kunsthalle / Khao Yai Art Forest',
  },
  description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
  metadataBase: new URL('https://khaoyai.bkkkapp.com'),
  keywords: ['Bangkok Kunsthalle', 'Khao Yai Art Forest', 'contemporary art', 'Thailand', 'art gallery', 'exhibitions'],
  alternates: { canonical: 'https://khaoyai.bkkkapp.com' },
  openGraph: {
    title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
    url: 'https://khaoyai.bkkkapp.com',
    siteName: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://khaoyai.bkkkapp.com/og-landing.jpg', width: 1200, height: 630, alt: 'Bangkok Kunsthalle / Khao Yai Art Forest' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
    images: ['https://khaoyai.bkkkapp.com/og-landing.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

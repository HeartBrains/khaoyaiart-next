import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { LanguageProvider } from '@/utils/languageContext';

export const metadata: Metadata = {
  title: {
    default: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    template: '%s | Bangkok Kunsthalle / Khao Yai Art Forest',
  },
  description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle in Bangkok and Khao Yai Art Forest in Khao Yai.',
  metadataBase: new URL('https://khaoyaiart.org'),
  keywords: ['Bangkok Kunsthalle', 'Khao Yai Art Forest', 'contemporary art', 'Thailand', 'art gallery', 'exhibitions'],
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
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18039634862"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18039634862');
          `}
        </Script>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

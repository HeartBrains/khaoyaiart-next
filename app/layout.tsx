import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/utils/languageContext';

export const metadata: Metadata = {
  title: {
    default: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    template: '%s | Bangkok Kunsthalle / Khao Yai Art Forest',
  },
  description: 'Contemporary art spaces in Thailand — Bangkok Kunsthalle and Khao Yai Art Forest.',
  metadataBase: new URL('https://next.bkkapp.com'),
  openGraph: {
    siteName: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
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

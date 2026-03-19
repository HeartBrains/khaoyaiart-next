import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/utils/languageContext';

export const metadata: Metadata = {
  title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
  description: 'Two contemporary art spaces in Thailand',
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

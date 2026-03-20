import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ResidencyPage } from '@/components/bkkk/components/pages/ResidencyPage';

export const metadata: Metadata = bkkkMetadata('Residency', 'Bangkok Kunsthalle artist-in-residence programme supporting emerging and established artists.', { path: '/bk/residency' });

export default function Page() {
  return <ResidencyPage />;
}

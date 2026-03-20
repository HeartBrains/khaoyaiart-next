import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ResidencyPage } from '@/components/kyaf/components/pages/ResidencyPage';

export const metadata: Metadata = kyafMetadata('Residency', 'Khao Yai Art Forest artist-in-residence programme set in the forests of Khao Yai, Thailand.', { path: '/kyaf/residency' });

export default function Page() {
  return <ResidencyPage />;
}

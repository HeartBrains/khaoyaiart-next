import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ResidencyPage } from '@/components/kyaf/components/pages/ResidencyPage';

export const metadata: Metadata = kyafMetadata('Residency', 'Artist residency program at Khao Yai Art Forest.', { path: '/kyaf/residency' });

export default function Page() {
  return <ResidencyPage />;
}

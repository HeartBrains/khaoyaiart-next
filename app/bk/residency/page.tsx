import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ResidencyPage } from '@/components/bkkk/components/pages/ResidencyPage';

export const metadata: Metadata = bkkkMetadata('Residency', 'Artist residency program at Bangkok Kunsthalle.', { path: '/bk/residency' });

export default function Page() {
  return <ResidencyPage />;
}

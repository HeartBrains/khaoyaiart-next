import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Residency', 'Artist residency at Bangkok Kunsthalle.', { path: '/bkkk/residency' });

export default function Page() {
  return <ClientPage site="bkkk" component="ResidencyPage"  />;
}

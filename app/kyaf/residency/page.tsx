import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Residency', 'Artist residency at Khao Yai Art Forest.', { path: '/kyaf/residency' });

export default function Page() {
  return <ClientPage site="kyaf" component="ResidencyPage"  />;
}

import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Visit', 'How to visit Khao Yai Art Forest.', { path: '/kyaf/visit' });

export default function Page() {
  return <ClientPage site="kyaf" component="VisitPage"  />;
}

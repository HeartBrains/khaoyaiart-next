import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Visit', 'Opening hours, address, and how to get to Khao Yai Art Forest.', { path: '/kyaf/visit' });

export default function Page() {
  return <ClientPage site="kyaf" component="VisitPage"  />;
}

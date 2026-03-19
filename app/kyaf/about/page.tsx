import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('About', 'Khao Yai Art Forest is an independent contemporary art space in the forests of Khao Yai, Thailand.', { path: '/kyaf/about' });

export default function Page() {
  return <ClientPage site="kyaf" component="AboutPage"  />;
}

import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Exhibitions', 'Khao Yai Art Forest exhibitions.', { path: '/kyaf/exhibitions' });

export default function Page() {
  return <ClientPage site="kyaf" component="ExhibitionsPage"  />;
}

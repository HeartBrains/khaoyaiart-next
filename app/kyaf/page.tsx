import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Khao Yai Art Forest', 'Contemporary art space in Khao Yai, Thailand.', { path: '/kyaf' });

export default function Page() {
  return <ClientPage site="kyaf" component="HomePage"  />;
}

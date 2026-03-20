import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('History', 'The founding and history of Khao Yai Art Forest.', { path: '/kyaf/about/history' });

export default function Page() {
  return <ClientPage site="kyaf" component="HistoryPage"  />;
}

import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('History', 'The history of Bangkok Kunsthalle.', { path: '/bk/about/history' });

export default function Page() {
  return <ClientPage site="bkkk" component="HistoryPage"  />;
}

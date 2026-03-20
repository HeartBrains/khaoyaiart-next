import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('News', 'Bangkok Kunsthalle news.', { path: '/bk/news' });

export default function Page() {
  return <ClientPage site="bkkk" component="NewsPage"  />;
}

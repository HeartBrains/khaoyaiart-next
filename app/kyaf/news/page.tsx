import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('News', 'Khao Yai Art Forest news.', { path: '/kyaf/news' });

export default function Page() {
  return <ClientPage site="kyaf" component="NewsPage"  />;
}

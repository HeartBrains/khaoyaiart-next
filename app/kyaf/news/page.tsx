import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('News', 'Latest news and announcements from Khao Yai Art Forest.', { path: '/kyaf/news' });

export default function Page() {
  return <ClientPage site="kyaf" component="NewsPage"  />;
}

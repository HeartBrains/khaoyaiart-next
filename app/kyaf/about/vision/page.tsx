import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Vision', 'The vision and mission of Khao Yai Art Forest.', { path: '/kyaf/about/vision' });

export default function Page() {
  return <ClientPage site="kyaf" component="VisionPage"  />;
}

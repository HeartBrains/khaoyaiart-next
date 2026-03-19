import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('About', 'About Khao Yai Art Forest.', { path: '/kyaf/about' });

export default function Page() {
  return <ClientPage site="kyaf" component="AboutPage"  />;
}

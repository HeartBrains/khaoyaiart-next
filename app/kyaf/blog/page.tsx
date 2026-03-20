import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Blog', 'Essays, reflections, and writing from Khao Yai Art Forest.', { path: '/kyaf/blog' });

export default function Page() {
  return <ClientPage site="kyaf" component="BlogPage"  />;
}

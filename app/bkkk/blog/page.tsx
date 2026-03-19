import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Blog', 'Writing and reflections from Bangkok Kunsthalle.', { path: '/bkkk/blog' });

export default function Page() {
  return <ClientPage site="bkkk" component="BlogPage"  />;
}

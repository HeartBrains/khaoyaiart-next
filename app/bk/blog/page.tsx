import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Blog', 'Writing and reflections from Bangkok Kunsthalle.', { path: '/bk/blog' });

export default function Page() {
  return <ClientPage site="bkkk" component="BlogPage"  />;
}

import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('About', 'Bangkok Kunsthalle is an independent contemporary art institution in Bangkok, Thailand.', { path: '/bk/about' });

export default function Page() {
  return <ClientPage site="bkkk" component="AboutPage"  />;
}

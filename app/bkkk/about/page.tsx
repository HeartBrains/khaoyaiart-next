import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('About', 'About Bangkok Kunsthalle.', { path: '/bkkk/about' });

export default function Page() {
  return <ClientPage site="bkkk" component="AboutPage"  />;
}

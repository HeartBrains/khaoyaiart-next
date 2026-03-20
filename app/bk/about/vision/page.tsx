import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Vision', 'The vision, mission, and values of Bangkok Kunsthalle.', { path: '/bk/about/vision' });

export default function Page() {
  return <ClientPage site="bkkk" component="VisionPage"  />;
}

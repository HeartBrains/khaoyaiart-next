import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Vision', 'Vision of Bangkok Kunsthalle.', { path: '/bkkk/about/vision' });

export default function Page() {
  return <ClientPage site="bkkk" component="VisionPage"  />;
}

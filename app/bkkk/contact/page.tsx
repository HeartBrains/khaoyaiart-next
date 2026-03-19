import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Contact', 'Contact Bangkok Kunsthalle.', { path: '/bkkk/contact' });

export default function Page() {
  return <ClientPage site="bkkk" component="ContactPage"  />;
}

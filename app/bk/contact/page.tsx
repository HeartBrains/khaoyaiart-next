import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Contact', 'Get in touch with Bangkok Kunsthalle.', { path: '/bk/contact' });

export default function Page() {
  return <ClientPage site="bkkk" component="ContactPage"  />;
}

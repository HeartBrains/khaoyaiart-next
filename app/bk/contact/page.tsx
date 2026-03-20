import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Contact', 'Contact Bangkok Kunsthalle — address, email, and enquiry form.', { path: '/bk/contact' });

export default function Page() {
  return <ClientPage site="bkkk" component="ContactPage"  />;
}

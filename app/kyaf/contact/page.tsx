import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Contact', 'Contact Khao Yai Art Forest — address, email, and enquiry form.', { path: '/kyaf/contact' });

export default function Page() {
  return <ClientPage site="kyaf" component="ContactPage"  />;
}

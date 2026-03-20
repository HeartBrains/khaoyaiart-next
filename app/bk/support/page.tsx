import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Support', 'Support Bangkok Kunsthalle and help sustain independent contemporary art in Thailand.', { path: '/bk/support' });

export default function Page() {
  return <ClientPage site="bkkk" component="SupportPage"  />;
}

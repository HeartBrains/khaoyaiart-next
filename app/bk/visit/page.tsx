import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Visit', 'Opening hours, address, and how to get to Bangkok Kunsthalle.', { path: '/bk/visit' });

export default function Page() {
  return <ClientPage site="bkkk" component="VisitPage"  />;
}

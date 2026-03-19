import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Visit', 'Opening hours, location, and visitor information for Bangkok Kunsthalle.', { path: '/bkkk/visit' });

export default function Page() {
  return <ClientPage site="bkkk" component="VisitPage"  />;
}

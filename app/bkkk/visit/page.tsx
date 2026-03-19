import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Visit', 'How to visit Bangkok Kunsthalle.', { path: '/bkkk/visit' });

export default function Page() {
  return <ClientPage site="bkkk" component="VisitPage"  />;
}

import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Exhibitions', 'Bangkok Kunsthalle exhibitions.', { path: '/bkkk/exhibitions' });

export default function Page() {
  return <ClientPage site="bkkk" component="ExhibitionsPage"  />;
}

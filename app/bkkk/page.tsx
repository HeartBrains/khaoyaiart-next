import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Bangkok Kunsthalle', 'Contemporary art space in Bangkok, Thailand.', { path: '/bkkk' });

export default function Page() {
  return <ClientPage site="bkkk" component="HomePage"  />;
}

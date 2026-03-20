import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Archives', 'Archive of past exhibitions, programmes, and activities at Bangkok Kunsthalle.', { path: '/bk/archives' });

export default function Page() {
  return <ClientPage site="bkkk" component="ArchivesPage"  />;
}

import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Archives', 'Bangkok Kunsthalle archives.', { path: '/bkkk/archives' });

export default function Page() {
  return <ClientPage site="bkkk" component="ArchivesPage"  />;
}

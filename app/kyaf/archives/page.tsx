import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Archives', 'Khao Yai Art Forest archives.', { path: '/kyaf/archives' });

export default function Page() {
  return <ClientPage site="kyaf" component="ArchivesPage"  />;
}

import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Archives', 'Archive of past exhibitions, programmes, and activities at Khao Yai Art Forest.', { path: '/kyaf/archives' });

export default function Page() {
  return <ClientPage site="kyaf" component="ArchivesPage"  />;
}

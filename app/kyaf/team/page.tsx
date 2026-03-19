import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Team', 'The people behind Khao Yai Art Forest.', { path: '/kyaf/team' });

export default function Page() {
  return <ClientPage site="kyaf" component="TeamPage"  />;
}

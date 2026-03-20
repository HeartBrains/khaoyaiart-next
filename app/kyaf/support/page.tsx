import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Support', 'Support Khao Yai Art Forest and help sustain independent contemporary art in Thailand.', { path: '/kyaf/support' });

export default function Page() {
  return <ClientPage site="kyaf" component="SupportPage"  />;
}

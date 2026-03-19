import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Press', 'Khao Yai Art Forest press.', { path: '/kyaf/press' });

export default function Page() {
  return <ClientPage site="kyaf" component="PressPage"  />;
}

import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Activities', 'Public programmes, events, and activities at Khao Yai Art Forest.', { path: '/kyaf/activities' });

export default function Page() {
  return <ClientPage site="kyaf" component="ActivitiesPage"  />;
}

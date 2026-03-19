import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Activities', 'Events and activities at Bangkok Kunsthalle.', { path: '/bkkk/activities' });

export default function Page() {
  return <ClientPage site="bkkk" component="ActivitiesPage"  />;
}

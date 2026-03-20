import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ActivitiesPage } from '@/components/kyaf/components/pages/ActivitiesPage';

export const metadata: Metadata = kyafMetadata('Activities', 'Talks, screenings, workshops, and public programmes at Khao Yai Art Forest.', { path: '/kyaf/activities' });

export default function Page() {
  return <ActivitiesPage />;
}

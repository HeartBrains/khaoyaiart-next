import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ActivitiesPage } from '@/components/kyaf/components/pages/ActivitiesPage';

export const metadata: Metadata = kyafMetadata('Activities', 'Public programs, screenings, and events at Khao Yai Art Forest.', { path: '/kyaf/activities' });

export default function Page() {
  return <ActivitiesPage />;
}

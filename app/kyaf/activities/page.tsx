import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapActivity } from '@/lib/wp-mappers';
import { ActivitiesPage } from '@/components/kyaf/components/pages/ActivitiesPage';

export const metadata: Metadata = kyafMetadata('Activities', 'Public programs, screenings, and events at Khao Yai Art Forest.', { path: '/kyaf/activities' });

export default async function Page() {
  const posts = await fetchCPT('activity', 'kyaf');
  const activities = posts.map(p => mapActivity(p));
  return <ActivitiesPage initialData={activities} />;
}

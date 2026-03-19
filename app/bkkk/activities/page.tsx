import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapActivity } from '@/lib/wp-mappers';
import { ActivitiesPage } from '@/components/bkkk/components/pages/ActivitiesPage';

export const metadata: Metadata = bkkkMetadata('Activities', 'Public programs, screenings, and events at Bangkok Kunsthalle.', { path: '/bkkk/activities' });

export default async function Page() {
  const posts = await fetchCPT('activity', 'bkkk');
  const activities = posts.map(p => mapActivity(p));
  return <ActivitiesPage initialData={activities} />;
}

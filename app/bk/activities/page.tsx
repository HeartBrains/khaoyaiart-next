import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ActivitiesPage } from '@/components/bkkk/components/pages/ActivitiesPage';

export const metadata: Metadata = bkkkMetadata('Activities', 'Talks, screenings, workshops, and public programmes at Bangkok Kunsthalle.', { path: '/bk/activities' });

export default function Page() {
  return <ActivitiesPage />;
}

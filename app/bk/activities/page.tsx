import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ActivitiesPage } from '@/components/bkkk/components/pages/ActivitiesPage';

export const metadata: Metadata = bkkkMetadata('Activities', 'Public programs, screenings, and events at Bangkok Kunsthalle.', { path: '/bk/activities' });

export default function Page() {
  return <ActivitiesPage />;
}

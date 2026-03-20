import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { TeamPage } from '@/components/bkkk/components/pages/TeamPage';

export const metadata: Metadata = bkkkMetadata('Team', 'The team behind Bangkok Kunsthalle.', { path: '/bkkk/team' });

export default function Page() {
  return <TeamPage />;
}

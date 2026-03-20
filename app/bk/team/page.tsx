import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { TeamPage } from '@/components/bkkk/components/pages/TeamPage';

export const metadata: Metadata = bkkkMetadata('Team', 'The people behind Bangkok Kunsthalle.', { path: '/bk/team' });

export default function Page() {
  return <TeamPage />;
}

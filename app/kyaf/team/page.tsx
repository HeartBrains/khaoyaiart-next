import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { TeamPage } from '@/components/kyaf/components/pages/TeamPage';

export const metadata: Metadata = kyafMetadata('Team', 'The team behind Khao Yai Art Forest.', { path: '/kyaf/team' });

export default function Page() {
  return <TeamPage />;
}

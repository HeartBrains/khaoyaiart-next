import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapKyafTeamMember } from '@/lib/wp-mappers';
import { TeamPage } from '@/components/kyaf/components/pages/TeamPage';

export const metadata: Metadata = kyafMetadata('Team', 'The team behind Khao Yai Art Forest.', { path: '/kyaf/team' });

export default async function Page() {
  const posts = await fetchCPT('team_member', 'kyaf');
  const members = posts.map(mapKyafTeamMember);
  return <TeamPage initialData={members} />;
}

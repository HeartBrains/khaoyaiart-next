import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapBkkkTeamMember } from '@/lib/wp-mappers';
import { TeamPage } from '@/components/bkkk/components/pages/TeamPage';

export const metadata: Metadata = bkkkMetadata('Team', 'The team behind Bangkok Kunsthalle.', { path: '/bkkk/team' });

export default async function Page() {
  const posts = await fetchCPT('team_member', 'bkkk');
  const members = posts.map(mapBkkkTeamMember);
  return <TeamPage initialData={members} />;
}

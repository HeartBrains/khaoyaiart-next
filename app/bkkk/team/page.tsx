import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Team', 'The people behind Bangkok Kunsthalle.', { path: '/bkkk/team' });

export default function Page() {
  return <ClientPage site="bkkk" component="TeamPage"  />;
}

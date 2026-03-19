import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapKyafExhibition } from '@/lib/wp-mappers';
import { ExhibitionsPage } from '@/components/kyaf/components/pages/ExhibitionsPage';

export const metadata: Metadata = kyafMetadata('Exhibitions', 'Current, upcoming, and past exhibitions at Khao Yai Art Forest.', { path: '/kyaf/exhibitions' });

export default async function Page() {
  const posts = await fetchCPT('exhibition', 'kyaf');
  const exhibitions = posts.map(mapKyafExhibition);
  return <ExhibitionsPage initialData={exhibitions} />;
}

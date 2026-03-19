import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapBkkkExhibition } from '@/lib/wp-mappers';
import { ExhibitionsPage } from '@/components/bkkk/components/pages/ExhibitionsPage';

export const metadata: Metadata = bkkkMetadata('Exhibitions', 'Current, upcoming, and past exhibitions at Bangkok Kunsthalle.', { path: '/bkkk/exhibitions' });

export default async function Page() {
  const posts = await fetchCPT('exhibition', 'bkkk');
  const exhibitions = posts.map(mapBkkkExhibition);
  return <ExhibitionsPage initialData={exhibitions} />;
}

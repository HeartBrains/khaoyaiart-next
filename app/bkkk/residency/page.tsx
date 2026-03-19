import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapResidencyArtist } from '@/lib/wp-mappers';
import { ResidencyPage } from '@/components/bkkk/components/pages/ResidencyPage';

export const metadata: Metadata = bkkkMetadata('Residency', 'Artist residency program at Bangkok Kunsthalle.', { path: '/bkkk/residency' });

export default async function Page() {
  const posts = await fetchCPT('residency_artist', 'bkkk');
  const artists = posts.map(mapResidencyArtist);
  return <ResidencyPage initialData={artists} />;
}

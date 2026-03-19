import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapResidencyArtist } from '@/lib/wp-mappers';
import { ResidencyPage } from '@/components/kyaf/components/pages/ResidencyPage';

export const metadata: Metadata = kyafMetadata('Residency', 'Artist residency program at Khao Yai Art Forest.', { path: '/kyaf/residency' });

export default async function Page() {
  const posts = await fetchCPT('residency_artist', 'kyaf');
  const artists = posts.map(mapResidencyArtist);
  return <ResidencyPage initialData={artists} />;
}

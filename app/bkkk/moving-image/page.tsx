import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { fetchCPT } from '@/lib/wp-api';
import { mapMovingImage } from '@/lib/wp-mappers';
import { MovingImagePage } from '@/components/bkkk/components/pages/MovingImagePage';

export const metadata: Metadata = bkkkMetadata('Moving Image', 'Moving image works at Bangkok Kunsthalle.', { path: '/bkkk/moving-images' });

export default async function Page() {
  const posts = await fetchCPT('moving_image', 'bkkk');
  const items = posts.map(mapMovingImage);
  return <MovingImagePage initialData={items} />;
}

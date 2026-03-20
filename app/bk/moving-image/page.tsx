import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { MovingImagePage } from '@/components/bkkk/components/pages/MovingImagePage';

export const metadata: Metadata = bkkkMetadata('Moving Image', 'Moving image works at Bangkok Kunsthalle.', { path: '/bk/moving-images' });

export default function Page() {
  return <MovingImagePage />;
}

import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { MovingImagePage } from '@/components/bkkk/components/pages/MovingImagePage';

export const metadata: Metadata = bkkkMetadata('Moving Image', 'Film, video, and moving image works presented by Bangkok Kunsthalle.', { path: '/bk/moving-image' });

export default function Page() {
  return <MovingImagePage />;
}

import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Moving Image', 'Moving image programme at Bangkok Kunsthalle — film screenings and video art.', { path: '/bkkk/moving-image' });

export default function Page() {
  return <ClientPage site="bkkk" component="MovingImagePage"  />;
}

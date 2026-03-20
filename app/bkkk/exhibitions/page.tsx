import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ExhibitionsPage } from '@/components/bkkk/components/pages/ExhibitionsPage';

export const metadata: Metadata = bkkkMetadata('Exhibitions', 'Current, upcoming, and past exhibitions at Bangkok Kunsthalle.', { path: '/bkkk/exhibitions' });

export default function Page() {
  return <ExhibitionsPage />;
}

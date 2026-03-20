import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ExhibitionsPage } from '@/components/kyaf/components/pages/ExhibitionsPage';

export const metadata: Metadata = kyafMetadata('Exhibitions', 'Current, upcoming, and past exhibitions at Khao Yai Art Forest.', { path: '/kyaf/exhibitions' });

export default function Page() {
  return <ExhibitionsPage />;
}

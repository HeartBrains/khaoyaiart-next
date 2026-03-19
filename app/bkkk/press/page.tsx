import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Press', 'Bangkok Kunsthalle press.', { path: '/bkkk/press' });

export default function Page() {
  return <ClientPage site="bkkk" component="PressPage"  />;
}

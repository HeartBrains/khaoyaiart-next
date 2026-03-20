import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Press', 'Press releases and media resources for Bangkok Kunsthalle.', { path: '/bk/press' });

export default function Page() {
  return <ClientPage site="bkkk" component="PressPage"  />;
}

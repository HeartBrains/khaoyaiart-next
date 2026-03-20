import type { Metadata } from 'next';
import { bkkkMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/bkkk/ClientPage';

export const metadata: Metadata = bkkkMetadata('Shop', 'Publications, editions, and merchandise from Bangkok Kunsthalle.', { path: '/bk/shop' });

export default function Page() {
  return <ClientPage site="bkkk" component="ShopPage"  />;
}

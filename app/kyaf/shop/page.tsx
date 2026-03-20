import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Shop', 'Publications, editions, and merchandise from Khao Yai Art Forest.', { path: '/kyaf/shop' });

export default function Page() {
  return <ClientPage site="kyaf" component="ShopPage"  />;
}

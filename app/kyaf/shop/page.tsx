import type { Metadata } from 'next';
import { kyafMetadata } from '@/lib/seo';
import { ClientPage } from '@/components/kyaf/ClientPage';

export const metadata: Metadata = kyafMetadata('Shop', 'Khao Yai Art Forest shop.', { path: '/kyaf/shop' });

export default function Page() {
  return <ClientPage site="kyaf" component="ShopPage"  />;
}

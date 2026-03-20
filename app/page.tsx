'use client';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/landing/components/pages/LandingPage';

export default function Page() {
  const router = useRouter();
  return (
    <LandingPage
      onEnterBkkk={() => router.push('/bk')}
      onEnterKyaf={() => router.push('/kyaf')}
    />
  );
}

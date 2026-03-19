'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from '@/components/kyaf/components/layout/Header';
import { Footer } from '@/components/kyaf/components/layout/Footer';
import { MenuOverlay } from '@/components/kyaf/components/layout/MenuOverlay';
import { BackToTop } from '@/components/kyaf/components/ui/BackToTop';
import { useAppNavigate } from '@/components/kyaf/utils/useAppNavigate';

export default function KyafLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useAppNavigate();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Header
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onLogoClick={() => router.push('/')}
        isTransparent={!scrolled}
      />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={navigate}
        activePage={pathname}
      />
      <main>{children}</main>
      <Footer onNavigate={navigate} />
      <BackToTop />
    </div>
  );
}

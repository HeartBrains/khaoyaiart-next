import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll direction and hide elements when scrolling down on mobile
 * Returns true when user is scrolling down
 */
export function useScrollHide() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if viewport is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!isMobile) return;

      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Scrolling down - hide button
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true);
      } 
      // Scrolling up - show button
      else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;

      // Also show button when scroll stops for 150ms
      scrollTimeout = setTimeout(() => {
        setIsHidden(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isMobile]);

  return { isScrolling: isMobile && isHidden };
}
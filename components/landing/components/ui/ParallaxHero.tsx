'use client';
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./utils";
import { useState, useEffect } from "react";

interface ParallaxHeroProps {
  image?: string; // Single image (backward compatibility)
  images?: string[]; // Multiple images for slideshow
  className?: string;
  height?: string; // e.g. "h-[80vh]"
  children?: React.ReactNode;
  overlay?: boolean; // Add a dark overlay?
  interval?: number; // Slideshow interval in ms (default 5000)
}

export function ParallaxHero({ 
  image,
  images, 
  className, 
  height = "h-[60vh] md:h-[80vh]", 
  children,
  overlay = false,
  interval = 5000
}: ParallaxHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideImages = images || (image ? [image] : []);
  const hasMultipleImages = slideImages.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [hasMultipleImages, slideImages.length, interval]);

  return (
    <div className={cn("relative w-full overflow-hidden bg-gray-100", height, className)}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slideImages[currentIndex]})` }}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </AnimatePresence>
      
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}

      {children && (
        <div className="relative z-10 h-full w-full pointer-events-none">
            <div className="pointer-events-auto h-full">
                {children}
            </div>
        </div>
      )}
    </div>
  );
}
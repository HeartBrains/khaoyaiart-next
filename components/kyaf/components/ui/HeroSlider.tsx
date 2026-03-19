'use client';
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "./utils";

interface HeroSliderProps {
  images: string[];
  className?: string;
  height?: string;
  children?: React.ReactNode;
}

export function HeroSlider({ 
  images, 
  className, 
  height = "h-[60vh] md:h-[80vh]", 
  children 
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const nextIndex = (currentIndex + 1) % images.length;
      const img = new Image();
      img.src = images[nextIndex];
    }
  }, [currentIndex, images]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds for slow transition
    
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={cn("relative w-full overflow-hidden bg-gray-900", height, className)}>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }} // Slow crossfade
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        <div className="pointer-events-auto h-full">
            {children}
        </div>
      </div>
    </div>
  );
}

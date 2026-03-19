'use client';
import { motion } from "motion/react";
import { cn } from "./utils";

interface ParallaxHeroProps {
  image: string;
  className?: string;
  height?: string; // e.g. "h-[80vh]"
  children?: React.ReactNode;
  overlay?: boolean; // Add a dark overlay?
}

export function ParallaxHero({ 
  image, 
  className, 
  height = "h-[60vh] md:h-[80vh]", 
  children,
  overlay = false
}: ParallaxHeroProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-gray-100", height, className)}>
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}

      {children && (
        <div className="relative z-10 h-full w-full pointer-events-none">
            {/* Enable pointer events for children if needed, but usually hero text is overlay */}
            <div className="pointer-events-auto h-full">
                {children}
            </div>
        </div>
      )}
    </div>
  );
}
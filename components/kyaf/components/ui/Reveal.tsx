'use client';
import { motion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  width?: "fit-content" | "100%";
}

export function Reveal({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  yOffset = 20,
  width = "100%"
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}

'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { VISIT_HERO_IMAGE } from '@/utils/imageConstants';
import { Reveal } from '../ui/Reveal';
import { motion } from 'motion/react';
import { useLanguage } from '@/utils/languageContext';
import { getTranslation } from '@/utils/translations';

export function KhaoYaiPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { language } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white min-h-screen pb-12"
    >
      {/* Hero Section */}
      <div className="h-screen w-full relative overflow-hidden group">
        <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
        >
            <ImageWithFallback 
              src={VISIT_HERO_IMAGE} 
              alt={getTranslation(language, 'khaoyai.title')}
              className="absolute inset-0 w-full h-full object-cover"
            />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center justify-center">
            <Reveal>
                <div className="flex flex-col items-center gap-4 md:gap-8">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-sans text-white text-center leading-tight">
                        Khao Yai<br />Art Forest
                    </h1>
                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-sans text-white text-center leading-[1.82em]">
                        เขาใหญ่<br />อาร์ต ฟอเรสต์
                    </h2>
                </div>
            </Reveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-12 md:py-20 space-y-4">
        <Reveal>
            <div className="text-center py-20">
                <p className="text-xl text-gray-500 font-sans">
                    Coming Soon / <span className="font-sans leading-[1.82em]">เร็วๆ นี้</span>
                </p>
            </div>
        </Reveal>
      </div>
    </motion.div>
  );
}
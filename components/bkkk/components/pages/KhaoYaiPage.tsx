'use client';
import { ASSETS } from '@/utils/assets';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { motion } from 'motion/react';
import { useLanguage } from '@/utils/languageContext';
import { getTranslation } from '@/utils/translations';
const khaoYaiHero = '/assets/9dae9d1894230d3eec6cdcd7ad979b5b951fc060.png';

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
              src={khaoYaiHero} 
              alt={getTranslation(language, 'khaoyai.title')}
              className="absolute inset-0 w-full h-full object-cover"
            />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex items-center justify-center">
            <Reveal>
                <h1 className={`text-4xl md:text-6xl lg:text-8xl font-sans text-white text-center ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? (
                        <>เขาใหญ่<br />อาร์ต ฟอเรสต์</>
                    ) : (
                        <>Khao Yai<br />Art Forest</>
                    )}
                </h1>
            </Reveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-12 md:py-20 space-y-4">
        <Reveal>
            <div className="text-center py-20">
                <p className={`text-xl text-gray-500 font-sans ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{getTranslation(language, 'khaoyai.comingSoon')}</p>
            </div>
        </Reveal>
      </div>
    </motion.div>
  );
}
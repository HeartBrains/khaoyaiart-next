// @ts-nocheck
'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { HeroSlider } from '../ui/HeroSlider';
import { useLanguage } from '@/utils/languageContext';
import { VISIT_HERO_IMAGE, ABOUT_HERO_IMAGE } from '@/utils/imageConstants';

interface LandingPageProps {
  onEnter: (destination: 'bangkok' | 'khaoyai') => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const { language, t } = useLanguage();

  const bangkokTitle = language === 'th' ? 'บางกอก\nคุนสต์ฮัลเลอ' : 'Bangkok\nKunsthalle';
  const khaoYaiTitle = language === 'th' ? 'Khao Yai\nArt Forest' : 'Khao Yai\nArt Forest';

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex font-sans">
      
      {/* Background Images (Full Screen) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${hovered === 'bangkok' ? 'opacity-100' : 'opacity-0'}`}
      >
        <ImageWithFallback 
            src={ABOUT_HERO_IMAGE} 
            alt="Khao Yai Art Forest"
            className="w-full h-full object-cover" 
        />
      </div>

      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none z-0 ${hovered === 'khaoyai' ? 'opacity-100' : 'opacity-0'}`}
      >
        <ImageWithFallback 
            src={VISIT_HERO_IMAGE} 
            alt="Khao Yai Art Forest" 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Left Trigger Zone - Bangkok Kunsthalle */}
      <div 
        className="w-1/2 h-full z-10 flex items-center justify-start cursor-pointer relative border-r border-transparent/10 pl-8 md:pl-16 lg:pl-24"
        onClick={() => onEnter('bangkok')}
        onMouseEnter={() => setHovered('bangkok')}
        onMouseLeave={() => setHovered(null)}
      >
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white text-left select-none transition-all duration-700 whitespace-pre-line ${hovered === 'khaoyai' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {bangkokTitle}
        </h1>
      </div>

      {/* Right Trigger Zone - Khao Yai Art Forest */}
      <div 
        className="w-1/2 h-full z-10 flex items-center justify-end cursor-pointer relative pr-8 md:pr-16 lg:pr-24"
        onClick={() => onEnter('khaoyai')}
        onMouseEnter={() => setHovered('khaoyai')}
        onMouseLeave={() => setHovered(null)}
      >
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white text-right select-none transition-all duration-700 whitespace-pre-line ${hovered === 'bangkok' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {khaoYaiTitle}
        </h1>
      </div>

    </div>
  );
}
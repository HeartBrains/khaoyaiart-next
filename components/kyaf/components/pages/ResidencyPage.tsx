'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/utils/languageContext';
import { getTranslation } from '@/utils/translations';
import { IMG_FOG_SRC, IMG_PULSUS_SRC } from '@/utils/imageConstants';
import type { ResidencyArtistItem } from '@/lib/wp-mappers';
import { useAppNavigate } from '@/components/kyaf/utils/useAppNavigate';
import { useKyafResidencyArtists } from '@/lib/useWPData';

interface ResidencyPageProps {
  onNavigate?: (page: string, slug?: string) => void;
  activeSection?: string;
}

export function ResidencyPage({ onNavigate: onNavigateProp, activeSection }: ResidencyPageProps) {
  const internalNavigate = useAppNavigate();
  const onNavigate = onNavigateProp ?? internalNavigate;
  const { language } = useLanguage();
  const { data: ARTISTS_DATA } = useKyafResidencyArtists();
  const [activeCategory, setActiveCategory] = useState<'current' | 'upcoming' | 'past'>(
    (activeSection === 'previous' ? 'past' : activeSection as 'current' | 'upcoming' | 'past') || 'current'
  );

  // Update activeCategory when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      // Map 'previous' to 'past' for compatibility
      setActiveCategory(activeSection === 'previous' ? 'past' : activeSection as 'current' | 'upcoming' | 'past');
    }
  }, [activeSection]);

  const filteredArtists = ARTISTS_DATA.filter(artist => artist.status === activeCategory);

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans">
      {/* Hero Section */}
      <ParallaxHero 
        image={IMG_FOG_SRC} 
        height="h-[80vh]"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center z-20">

        </div>
      </ParallaxHero>

      {/* Content */}
      <div className="w-full px-[6vw] pt-[96px] pb-[0px]">
        <section className="flex flex-col md:flex-row mb-32 md:mb-40">
            {/* Left Column */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <div className="sticky top-32 flex flex-col items-start gap-4">
                    <Reveal>
                        <button 
                            onClick={() => setActiveCategory('current')}
                            className={`text-xl md:text-2xl font-normal leading-tight transition-colors duration-300 block text-left cursor-pointer ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeCategory === 'current' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {getTranslation(language, 'residency.currentArtists')}
                        </button>
                        <button 
                            onClick={() => setActiveCategory('upcoming')}
                            className={`text-xl md:text-2xl font-normal leading-tight transition-colors duration-300 mt-8 cursor-pointer ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeCategory === 'upcoming' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {getTranslation(language, 'residency.upcomingArtists')}
                        </button>
                        <button 
                            onClick={() => setActiveCategory('past')}
                            className={`text-xl md:text-2xl font-normal leading-tight transition-colors duration-300 mt-8 cursor-pointer ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeCategory === 'past' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {getTranslation(language, 'residency.pastArtists')}
                        </button>
                    </Reveal>
                </div>
            </div>
            
            {/* Right Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
                {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist, index) => (
                        <Reveal key={artist.id} delay={index * 0.1}>
                            <div 
                                className="flex flex-col gap-6 w-full cursor-pointer group"
                                onClick={() => onNavigate?.('artist-detail', artist.slug)} 
                            >
                                <div className="aspect-[3/4] w-full bg-gray-100 relative overflow-hidden">
                                    <ImageWithFallback 
                                        src={artist.status === 'current' ? IMG_PULSUS_SRC : artist.featuredImage}
                                        alt={language === 'th' ? artist.nameTH : artist.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className={`text-lg md:text-xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? artist.nameTH : artist.name}</h3>
                                    <p className={`text-lg md:text-xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? artist.periodTH : artist.period}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))
                ) : (
                     <Reveal>
                        <p className="text-lg md:text-xl text-gray-400">{getTranslation(language, 'common.noResults')}</p>
                     </Reveal>
                )}
            </div>
        </section>
      </div>
    </div>
  );
}
// @ts-nocheck
'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/utils/languageContext';
import { exhibitions, type Exhibition } from '@/utils/exhibitionsDataNew';
import { EXHIBITIONS_HERO_IMAGE } from '@/utils/imageConstants';

interface ExhibitionsPageProps {
    onNavigate?: (page: string, slug?: string) => void;
    activeSection?: string;
}

type Category = 'current' | 'upcoming' | 'past';

export function ExhibitionsPage({ onNavigate, activeSection }: ExhibitionsPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    (activeSection as Category) || 'current'
  );
  const { language } = useLanguage();

  // Update activeCategory when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      setActiveCategory(activeSection as Category);
    }
  }, [activeSection]);

  // Filter by status directly from new data structure
  const filteredExhibitions = exhibitions.filter(ex => ex.status === activeCategory);

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Hero Section - Using Madrid Circle image from JSON */}
      <ParallaxHero 
        image={EXHIBITIONS_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      {/* Content Container */}
      <div className="w-full px-[6vw] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row mb-32 md:mb-40">
            
            {/* Left Sidebar - Navigation */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <div className="sticky top-32 flex flex-col items-start gap-4">
                    <button 
                        onClick={() => setActiveCategory('current')}
                        className={`text-xl md:text-2xl font-normal text-left transition-colors duration-300 flex flex-col items-start cursor-pointer ${
                            activeCategory === 'current' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions'}</span>
                    </button>
                    <button 
                        onClick={() => setActiveCategory('upcoming')}
                        className={`text-xl md:text-2xl font-normal text-left transition-colors duration-300 flex flex-col items-start cursor-pointer ${
                            activeCategory === 'upcoming' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'นิทรรศการที่กำลังจะเกิดขึ้น' : 'Upcoming Exhibitions'}</span>
                    </button>
                    <button 
                        onClick={() => setActiveCategory('past')}
                        className={`text-xl md:text-2xl font-normal text-left transition-colors duration-300 flex flex-col items-start cursor-pointer ${
                            activeCategory === 'past' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'นิทรรศการที่ผ่านมา' : 'Past Exhibitions'}</span>
                    </button>
                </div>
            </div>

            {/* Right Content - Exhibition List */}
            <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
                {filteredExhibitions.length > 0 ? (
                    filteredExhibitions.map((exhibition, index) => (
                        <Reveal key={exhibition.id} delay={index * 0.1}>
                            <div 
                                className="flex flex-col gap-6 w-full cursor-pointer group"
                                onClick={() => onNavigate && onNavigate('exhibition-detail', exhibition.slug)}
                            >
                                {/* Image */}
                                <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                                    <ImageWithFallback 
                                        src={exhibition.featuredImage?.sourceUrl}
                                        alt={language === 'th' ? exhibition.title.th : exhibition.title.en}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex flex-col gap-6">
                                    {/* English */}
                                    {language !== 'th' && (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-1">
                                              <h3 className="text-lg md:text-xl font-normal leading-tight font-sans text-black">{exhibition.title.en}</h3>
                                              {exhibition.artist && (
                                                  <p className="text-lg md:text-xl font-normal text-black leading-tight font-sans">{exhibition.artist.en}</p>
                                              )}
                                            </div>
                                            
                                            {exhibition.listingSummary && (
                                                <p className="text-lg md:text-xl font-normal text-gray-600 leading-tight font-sans line-clamp-3">
                                                  {exhibition.listingSummary.en}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Thai */}
                                    {language === 'th' && (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-1">
                                              <h3 className="text-lg md:text-xl font-normal font-sans text-black leading-[1.82em]">{exhibition.title.th}</h3>
                                              {exhibition.artist && (
                                                  <p className="text-lg md:text-xl font-normal text-black font-sans leading-[1.82em]">{exhibition.artist.th}</p>
                                              )}
                                            </div>
                                            
                                            {exhibition.listingSummary && (
                                                <p className="text-lg md:text-xl font-normal text-gray-600 font-sans line-clamp-3 leading-[1.82em]">
                                                  {exhibition.listingSummary.th}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))
                ) : (
                    <div className="py-20 text-gray-400 font-sans text-xl">
                        {language === 'th' ? 'ไม่พบข้อมูล' : 'No results found'}
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}
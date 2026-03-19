// @ts-nocheck
'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/utils/languageContext';
import { useKyafActivities } from '@/lib/useWPData';
import { ACTIVITY_HERO_IMAGE } from '@/utils/imageConstants';

interface ActivitiesPageProps {
    onNavigate?: (page: string, slug?: string) => void;
    activeSection?: string;
}

type Category = 'current' | 'upcoming' | 'past';

export function ActivitiesPage({ onNavigate, activeSection }: ActivitiesPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    (activeSection as Category) || 'current'
  );
  const { language } = useLanguage();
  const { data: activities } = useKyafActivities();

  // Update activeCategory when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      setActiveCategory(activeSection as Category);
    }
  }, [activeSection]);

  // Filter by status directly from new data structure
  const filteredActivities = activities.filter(act => act.status === activeCategory);

  return (
    <div className="w-full bg-white pb-24 min-h-screen font-sans text-black">
      {/* Hero - Using K-BAR image from JSON */}
      <ParallaxHero 
        image={ACTIVITY_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      {/* Main Content */}
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
                        <span>{language === 'th' ? 'กิจกรรมปัจจุบัน' : 'Current Activities'}</span>
                    </button>
                    <button 
                        onClick={() => setActiveCategory('upcoming')}
                        className={`text-xl md:text-2xl font-normal text-left transition-colors duration-300 flex flex-col items-start cursor-pointer ${
                            activeCategory === 'upcoming' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'กิจกรรมที่กำลังจะเกิดขึ้น' : 'Upcoming Activities'}</span>
                    </button>
                    <button 
                        onClick={() => setActiveCategory('past')}
                        className={`text-xl md:text-2xl font-normal text-left transition-colors duration-300 flex flex-col items-start cursor-pointer ${
                            activeCategory === 'past' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'กิจกรรมที่ผ่านมา' : 'Past Activities'}</span>
                    </button>
                </div>
            </div>

            {/* Right Content - Activities List */}
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity, idx) => (
                        <div 
                            key={activity.id}
                            className="flex flex-col gap-6 w-full cursor-pointer group"
                            onClick={() => onNavigate && onNavigate('activity-detail', activity.slug)}
                        >
                            <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                                <ImageWithFallback 
                                    src={activity.featuredImage?.sourceUrl} 
                                    alt={language === 'th' ? activity.title.th : activity.title.en}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                {/* English */}
                                {language !== 'th' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-lg md:text-xl font-normal text-black leading-tight whitespace-pre-wrap">
                                                {activity.title.en}
                                            </h3>
                                             {activity.typeLabel && (
                                                <p className="text-lg md:text-xl font-normal text-gray-500 leading-tight">
                                                    {activity.typeLabel.en}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Thai */}
                                {language === 'th' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-lg md:text-xl font-normal text-black leading-[1.82em] font-sans whitespace-pre-wrap">
                                                {activity.title.th}
                                            </h3>
                                             {activity.typeLabel && (
                                                <p className="text-lg md:text-xl font-normal text-gray-500 leading-[1.82em] font-sans">
                                                    {activity.typeLabel.th}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
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
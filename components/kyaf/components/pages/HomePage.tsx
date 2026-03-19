// @ts-nocheck
'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { HeroSlider } from '../ui/HeroSlider';
import { useLanguage } from '@/utils/languageContext';
import { useKyafExhibitions, useKyafActivities } from '@/lib/useWPData';
import { HOME_HERO_IMAGES } from '@/utils/imageConstants';
import { isHomeSectionVisible } from '@/utils/siteConfig';

export function HomePage({ onNavigate }: { onNavigate?: (page: string, slug?: string) => void }) {
  const { language } = useLanguage();

  const { data: allExhibitions } = useKyafExhibitions();
  const { data: allActivities }  = useKyafActivities();

  const currentExhibitions = allExhibitions.filter(ex => ex.status === 'current');
  const currentActivities  = allActivities.filter(act => act.status === 'current');

  // Check visibility settings
  const showCurrentExhibitions = isHomeSectionVisible('currentExhibitions');
  const showCurrentActivities = isHomeSectionVisible('currentActivities');

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Section - Using all 6 images from CSV */}
      <HeroSlider 
        images={HOME_HERO_IMAGES} 
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </HeroSlider>

      <div className="w-full px-[6vw] pt-[96px] pb-[0px]">
        
        {/* Current Exhibitions */}
        {showCurrentExhibitions && currentExhibitions.length > 0 && (
          <section className="flex flex-col md:flex-row mb-32 md:mb-40">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
               <h2 className="text-xl md:text-2xl font-normal sticky top-32">
                  {language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions'}
               </h2>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
               {currentExhibitions.map((exhibition) => (
                  <div key={exhibition.id} className="flex flex-col gap-6 w-full cursor-pointer group" onClick={() => onNavigate?.('exhibition-detail', exhibition.slug)}>
                      {exhibition.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                            <ImageWithFallback
                                src={exhibition.featuredImage}
                                alt={exhibition.title[language] || exhibition.title.en}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                          <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{exhibition.title[language] || exhibition.title.en}</h3>
                          <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{exhibition.artist[language] || exhibition.artist.en}</p>
                          {exhibition.listingSummary && (
                              <p className={`text-xl md:text-2xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                  {exhibition.listingSummary[language] || exhibition.listingSummary.en}
                              </p>
                          )}
                      </div>
                  </div>
               ))}
            </div>
          </section>
        )}

        {/* Current Activities */}
        {showCurrentActivities && currentActivities.length > 0 && (
            <section className="flex flex-col md:flex-row mb-32 md:mb-40">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className="text-xl md:text-2xl font-normal sticky top-32">
                    {language === 'th' ? 'กิจกรรมปัจจุบัน' : 'Current Activities'}
                </h2>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {currentActivities.map((activity) => (
                    <div key={activity.id} className="flex flex-col gap-6 w-full cursor-pointer group" onClick={() => onNavigate?.('activity-detail', activity.slug)}>
                        {activity.featuredImage && (
                          <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                              <ImageWithFallback
                                  src={activity.featuredImage}
                                  alt={activity.title[language] || activity.title.en}
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{activity.title[language] || activity.title.en}</h3>
                            {activity.listingSummary && (
                                <p className={`text-xl md:text-2xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                    {activity.listingSummary[language] || activity.listingSummary.en}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            </section>
        )}

      </div>
    </div>
  );
}
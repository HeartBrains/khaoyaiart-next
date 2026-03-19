'use client';
import { useLanguage } from '@/utils/languageContext';
import { useBkkkExhibitions, useBkkkActivities, useMovingImages } from '@/lib/useWPData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { HeroSlider } from '../ui/HeroSlider';
import { useState, useEffect, useMemo } from 'react';
import { getEmptyStateMessage, siteConfig } from '@/utils/siteConfig';

// Hero images from different pages
const heroImages = [
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_cover-for-about.jpg", // Visit
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-Exhibitions-list-83b680a4.jpg", // Exhibitions
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-4.+Moving+Image+Program-4.1+Infringes--Infringes+-Andrea+Rossetti+1+COVER.jpg", // Moving Image Program
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/1000012646.jpg", // Residency
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-history-34e22018.jpg", // About
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-team-f51a7633.jpg", // Team
  "https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-contact-1-89b6eddb.jpg" // Contact
];

export function HomePage({ onNavigate }: { onNavigate?: (page: string, slug?: string) => void }) {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('current-exhibitions');

  const { data: allExhibitions } = useBkkkExhibitions();
  const { data: allActivities }  = useBkkkActivities();
  const { data: allMovingImages } = useMovingImages();

  const currentExhibitions  = allExhibitions.filter(e => e.status === 'current');
  const upcomingExhibitions = allExhibitions.filter(e => e.status === 'upcoming');
  const currentActivities   = allActivities.filter(a => a.status === 'current');
  const currentMovingImageProgram = allMovingImages.find(m => m.status === 'current') ?? null;

  const sections = useMemo(() => [
    { id: 'current-exhibitions',   label: language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions',          visible: siteConfig.homeAnchors.currentExhibitions && currentExhibitions.length > 0 },
    { id: 'upcoming-exhibitions',  label: language === 'th' ? 'นิทรรศการที่กำลังจะเริ่ม' : 'Upcoming Exhibitions',   visible: siteConfig.homeAnchors.upcomingExhibitions && upcomingExhibitions.length > 0 },
    { id: 'moving-image-program',  label: language === 'th' ? 'โปรแกรมภาพเคลื่อนไหวปัจจุบัน' : 'Current Moving Image Program', visible: siteConfig.homeAnchors.currentMovingImageProgram && currentMovingImageProgram !== null },
    { id: 'current-activities',    label: language === 'th' ? 'กิจกรรมปัจจุบัน' : 'Current Activities',              visible: siteConfig.homeAnchors.currentActivities && currentActivities.length > 0 },
  ].filter(s => s.visible), [language, currentExhibitions, upcomingExhibitions, currentMovingImageProgram, currentActivities]);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust for header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Section */}
      <HeroSlider 
        images={heroImages} 
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </HeroSlider>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Sticky Anchor Menu */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    onNavigate?.('home');
                    setActiveSection(section.id);
                    setTimeout(() => scrollToSection(section.id), 100);
                  }}
                  className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-black'
                      : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Sections */}
          <div className="w-full md:w-1/2 flex flex-col md:items-end">
            {/* Current Exhibitions */}
            {siteConfig.homeAnchors.currentExhibitions && (
              <section id="current-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                  {currentExhibitions.length > 0 ? currentExhibitions.map((item) => (
                    <div key={item.id} className="flex flex-col gap-6 w-full cursor-pointer group" onClick={() => onNavigate?.('exhibition-detail', item.slug)}>
                      {item.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                          <ImageWithFallback src={item.featuredImage} alt={item.title[language] || item.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.title[language] || item.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.artist[language] || item.artist.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.dateDisplay[language] || item.dateDisplay.en}</p>
                      </div>
                    </div>
                  )) : (
                    <p className={`text-xl md:text-2xl font-normal text-gray-400 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{getEmptyStateMessage('noCurrentExhibitions', language)}</p>
                  )}
                </div>
              </section>
            )}

            {/* Upcoming Exhibitions */}
            {siteConfig.homeAnchors.upcomingExhibitions && (
              <section id="upcoming-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:items-end">
                  {upcomingExhibitions.length > 0 ? upcomingExhibitions.map((item) => (
                    <div key={item.id} className="flex flex-col gap-6 w-full cursor-pointer group" onClick={() => onNavigate?.('exhibition-detail', item.slug)}>
                      {item.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                          <ImageWithFallback src={item.featuredImage} alt={item.title[language] || item.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.title[language] || item.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.artist[language] || item.artist.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.dateDisplay[language] || item.dateDisplay.en}</p>
                      </div>
                    </div>
                  )) : (
                    <p className={`text-xl md:text-2xl font-normal text-gray-400 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{getEmptyStateMessage('noUpcomingExhibitions', language)}</p>
                  )}
                </div>
              </section>
            )}

            {/* Moving Image Program */}
            {siteConfig.homeAnchors.currentMovingImageProgram && (
              <section id="moving-image-program" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:items-end">
                  {currentMovingImageProgram ? (
                    <div className="flex flex-col gap-6 w-full cursor-pointer group" onClick={() => onNavigate?.('moving-image-detail', currentMovingImageProgram.slug)}>
                      {currentMovingImageProgram.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                          <ImageWithFallback src={currentMovingImageProgram.featuredImage} alt={currentMovingImageProgram.title[language] || currentMovingImageProgram.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{currentMovingImageProgram.title[language] || currentMovingImageProgram.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{currentMovingImageProgram.curator?.[language] || currentMovingImageProgram.curator?.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{currentMovingImageProgram.dateDisplay?.[language] || currentMovingImageProgram.dateDisplay?.en}</p>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-xl md:text-2xl font-normal text-gray-400 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{getEmptyStateMessage('noCurrentMovingImage', language)}</p>
                  )}
                </div>
              </section>
            )}

            {/* Current Activities */}
            {siteConfig.homeAnchors.currentActivities && (
              <section id="current-activities" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:items-end">
                  {currentActivities.length > 0 ? currentActivities.map((item) => (
                    <div key={item.id} className="flex flex-col gap-6 w-full cursor-pointer group" onClick={() => onNavigate?.('activity-detail', item.slug)}>
                      {item.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                          <ImageWithFallback src={item.featuredImage} alt={item.title[language] || item.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.title[language] || item.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.artist?.[language] || item.artist?.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.dateDisplay?.[language] || item.dateDisplay?.en}</p>
                      </div>
                    </div>
                  )) : (
                    <p className={`text-xl md:text-2xl font-normal text-gray-400 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{getEmptyStateMessage('noCurrentActivities', language)}</p>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
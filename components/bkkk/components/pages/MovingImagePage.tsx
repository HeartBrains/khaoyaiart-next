'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '@/utils/languageContext';
import { useState, useEffect, useMemo } from 'react';
import type { MovingImageItem } from '@/lib/wp-mappers';
import { getEmptyStateMessage } from '@/utils/siteConfig';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';
const movingImageHero = '/assets/429c8ad61cdb4d502462d129e377fe4faf35abf2.png';

interface MovingImagePageProps {
  initialData?: MovingImageItem[];
  onNavigate?: (page: string, slug?: string) => void;
  targetSectionId?: string;
}

export function MovingImagePage({ onNavigate: onNavigateProp, targetSectionId, initialData = [] }: MovingImagePageProps) {
  const internalNavigate = useAppNavigate();
  const onNavigate = onNavigateProp ?? internalNavigate;
  const { language } = useLanguage();
  const [movingImageRecords, setMovingImageRecords] = useState(initialData);
  useEffect(() => { setMovingImageRecords(initialData); }, [initialData]);
  const [activeSection, setActiveSection] = useState('current-programs');

  const upcomingPrograms = movingImageRecords.filter(r => r.status === 'upcoming');
  const currentPrograms  = movingImageRecords.filter(r => r.status === 'current');
  const pastPrograms     = movingImageRecords.filter(r => r.status === 'past');

  // Anchor sections - memoized to prevent recreation on every render
  const sections = useMemo(() => {
    return [
      { id: 'upcoming-programs', label: language === 'th' ? 'โปรแกรมภาพเคลื่อนไหวที่กำลังจะมาถึง' : 'Upcoming Moving Image Program' },
      { id: 'current-programs', label: language === 'th' ? 'โปรแกรมภาพเคลื่อนไหวปัจจุบัน' : 'Current Moving Image Program' },
      { id: 'past-programs', label: language === 'th' ? 'โปรแกรมภาพเคลื่อนไหวที่ผ่านมา' : 'Past Moving Image Program' }
    ].filter(section => {
      // Only show sections that have content
      if (section.id === 'upcoming-programs') return upcomingPrograms.length > 0;
      if (section.id === 'current-programs') return currentPrograms.length > 0;
      if (section.id === 'past-programs') return pastPrograms.length > 0;
      return true;
    });
  }, [language, upcomingPrograms.length, currentPrograms.length, pastPrograms.length]);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
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

  // Scroll to target section if provided
  useEffect(() => {
    if (targetSectionId) {
      scrollToSection(targetSectionId);
    }
  }, [targetSectionId]);

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Section with Slider */}
      {movingImageHero ? (
        <div className="relative w-full h-[80vh] min-h-[35vh] overflow-hidden z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movingImageHero})` }} />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
        </div>
      ) : (
        <div className="relative w-full h-[80vh] min-h-[35vh] bg-gray-100" />
      )}

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Left Column - Title & Anchor Menu */}
          <aside className="w-full md:w-1/2 shrink-0">
            <div className="md:sticky md:top-32">
              {/* Anchor Navigation */}
              <nav className="flex flex-col gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left text-xl md:text-2xl font-normal transition-colors duration-300 ${
                      activeSection === section.id 
                        ? 'text-black' 
                        : 'text-gray-400 hover:text-gray-600'
                    } ${language === 'th' ? 'leading-[1.82em]' : ''}`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Column - Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Upcoming Programs */}
            <section id="upcoming-programs" className="mb-32 md:mb-40 scroll-mt-32">
              <div className="flex flex-col gap-12 md:gap-16">
                {upcomingPrograms.length > 0 ? (
                  upcomingPrograms.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col gap-6 w-full cursor-pointer group"
                      onClick={() => onNavigate?.('moving-image-detail', record.slug)}
                    >
                      {record.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-200 overflow-hidden relative transition-colors duration-300 group-hover:bg-gray-300">
                          <ImageWithFallback src={record.featuredImage} alt={record.title[language] || record.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.title[language] || record.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.curator?.[language] || record.curator?.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.dateDisplay?.[language] || record.dateDisplay?.en}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-gray-400 font-sans text-xl md:text-2xl text-left w-full">
                    {getEmptyStateMessage('noUpcomingMovingImage', language)}
                  </div>
                )}
              </div>
            </section>

            {/* Current Programs */}
            <section id="current-programs" className="mb-32 md:mb-40 scroll-mt-32">
              <div className="flex flex-col gap-12 md:gap-16">
                {currentPrograms.length > 0 ? (
                  currentPrograms.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col gap-6 w-full cursor-pointer group"
                      onClick={() => onNavigate?.('moving-image-detail', record.slug)}
                    >
                      {record.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-200 overflow-hidden relative transition-colors duration-300 group-hover:bg-gray-300">
                          <ImageWithFallback src={record.featuredImage} alt={record.title[language] || record.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.title[language] || record.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.curator?.[language] || record.curator?.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.dateDisplay?.[language] || record.dateDisplay?.en}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-gray-400 font-sans text-xl md:text-2xl text-left w-full">
                    {getEmptyStateMessage('noCurrentMovingImage', language)}
                  </div>
                )}
              </div>
            </section>

            {/* Past Programs */}
            <section id="past-programs" className="mb-32 md:mb-40 scroll-mt-32">
              <div className="flex flex-col gap-12 md:gap-16">
                {pastPrograms.length > 0 ? (
                  pastPrograms.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col gap-6 w-full cursor-pointer group"
                      onClick={() => onNavigate?.('moving-image-detail', record.slug)}
                    >
                      {record.featuredImage && (
                        <div className="aspect-[3/4] w-full bg-gray-200 overflow-hidden relative transition-colors duration-300 group-hover:bg-gray-300">
                          <ImageWithFallback src={record.featuredImage} alt={record.title[language] || record.title.en} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.title[language] || record.title.en}</h3>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.curator?.[language] || record.curator?.en}</p>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.dateDisplay?.[language] || record.dateDisplay?.en}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-gray-400 font-sans text-xl md:text-2xl text-left w-full">
                    {getEmptyStateMessage('noPastMovingImage', language)}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
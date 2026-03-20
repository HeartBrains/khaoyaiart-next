'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import type { ResidencyArtistItem } from '@/lib/wp-mappers';
import { useLanguage } from '@/utils/languageContext';
import { getTranslation } from '@/utils/translations';
import { useState, useEffect } from 'react';
import { getEmptyStateMessage } from '@/utils/siteConfig';
import { useAppNavigate } from '@/components/bkkk/utils/useAppNavigate';

interface ResidencyPageProps {
  initialData?: ResidencyArtistItem[];
  onNavigate?: (page: string, slug?: string) => void;
  targetSectionId?: string;
}

export function ResidencyPage({ onNavigate: onNavigateProp, targetSectionId, initialData = [] }: ResidencyPageProps) {
  const internalNavigate = useAppNavigate();
  const onNavigate = onNavigateProp ?? internalNavigate;
  const { language } = useLanguage();
  const [ARTISTS_DATA, setArtistsData] = useState(initialData);
  useEffect(() => { setArtistsData(initialData); }, [initialData]);
  const [activeSection, setActiveSection] = useState('current-artists');

  // Helper function to extract year and month from period string
  const extractPeriodDate = (period: string): Date => {
    // Extract year (4 digits)
    const yearMatch = period.match(/\b(20\d{2})\b/);
    const year = yearMatch ? parseInt(yearMatch[1]) : 0;
    
    // Extract first month mentioned
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                    'july', 'august', 'september', 'october', 'november', 'december'];
    const periodLower = period.toLowerCase();
    let month = 0;
    
    for (let i = 0; i < months.length; i++) {
      if (periodLower.includes(months[i])) {
        month = i;
        break;
      }
    }
    
    return new Date(year, month);
  };

  const sections = [
    {
      id: 'current-artists',
      title: getTranslation(language, 'residency.currentArtists'),
      items: ARTISTS_DATA
        .filter(artist => artist.status === 'current')
        .sort((a, b) => b.id - a.id)
    },
    {
      id: 'upcoming-residency',
      title: getTranslation(language, 'residency.upcomingResidency'),
      items: ARTISTS_DATA
        .filter(artist => artist.status === 'upcoming')
        .sort((a, b) => b.id - a.id)
    },
    {
      id: 'past-artists',
      title: getTranslation(language, 'residency.pastArtists'),
      items: ARTISTS_DATA
        .filter(artist => artist.status === 'past')
        .sort((a, b) => b.id - a.id)
    }
  ];

  // Filter out empty sections except "Current Artists" which must always show
  const visibleSections = sections.filter(section => 
    section.id === 'current-artists' || section.items.length > 0
  );

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

      for (let i = visibleSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(visibleSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(visibleSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  // Scroll to target section if provided
  useEffect(() => {
    if (targetSectionId) {
      scrollToSection(targetSectionId);
    }
  }, [targetSectionId]);

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Section */}
      <ParallaxHero 
        image="https://irp.cdn-website.com/5516674f/dms3rep/multi/1000012646.jpg"
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      {/* Content */}
      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Sticky Anchor Menu */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              {visibleSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-black font-medium'
                      : 'text-gray-400 hover:text-black font-normal'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Sections */}
          <div className="w-full md:w-1/2 flex flex-col">
            {visibleSections.map((section, idx) => (
              <section key={idx} id={section.id} className="mb-32 md:mb-40 scroll-mt-32">
                {/* Artists */}
                <div className="flex flex-col gap-12 md:gap-16">
                  {section.items.length > 0 ? (
                    section.items.map((artist, index) => (
                      <Reveal key={artist.id} delay={index * 0.1}>
                        <div 
                          className="flex flex-col gap-6 w-full cursor-pointer group"
                          onClick={() => onNavigate?.('artist-detail', artist.slug)} 
                        >
                          <div className="aspect-[3/4] w-full bg-gray-100 relative overflow-hidden">
                            <ImageWithFallback 
                              src={artist.featuredImage}
                              alt={language === 'th' ? artist.nameTH : artist.name}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? artist.nameTH : artist.name}</h3>
                            <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? artist.periodTH : artist.period}</p>
                          </div>
                        </div>
                      </Reveal>
                    ))
                  ) : (
                    <p className={`text-xl md:text-2xl font-normal text-gray-400 text-left w-full ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {getEmptyStateMessage('noCurrentResidency', language)}
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { ParallaxHero } from '../ui/ParallaxHero';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '@/utils/languageContext';
import { getTranslation } from '@/utils/translations';
import { getEmptyStateMessage, siteConfig } from '@/utils/siteConfig';
import { useAppNavigate } from '@/components/kyaf/utils/useAppNavigate';
import { useKyafResidencyArtists } from '@/lib/useWPData';
import { IMG_FOG_SRC } from '@/utils/imageConstants';

interface ResidencyPageProps {
  onNavigate?: (page: string, slug?: string) => void;
  targetSectionId?: string;
}

export function ResidencyPage({ onNavigate: onNavigateProp, targetSectionId }: ResidencyPageProps) {
  const internalNavigate = useAppNavigate();
  const onNavigate = onNavigateProp ?? internalNavigate;
  const { language } = useLanguage();
  const { data: ARTISTS_DATA } = useKyafResidencyArtists();

  const firstSectionId = siteConfig.visibility.residency.upcoming
    ? 'upcoming-residency'
    : siteConfig.visibility.residency.current
    ? 'current-artists'
    : 'past-artists';
  const [activeSection, setActiveSection] = useState(firstSectionId);

  const upcomingArtists = ARTISTS_DATA
    .filter(a => a.status === 'upcoming')
    .sort((a, b) => b.id - a.id);

  const currentArtists = ARTISTS_DATA
    .filter(a => a.status === 'current')
    .sort((a, b) => b.id - a.id);

  const pastArtists = ARTISTS_DATA
    .filter(a => a.status === 'past')
    .sort((a, b) => b.id - a.id);

  const sections = [
    ...(siteConfig.visibility.residency.upcoming ? [{
      id: 'upcoming-residency',
      label: getTranslation(language, 'residency.upcomingResidency'),
    }] : []),
    ...(siteConfig.visibility.residency.current ? [{
      id: 'current-artists',
      label: getTranslation(language, 'residency.currentArtists'),
    }] : []),
    ...(siteConfig.visibility.residency.past ? [{
      id: 'past-artists',
      label: getTranslation(language, 'residency.pastArtists'),
    }] : []),
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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
  }, []);

  useEffect(() => {
    if (targetSectionId) {
      setTimeout(() => scrollToSection(targetSectionId), 100);
    }
  }, [targetSectionId]);

  const ArtistCard = ({ artist, index, prefix }: { artist: (typeof ARTISTS_DATA)[number]; index: number; prefix: string }) => {
    const [imgError, setImgError] = useState(false);
    const imageUrl = artist.featuredImage || '';

    return (
      <div
        key={`${prefix}-${index}-${artist.slug}`}
        className="flex flex-col gap-6 w-full cursor-pointer group"
        onClick={() => onNavigate?.('artist-detail', artist.slug)}
      >
        {imageUrl && !imgError && (
          <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
            <ImageWithFallback
              src={imageUrl}
              alt={language === 'th' ? artist.nameTH : artist.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
              crossOrigin="anonymous"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h3 className={`text-xl md:text-2xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
            {language === 'th' ? artist.nameTH : artist.name}
          </h3>
          <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
            {language === 'th' ? artist.periodTH : artist.period}
          </p>
        </div>
      </div>
    );
  };

  const EmptyState = ({ message, className = '' }: { message: string; className?: string }) => (
    <div className={`py-20 text-gray-400 font-sans text-xl md:text-2xl ${className}`}>
      {message}
    </div>
  );

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <ParallaxHero image={IMG_FOG_SRC} height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Sticky Navigation Menu */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
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
            {siteConfig.visibility.residency.upcoming && (
              <section id="upcoming-residency" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                  {upcomingArtists.length > 0 ? (
                    upcomingArtists.map((artist, index) => (
                      <ArtistCard key={`upcoming-${artist.id}`} artist={artist} index={index} prefix="upcoming" />
                    ))
                  ) : (
                    <EmptyState className="w-full text-left" message={getEmptyStateMessage('noCurrentResidency', language)} />
                  )}
                </div>
              </section>
            )}

            {siteConfig.visibility.residency.current && (
              <section id="current-artists" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                  {currentArtists.length > 0 ? (
                    currentArtists.map((artist, index) => (
                      <ArtistCard key={`current-${artist.id}`} artist={artist} index={index} prefix="current" />
                    ))
                  ) : (
                    <EmptyState className="w-full text-left" message={getEmptyStateMessage('noCurrentResidency', language)} />
                  )}
                </div>
              </section>
            )}

            {siteConfig.visibility.residency.past && (
              <section id="past-artists" className="mb-32 md:mb-40 scroll-mt-32 w-full">
                <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                  {pastArtists.length > 0 ? (
                    pastArtists.map((artist, index) => (
                      <ArtistCard key={`past-${artist.id}`} artist={artist} index={index} prefix="past" />
                    ))
                  ) : (
                    <EmptyState className="w-full text-left" message={getEmptyStateMessage('noCurrentResidency', language)} />
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

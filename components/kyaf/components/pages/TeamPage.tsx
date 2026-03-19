// @ts-nocheck
'use client';
import { useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';
import { FOUNDER, DIRECTORS, TEAM_BY_CATEGORY, ADVISORY_BOARD_MEMBERS, DONORS } from '@/utils/teamDataBilingual';
import { TEAM_HERO_IMAGE } from '@/utils/imageConstants';

interface TeamPageProps {
    activePage?: 'team' | 'advisory-board';
    onNavigate?: (page: string) => void;
}

export function TeamPage({ activePage }: TeamPageProps) {
  const { language } = useLanguage();

  // Handle auto-scroll to section
  useEffect(() => {
    if (activePage) {
        const el = document.getElementById(activePage);
        if (el) {
            // Small delay to ensure rendering
            setTimeout(() => {
                const offset = 100; // Header height approx
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }, 100);
        }
    }
  }, [activePage]);

  return (
    <div className="relative w-full min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <ParallaxHero 
        image={TEAM_HERO_IMAGE}
        height="h-[60vh] md:h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      <div className="w-full mx-auto px-[6vw] pt-[96px] pb-[0px]">
        
        {/* Founder Section */}
        <section id="founder" className="flex flex-col md:flex-row mb-24 md:mb-32">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? 'ผู้ก่อตั้ง' : 'Founder'}
                </h2>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-8">
                {FOUNDER.image && (
                    <div className="w-full mb-4">
                        <img 
                            src={FOUNDER.image} 
                            alt={FOUNDER.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}
                <div className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
                    <div className="mb-2">{FOUNDER.name}</div>
                    {FOUNDER.bio && (
                        <div className="whitespace-pre-line">
                            {language === 'th' ? FOUNDER.bioTH : FOUNDER.bio}
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Directors Section */}
        <section id="directors" className="flex flex-col md:flex-row mb-24 md:mb-32">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? 'ผู้อำนวยการ' : 'Directors'}
                </h2>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {DIRECTORS.map((director, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        {director.image && (
                            <div className="w-full mb-4">
                                <img 
                                    src={director.image} 
                                    alt={director.name}
                                    className="w-full aspect-[3/4] object-cover object-center"
                                />
                            </div>
                        )}
                        <div className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
                            <div className="mb-2">{director.name}</div>
                            {director.bio && (
                                <div className="whitespace-pre-line">
                                    {language === 'th' ? director.bioTH : director.bio}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Advisory Board Section */}
        <section id="advisory-board" className="flex flex-col md:flex-row mb-24 md:mb-32">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? 'คณะกรรมการที่ปรึกษา' : 'Advisory Board'}
                </h2>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {ADVISORY_BOARD_MEMBERS.map((member, idx) => (
                    <p key={idx} className="text-xl md:text-2xl font-sans text-black font-normal">
                        {member}
                    </p>
                ))}
            </div>
        </section>

        {/* Donors Section */}
        <section id="donors" className="flex flex-col md:flex-row mb-24 md:mb-32">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? 'วงผู้ก่อตั้งและโต๊ะกลมผู้สะสมผู้บริจาค' : 'Founder\'s Circle & Collector\'s Roundtable Donors'}
                </h2>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {DONORS.map((donor, idx) => (
                    <p key={idx} className="text-xl md:text-2xl font-sans text-black font-normal">
                        {donor}
                    </p>
                ))}
            </div>
        </section>

        {/* Team Section */}
        <section id="team" className="flex flex-col md:flex-row mb-12">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? 'ทีมงาน' : 'Team'}
                </h2>
            </div>

            {/* Right Column - Content with Categories */}
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {TEAM_BY_CATEGORY.map((category, catIdx) => (
                    <div key={catIdx} className="flex flex-col gap-4">
                        {/* Category Header */}
                        <h3 className="text-xl md:text-2xl font-normal text-gray-500">
                            {language === 'th' ? category.categoryTH : category.category}
                        </h3>
                        
                        {/* Members in this category */}
                        <div className="flex flex-col gap-4">
                            {category.members.map((member, memberIdx) => (
                                <div key={memberIdx} className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
                                    <div>{member.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
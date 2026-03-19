'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { ASSETS } from '@/utils/assets';
import { useLanguage } from '@/utils/languageContext';
import { getTranslation } from '@/utils/translations';
import { FOUNDER, DIRECTORS, TEAM_GROUPS } from '@/utils/teamDataBilingual';

type Section = 'founder' | 'team' | string;

interface TeamPageProps {
    activePage?: 'founder' | 'team';
    onNavigate?: (page: string) => void;
}

export function TeamPage({ activePage = 'founder' }: TeamPageProps) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('founder');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const getDirectorId = (name: string) => name.replace(/\s+/g, '-').toLowerCase();
  const getTeamGroupId = (role: string) => role.replace(/\s+/g, '-').replace(/'/g, '').replace(/&/g, 'and').toLowerCase();

  const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
          const offset = 120;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
      
          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          });
      }
  };

  // Initial Scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
    
    // Allow scroll handler to run after initial load completes
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll Spy
  useEffect(() => {
      const handleScroll = () => {
          // Don't update during initial load
          if (isInitialLoad) return;
          
          const sectionIds = [
            'founder', 
            ...DIRECTORS.map(d => getDirectorId(d.name)), 
            ...TEAM_GROUPS.map(g => getTeamGroupId(g.role))
          ];
          // Trigger point: 30% down the screen or fixed offset
          const headerOffset = window.innerHeight * 0.3; 
          
          let current = sectionIds[0];
          
          for (const id of sectionIds) {
              const el = document.getElementById(id);
              if (el) {
                  const rect = el.getBoundingClientRect();
                  // If the top of the section is above the threshold, it's a candidate
                  if (rect.top <= headerOffset) {
                      current = id;
                  }
              }
          }

          // Special check: if we are at the bottom of the page, activate the last section
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
              current = sectionIds[sectionIds.length - 1];
          }
          
          setActiveSection(current);
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => window.removeEventListener('scroll', handleScroll);
  }, [isInitialLoad]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <ParallaxHero 
        image="https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-team-f51a7633.jpg"
        height="h-[60vh] md:h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          
          {/* Sidebar */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
                
                {/* Founder */}
                <button
                    onClick={() => scrollToSection('founder')}
                    className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 cursor-pointer ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                        activeSection === 'founder' || !activeSection
                        ? 'text-black'
                        : 'text-gray-400 hover:text-black'
                    }`}
                >
                    {getTranslation(language, 'team.founder')}
                </button>

                {/* Directors Group */}
                {DIRECTORS && DIRECTORS.length > 0 && (
                <div className="flex flex-col gap-2">
                    <button 
                        onClick={() => scrollToSection(getDirectorId(DIRECTORS[0].name))}
                        className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 ${
                            DIRECTORS.some(d => activeSection === getDirectorId(d.name))
                            ? 'text-black'
                            : 'text-gray-400 hover:text-black'
                        } ${language === 'th' ? 'leading-[1.82em]' : ''}`}
                    >
                        {getTranslation(language, 'team.directors')}
                    </button>
                </div>
                )}

                {/* Team Groups - Individual Links */}
                {TEAM_GROUPS && TEAM_GROUPS.length > 0 && (
                <div className="flex flex-col gap-2">
                    {TEAM_GROUPS.map((group) => (
                        <button
                            key={group.role}
                            onClick={() => scrollToSection(getTeamGroupId(group.role))}
                            className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 select-none text-gray-400 hover:text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}
                        >
                            {language === 'th' ? group.roleTH : group.role}
                        </button>
                    ))}
                </div>
                )}

            </nav>
          </aside>

          {/* Content Area */}
          <main className="w-full md:w-1/2 min-h-[50vh]">
            
            {/* Founder Section */}
            <div id="founder" className="flex flex-col gap-8 w-full mb-24 scroll-mt-32">
                <Reveal>
                     <div className="aspect-[2/3] w-full bg-gray-100 mb-6">
                        <div 
                            className="w-full h-full bg-cover bg-center bg-no-repeat p-[0px] m-[0px]"
                            style={{ backgroundImage: `url(${FOUNDER.image})` }}
                        />
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-xl md:text-2xl font-sans text-black font-normal mb-6">
                        {FOUNDER.name}
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <div className="text-xl md:text-2xl text-black font-normal leading-tight tracking-tight flex flex-col gap-6">
                        {(language === 'th' ? FOUNDER.bioTH : FOUNDER.bio).map((para, i) => (
                            <p key={i} className={language === 'th' ? 'leading-[1.82em]' : undefined}>{para}</p>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Directors Sections */}
            {DIRECTORS.map((director, index) => (
                <div key={director.name} id={getDirectorId(director.name)} className="flex flex-col gap-8 w-full mb-24 scroll-mt-32">
                    {director.image && (
                        <Reveal>
                            <div className="aspect-[2/3] w-full bg-gray-100 mb-6">
                                <div 
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${director.image})` }}
                                />
                            </div>
                        </Reveal>
                    )}
                    <Reveal delay={0.1}>
                        <h2 className="text-xl md:text-2xl font-sans text-black font-normal mb-6">
                            {director.name}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="text-xl md:text-2xl text-black font-normal leading-tight tracking-tight flex flex-col gap-6">
                            {(language === 'th' ? director.bioTH : director.bio).map((para, i) => (
                                <p key={i} className={language === 'th' ? 'leading-[1.82em]' : undefined}>{para}</p>
                            ))}
                        </div>
                    </Reveal>
                </div>
            ))}

            {/* Team Section */}
            <div className="w-full pb-24">
                <div className="space-y-12">
                    {TEAM_GROUPS.map((group, index) => (
                        <div key={group.role} id={getTeamGroupId(group.role)} className="flex flex-col gap-2 scroll-mt-32">
                            <h3 className={`text-xl md:text-2xl font-sans text-black font-medium leading-tight tracking-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {language === 'th' ? group.roleTH : group.role}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {(language === 'th' && group.membersTH ? group.membersTH : group.members).map(member => (
                                    <p key={member} className={`text-xl md:text-2xl font-sans text-black font-normal leading-tight tracking-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                        {member}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
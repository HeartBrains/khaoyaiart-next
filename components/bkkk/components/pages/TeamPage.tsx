// @ts-nocheck
'use client';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';
import { FOUNDER, DIRECTORS, TEAM_GROUPS } from '@/components/bkkk/utils/teamDataBilingual';
const ADVISORY_BOARD_MEMBERS: string[] = [];

const TEAM_HERO = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop';

interface TeamPageProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export function TeamPage({ activePage }: TeamPageProps) {
  const { language } = useLanguage();

  return (
    <div className="relative w-full min-h-screen bg-white pb-24">
      <ParallaxHero image={TEAM_HERO} height="h-[60vh] md:h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">

        {/* Founder */}
        <section id="founder" className="flex flex-col md:flex-row mb-24 md:mb-32">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-xl md:text-2xl font-normal sticky top-32">
              {language === 'th' ? 'ผู้ก่อตั้ง' : 'Founder'}
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            {FOUNDER.image && (
              <div className="w-full mb-4">
                <img src={FOUNDER.image} alt={FOUNDER.name} className="w-full h-auto object-cover" />
              </div>
            )}
            <div className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
              <div className="mb-2">{FOUNDER.name}</div>
              {FOUNDER.bio?.length > 0 && (
                <div className="flex flex-col gap-3 text-base md:text-lg text-gray-700 mt-2">
                  {(language === 'th' ? (FOUNDER.bioTH || FOUNDER.bio) : FOUNDER.bio).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Directors */}
        {DIRECTORS.length > 0 && (
          <section id="directors" className="flex flex-col md:flex-row mb-24 md:mb-32">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-xl md:text-2xl font-normal sticky top-32">
                {language === 'th' ? 'ผู้อำนวยการ' : 'Directors'}
              </h2>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-12">
              {DIRECTORS.map((director, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="flex flex-col gap-4">
                    {director.image && (
                      <div className="w-full mb-4">
                        <img src={director.image} alt={director.name} className="w-full aspect-[3/4] object-cover object-center" />
                      </div>
                    )}
                    <div className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
                      <div className="mb-2">{director.name}</div>
                      {director.bio?.length > 0 && (
                        <div className="flex flex-col gap-3 text-base md:text-lg text-gray-700 mt-2">
                          {(language === 'th' ? (director.bioTH || director.bio) : director.bio).map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Advisory Board */}
        {ADVISORY_BOARD_MEMBERS?.length > 0 && (
          <section id="advisory-board" className="flex flex-col md:flex-row mb-24 md:mb-32">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-xl md:text-2xl font-normal sticky top-32">
                {language === 'th' ? 'คณะกรรมการที่ปรึกษา' : 'Advisory Board'}
              </h2>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {ADVISORY_BOARD_MEMBERS.map((member, idx) => (
                <p key={idx} className="text-xl md:text-2xl font-sans text-black font-normal">
                  {member}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Team */}
        <section id="team" className="flex flex-col md:flex-row mb-12">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-xl md:text-2xl font-normal sticky top-32">
              {language === 'th' ? 'ทีมงาน' : 'Team'}
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-12">
            {TEAM_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl font-normal text-gray-500">
                  {language === 'th' ? (group.roleTH || group.role) : group.role}
                </h3>
                <div className="flex flex-col gap-2">
                  {group.members.map((name, mIdx) => (
                    <div key={mIdx} className="text-xl md:text-2xl font-sans text-black font-normal">
                      {name}
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

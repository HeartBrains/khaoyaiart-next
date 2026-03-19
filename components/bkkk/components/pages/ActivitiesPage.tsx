'use client';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '@/utils/languageContext';
import { useBkkkActivities } from '@/lib/useWPData';

type StatusFilter = 'all' | 'upcoming' | 'current' | 'past';

interface ActivitiesPageProps {
  onNavigate: (page: string, slug?: string) => void;
  targetSectionId?: string;
}

export function ActivitiesPage({ onNavigate }: ActivitiesPageProps) {
  const { language, t } = useLanguage();
  const { data: rawActivities } = useBkkkActivities();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const activities = rawActivities.map(a => ({
    id: a.id,
    slug: a.slug,
    title: language === 'th' ? a.title.th : a.title.en,
    date: language === 'th' ? a.dateDisplay.th : a.dateDisplay.en,
    featuredImage: a.featuredImage,
    status: a.status as StatusFilter,
  }));

  const filtered = statusFilter === 'all'
    ? activities
    : activities.filter(a => a.status === statusFilter);

  const statusLabels: Record<StatusFilter, { en: string; th: string }> = {
    all:      { en: 'All',      th: 'ทั้งหมด' },
    upcoming: { en: 'Upcoming', th: 'กำลังจะมาถึง' },
    current:  { en: 'Current',  th: 'ปัจจุบัน' },
    past:     { en: 'Past',     th: 'ที่ผ่านมา' },
  };

  return (
    <div className="w-full bg-white pb-24 min-h-screen font-sans text-black">
      <ParallaxHero
        image="https://images.unsplash.com/photo-1761403757058-e3c95b662a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBtdXNldW0lMjB3aGl0ZSUyMHdhbGxzfGVufDF8fHx8MTc3Mjk3NjY4OHww&ixlib=rb-4.1.0&q=80&w=1080"
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Left Sidebar */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              <h2 className="text-xl md:text-2xl font-sans font-medium text-black mb-8">
                {t('nav.activities')}
              </h2>
              {(['all', 'upcoming', 'current', 'past'] as StatusFilter[]).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                    statusFilter === s
                      ? 'text-black font-medium'
                      : 'text-gray-400 hover:text-black font-normal'
                  }`}
                >
                  {language === 'th' ? statusLabels[s].th : statusLabels[s].en}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Content */}
          <main className="w-full md:w-1/2 flex flex-col gap-16">
            {filtered.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.1}>
                <div
                  className="flex flex-col gap-6 w-full cursor-pointer group"
                  onClick={() => onNavigate('activity-detail', item.slug)}
                >
                  <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                    <ImageWithFallback
                      src={item.featuredImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-xl md:text-2xl font-normal text-black leading-tight whitespace-pre-wrap ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {item.title}
                    </h3>
                    {item.date && (
                      <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}

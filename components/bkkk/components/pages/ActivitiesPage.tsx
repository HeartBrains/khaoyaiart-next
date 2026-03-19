'use client';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '@/utils/languageContext';
import { useBkkkActivities } from '@/lib/useWPData';

interface ActivitiesPageProps {
  onNavigate: (page: string, slug?: string) => void;
  targetSectionId?: string;
}

export function ActivitiesPage({ onNavigate, targetSectionId }: ActivitiesPageProps) {
  const { language, t } = useLanguage();
  const { data: rawActivities } = useBkkkActivities();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Normalise WP shape to the flat shape the rest of this component expects
  const activitiesWithTags = rawActivities.map(activity => ({
    id: activity.id,
    slug: activity.slug,
    title: language === 'th' ? activity.title.th : activity.title.en,
    date: language === 'th' ? activity.dateDisplay.th : activity.dateDisplay.en,
    featuredImage: { sourceUrl: activity.featuredImage },
    tags: (language === 'th' ? activity.categories.th : activity.categories.en).length
      ? (language === 'th' ? activity.categories.th : activity.categories.en)
      : ['Performance'],
  }));

  const tags = language === 'th' 
    ? ['การแสดง', 'การฉายภาพยนตร์', 'การบรรยาย', 'เวิร์คช็อป', 'เสียง']
    : ['Performance', 'Screening', 'Talk / Lectures', 'Workshop', 'Sound'];

  // Handle tag click
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      const filtered = selectedTags.filter(t => t !== tag);
      setSelectedTags(filtered);
    } else {
      // Add tag
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter activities based on selected tags
  const filteredActivities = selectedTags.length === 0 
    ? activitiesWithTags 
    : activitiesWithTags.filter(item => {
        // English mapping for filtering if language is TH
        let filterTags = selectedTags;
        if (language === 'th') {
          const mapping: Record<string, string> = {
            'การแสดง': 'Performance',
            'การฉายภาพยนตร์': 'Screening',
            'การบรรยาย': 'Talk / Lectures',
            'เวิร์คช็อป': 'Workshop',
            'เสียง': 'Sound'
          };
          filterTags = selectedTags.map(tag => mapping[tag] || tag);
        }
        
        return item.tags.some(tag => filterTags.includes(tag));
      });

  useEffect(() => {
    if (targetSectionId) {
      // Map section IDs to tag selections
      if (targetSectionId === 'public-program') {
        setSelectedTags(language === 'th' ? ['การแสดง', 'การบรรยาย', 'เวิร์คช็อป'] : ['Performance', 'Talk / Lectures', 'Workshop']);
      } else if (targetSectionId === 'screenings') {
        setSelectedTags(language === 'th' ? ['การฉายภาพยนตร์'] : ['Screening']);
      }
      
      const element = document.getElementById(targetSectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [targetSectionId, language]);

  return (
    <div className="w-full bg-white pb-24 min-h-screen font-sans text-black">
      {/* Hero */}
      <ParallaxHero 
        image="https://images.unsplash.com/photo-1761403757058-e3c95b662a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBtdXNldW0lMjB3aGl0ZSUyMHdhbGxzfGVufDF8fHx8MTc3Mjk3NjY4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      {/* Main Content */}
      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Left Sidebar - Fixed */}
          <aside className="w-full md:w-1/2 shrink-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              <h2 className="text-xl md:text-2xl font-sans font-medium text-black mb-4">
                {t('nav.activities')}
              </h2>
              <h3 className="text-xl md:text-2xl font-sans font-normal text-gray-400 mb-4 mt-8">
                {language === 'th' ? 'จัดเรียงตามแท็ก' : 'Sort by Tags'}
              </h3>
              
              {/* Tag filters */}
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? 'text-black font-medium'
                      : 'text-gray-400 hover:text-black font-normal'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Content - Activities List */}
          <main className="w-full md:w-1/2 flex flex-col gap-16">
            {filteredActivities.map((item, itemIdx) => (
              <Reveal key={item.id} delay={itemIdx * 0.1}>
                <div 
                  className="flex flex-col gap-6 w-full cursor-pointer group"
                  onClick={() => onNavigate('activity-detail', item.slug)}
                >
                  <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                    <ImageWithFallback 
                      src={item.featuredImage?.sourceUrl} 
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
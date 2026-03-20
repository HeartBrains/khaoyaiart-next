'use client';
import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useCovers } from '@/lib/coversContext';
import { useLanguage } from '@/utils/languageContext';
import { getMockPostsByType } from '@/utils/mockDataBilingual';

interface BlogPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const { language, t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Get all blog posts in current language
  const allBlogPosts = getMockPostsByType('post', language);

  // Group posts by year
  const blogsByYear = useMemo(() => {
    const grouped = allBlogPosts.reduce((acc, post) => {
      // Extract year from date (handling both formats)
      const yearMatch = post.date.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : '2025';
      
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {} as Record<string, typeof allBlogPosts>);

    // Sort years descending
    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
    
    return sortedYears.map(year => ({
      year,
      posts: grouped[year].sort((a, b) => {
        // Sort posts within year by date (newest first)
        return b.date.localeCompare(a.date);
      })
    }));
  }, [allBlogPosts]);

  const years = ['all', ...blogsByYear.map(y => y.year)];

  const filteredBlogs = selectedYear === 'all' 
    ? blogsByYear 
    : blogsByYear.filter(y => y.year === selectedYear);

  return (
    <div className="w-full min-h-screen bg-white pb-24">
       {/* Hero Section */}
       <ParallaxHero 
          image="https://images.unsplash.com/photo-1698881826220-a4fc847a0493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGJsb2clMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzI5NzY2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          height="h-[80vh]"
       >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
       </ParallaxHero>

      {/* Content Section */}
      <div className="w-full mx-auto px-[5%] pt-[96px] pb-[0px]">
        <div className="flex flex-col">
            
            {/* Sidebar - Shows only years that are currently loaded/visible */}
            <aside className="w-full shrink-0 h-fit mb-12">
                <nav className="flex flex-col items-start gap-2">
                    <h2 className="text-xl md:text-2xl font-sans font-medium text-black mb-4">Blog</h2>
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                                selectedYear === year
                                ? 'text-black font-medium' 
                                : 'text-gray-400 hover:text-black font-normal'
                            }`}
                        >
                            {year}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-full min-h-[50vh]">
                {filteredBlogs.map((yearGroup) => (
                    <div key={yearGroup.year} id={`year-${yearGroup.year}`} className="mb-24 scroll-mt-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
                            {yearGroup.posts.map((post) => (
                                <Reveal key={post.id}>
                                    <div 
                                        className="flex flex-col gap-6 cursor-pointer group w-full"
                                        onClick={() => onNavigate('blog-detail', post.slug)}
                                    >
                                        {/* Image */}
                                        <div className="aspect-[3/4] w-full bg-gray-200 overflow-hidden">
                                            <ImageWithFallback 
                                                src={post.featuredImage?.sourceUrl} 
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex flex-col gap-1">
                                            <h3 className={`text-xl md:text-2xl font-sans text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                {post.title}
                                            </h3>
                                            {post.categories && post.categories[0] && (
                                                <p className={`text-xl md:text-2xl font-sans text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                    {post.categories[0]}
                                                </p>
                                            )}
                                            <p className={`text-xl md:text-2xl font-sans text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                {post.date}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

        </div>
      </div>
    </div>
  );
}
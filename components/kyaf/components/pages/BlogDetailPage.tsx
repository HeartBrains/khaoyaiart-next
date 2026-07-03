'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';
import { useScrollHide } from '@/utils/useScrollHide';
import { useBlogPostBySlug } from '@/lib/useWPData';
import { RichContent } from '@/utils/richContent';

interface BlogDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
  backPage?: string;
}

export function BlogDetailPage({ onNavigate, slug, backPage }: BlogDetailPageProps) {
  const { language, t } = useLanguage();
  const { data: wpPost, loading } = useBlogPostBySlug(slug ?? '');
  const { isScrolling } = useScrollHide();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (!wpPost) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบบทความ' : 'Post not found.'}</div>;

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {wpPost.featuredImage ? (
         <div
            className="relative h-[20vh] md:h-[30vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${wpPost.featuredImage})` }}
         >
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
             <div className="absolute bottom-8 left-6 md:left-12 z-20">
                <button
                    onClick={() => onNavigate(backPage || 'blog')}
                    className={`static flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm ${isScrolling ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium font-sans">
                        {backPage === 'home' ? (language === 'th' ? 'กลับสู่หน้าหลัก' : 'Back to Home') : (language === 'th' ? 'กลับไปบล็อก' : 'Back to Blog')}
                    </span>
                </button>
            </div>
         </div>
      ) : (
         <div className="h-[20vh] bg-gray-100 w-full relative">
            <div className="absolute bottom-8 left-6 md:left-12 z-20">
                <button
                    onClick={() => onNavigate(backPage || 'blog')}
                    className={`static flex items-center gap-2 text-black hover:text-gray-600 transition-all duration-300 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm ${isScrolling ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium font-sans">
                        {backPage === 'home' ? (language === 'th' ? 'กลับสู่หน้าหลัก' : 'Back to Home') : (language === 'th' ? 'กลับไปบล็อก' : 'Back to Blog')}
                    </span>
                </button>
            </div>
         </div>
      )}

      <div className="w-full px-[6vw] py-12 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16">
            <div className="flex flex-col gap-8">
               <Reveal>
                    <div className="flex flex-col gap-1">
                        <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {wpPost.title[language] || wpPost.title.en}
                        </h1>
                        {wpPost.date && (
                            <p className={`text-xl md:text-2xl text-black font-normal leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{wpPost.date}</p>
                        )}
                    </div>
               </Reveal>
            </div>
            <div className={`text-xl md:text-2xl text-black font-normal leading-tight space-y-6 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
               <Reveal delay={0.2}>
                   <div><RichContent content={wpPost.content[language] || wpPost.content.en} /></div>
               </Reveal>
               {wpPost.imageCredits && (
                 <Reveal delay={0.3}>
                   <p className={`text-base text-gray-500 font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{wpPost.imageCredits}</p>
                 </Reveal>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

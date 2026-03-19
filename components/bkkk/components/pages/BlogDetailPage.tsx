'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { WPPost } from '@/utils/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';
import { getMockPost } from '@/utils/mockDataBilingual';

interface BlogDetailPageProps {
  onNavigate: (page: string) => void;
  post?: WPPost;
  slug?: string;
}

export function BlogDetailPage({ onNavigate, post, slug }: BlogDetailPageProps) {
  const { language, t } = useLanguage();
  const [postData, setPostData] = useState<WPPost | undefined>(post);
  const [loading, setLoading] = useState(!post && !!slug);
  const [error, setError] = useState(false);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (post) {
        setPostData(post);
        setLoading(false);
        return;
    }
    
    if (slug) {
        setLoading(true);
        // Use bilingual mock data instead of API
        const data = getMockPost(slug, language);
        if (data) {
            setPostData(data);
            setLoading(false);
        } else {
            setError(true);
            setLoading(false);
        }
    }
  }, [post, slug, language]);

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !postData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบบทความ' : 'Post not found.'}</div>;

  // Use gallery from postData or fallback to featured image
  const galleryImages = postData.gallery && postData.gallery.length > 0 
    ? postData.gallery 
    : (postData.featuredImage ? [postData.featuredImage?.sourceUrl] : []);

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Hero */}
      {galleryImages.length > 0 && (
        <div className="h-[35vh] md:h-[80vh] w-full relative overflow-hidden group bg-black">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent className="h-full -ml-0">
              {galleryImages.map((src, index) => (
                <CarouselItem key={index} className="h-full pl-0">
                  <ImageWithFallback
                    src={src}
                    alt={`${postData.title} Gallery ${index + 1}`}
                    className="w-full h-full object-cover opacity-90"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {galleryImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <CarouselPrevious className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                <CarouselNext className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
              </div>
            )}
          </Carousel>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-8 right-[5%] z-20 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="absolute bottom-8 left-6 md:left-12 z-20">
            <button 
              onClick={() => onNavigate('blog')}
              className="fixed top-[120px] left-6 z-30 md:static md:ml-[5%] flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-normal font-sans">
                {language === 'th' ? 'กลับไปบล็อก' : 'Back to Blog'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-full px-[5%] pt-[96px] pb-[0px] md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            {/* Left Column */}
            <div className="md:col-span-6 flex flex-col gap-8">
                <div className="flex flex-col gap-0 px-0 md:px-[28px] py-[0px]">
                    <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {postData.title}
                    </h1>

                    {postData.categories && (
                        <>
                            {postData.categories.map((cat, idx) => (
                                <p key={idx} className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{cat}</p>
                            ))}
                        </>
                    )}

                    {postData.date && (
                        <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{postData.date}</p>
                    )}
                </div>
            </div>

            {/* Right Column */}
            <div className={`md:col-start-7 md:col-span-6 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
               <div className="[&>p]:mb-8" dangerouslySetInnerHTML={{ __html: postData.content }} />

               {postData.acf?.keyThemes && (
                   <div>
                     <h3 className={`text-xl md:text-2xl font-normal mb-4 text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {language === 'th' ? 'หัวข้อหลัก' : 'Key Themes'}
                     </h3>
                     <div className={`space-y-2 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {postData.acf.keyThemes.map((item: any, idx: number) => (
                             <p key={idx}><span className="font-normal">{item.title}:</span> {item.desc}</p>
                        ))}
                     </div>
                   </div>
               )}

               <p className={`text-xl md:text-2xl text-gray-500 font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                 {language === 'th' 
                    ? 'เข้าร่วมการเสวนาและเวิร์คช็อปประจำเดือนของเราเพื่อเจาะลึกหัวข้อเหล่านี้กับศิลปินและภัณฑารักษ์ที่โดดเด่นของเรา'
                    : 'Join us for our monthly talks and workshops to dive deeper into these topics with our featured artists and curators.'
                 }
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
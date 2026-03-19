'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/utils/languageContext';
import { getMockPost } from '@/utils/mockDataBilingual';
import { exhibitions, exhibitionToWPPost, type Exhibition } from '@/utils/exhibitionsDataNew';
import { getDetailContentByLanguage } from '@/utils/detailContent';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { WPPost } from '@/utils/types';
import { ArrowLeft } from 'lucide-react';

interface ExhibitionDetailPageProps {
  onNavigate: (page: string) => void;
  exhibition?: WPPost;
  slug?: string;
  backPage?: string;
}

export function ExhibitionDetailPage({ onNavigate, exhibition, slug, backPage }: ExhibitionDetailPageProps) {
  const { language, t } = useLanguage();
  const [postData, setPostData] = useState<WPPost | undefined>(exhibition);
  const [loading, setLoading] = useState(!exhibition && !!slug);
  const [error, setError] = useState(false);
  const [detailContent, setDetailContent] = useState<string>('');

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (exhibition) {
        setPostData(exhibition);
        setLoading(false);
        // Get detail content based on current language and exhibition slug
        if (exhibition.slug) {
          const content = getDetailContentByLanguage(exhibition.slug, language) || '';
          setDetailContent(content);
        }
        return;
    }
    
    if (slug) {
        setLoading(true);
        // Try to get exhibition from the new exhibitions data first
        let data = exhibitions.find(e => e.slug === slug);
        if (data) {
            data = exhibitionToWPPost(data, language) as unknown as Exhibition;
        }
        // Fallback to mock data if not found
        if (!data) {
            data = getMockPost(slug, language) as unknown as Exhibition;
        }
        if (data) {
            setPostData(data as unknown as WPPost);
            // Get detail content based on current language
            const content = getDetailContentByLanguage(slug, language) || '';
            setDetailContent(content);
            setLoading(false);
        } else {
            setError(true);
            setLoading(false);
        }
    }
  }, [exhibition, slug, language]);

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !postData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบนิทรรศการ' : 'Exhibition not found.'}</div>;

  // Use gallery from postData or fallback to featured image
  const baseGallery = postData.gallery && postData.gallery.length > 0 
    ? postData.gallery 
    : (postData.featuredImage ? [postData.featuredImage?.sourceUrl] : []);

  // Use only real gallery images, no placeholders
  const galleryImages = baseGallery;

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
       {/* Hero Section */}
       <div className="w-full relative group">
          {galleryImages.length > 0 ? (
              <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full bg-black"
                opts={{ align: "start", loop: true }}
              >
                <CarouselContent className="-ml-0">
                   {galleryImages.map((src, index) => (
                      <CarouselItem key={index} className="pl-0">
                         <img
                            src={src}
                            alt={`${postData.title} Gallery ${index + 1}`}
                            className="w-full h-auto block"
                            loading={index === 0 ? "eager" : "lazy"}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
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
          ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">
                    {language === 'th' ? 'ไม่มีรูปภาพ' : 'No images available'}
                </span>
              </div>
          )}

         {/* Thumbnails */}
         {galleryImages.length > 1 && (
             <div className="absolute bottom-8 right-6 md:right-[5%] z-20 flex gap-2">
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
                onClick={() => onNavigate('exhibitions')}
                className="relative ml-[5%] flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-normal font-sans whitespace-nowrap">
                    {language === 'th' ? 'กลับสู่นทรรศการ' : 'Back to Exhibitions'}
                </span>
            </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            
            {/* Left Column - Meta Data */}
            <div className="md:col-span-6 flex flex-col gap-8">
                <div className="flex flex-col gap-0 px-0 md:px-[28px] py-[0px]">
                    <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {postData.title}
                    </h1>
                    
                    {postData.acf?.artist && (
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {postData.acf.artist}
                        </p>
                    )}
                    
                    {postData.date && (
                        <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{postData.date}</p>
                    )}
                    
                    {postData.acf?.curator && (
                        <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {language === 'th' ? 'ภัณฑารักษ์: ' : 'Curated by '}{postData.acf.curator}
                        </p>
                    )}
                    
                    {postData.acf?.imageCredits && (
                        <div className="mt-8 pt-6">
                            <p className="text-gray-500 text-[12px]">
                                {postData.acf.imageCredits}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column - Text Content */}
            <div className={`md:col-start-7 md:col-span-6 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                {detailContent && (
                    <div className="[&>p]:mb-8" dangerouslySetInnerHTML={{ __html: detailContent }} />
                )}

                {postData.acf?.biography && (
                    <>
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className={`text-xl md:text-2xl font-normal text-black mb-6 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {language === 'th' ? 'ประวัติศิลปิน' : 'Artist Biography'}
                            </h3>
                            <div className="[&>p]:mb-8" dangerouslySetInnerHTML={{ __html: postData.acf.biography }} />
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from 'react';
import { Reveal } from '../ui/Reveal';
import { VisitInfo } from './sections/VisitInfo';
import { useLanguage } from '@/utils/languageContext';
import { useActivityBySlug } from '@/lib/useWPData';
import { getDetailContentByLanguage } from '@/utils/detailContent';
import { useScrollHide } from '@/utils/useScrollHide';

interface ActivityDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
  backPage?: string;
}

export function ActivityDetailPage({ onNavigate, slug, backPage }: ActivityDetailPageProps) {
  const { language, t } = useLanguage();
  const { data: activityData, loading, error } = useActivityBySlug(slug ?? '');
  const { isScrolling } = useScrollHide();

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !activityData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบกิจกรรม' : 'Activity not found.'}</div>;

  // Use gallery from activity data or fallback to featured image
  const galleryImages = activityData.gallery && activityData.gallery.length > 0
    ? activityData.gallery
    : [activityData.featuredImage];

  // Get detailed content from detailContent files
  const detailContent = slug ? getDetailContentByLanguage(slug, language) : undefined;

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
       {/* Hero Section */}
       <div className="w-full relative overflow-hidden group bg-black">
         {galleryImages.length > 0 ? (
             <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full"
                opts={{ align: "start", loop: true }}
             >
                <CarouselContent className="-ml-0">
                   {galleryImages.map((src, index) => (
                      <CarouselItem key={index} className="pl-0">
                         <ImageWithFallback
                            src={src}
                            alt={`${activityData.title} Gallery ${index + 1}`}
                            className="w-full h-auto max-h-[80vh] block opacity-90 object-cover"
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
             <div className="w-full h-[50vh] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">
                    {language === 'th' ? 'ไม่มีรูปภาพ' : 'No images available'}
                </span>
             </div>
         )}

         {/* Dot Navigation */}
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

         {/* Gradient Overlay */}
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

         {/* Back Button */}
         <div className="absolute bottom-8 left-6 md:left-12 z-20">
            <button 
                onClick={() => onNavigate(backPage || 'activities')}
                className={`static flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm ${
                    isScrolling ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium font-sans">
                    {backPage === 'home'
                        ? (language === 'th' ? 'กลับสู่หน้าหลัก' : 'Back to Home')
                        : backPage === 'archives'
                        ? (language === 'th' ? 'กลับสู่คลังข้อมูล' : 'Back to Archives')
                        : (language === 'th' ? 'กลับสู่กิจกรรม' : 'Back to Activities')
                    }
                </span>
            </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-[6vw] py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16">
            
            {/* Left Column - Meta Data */}
            <div className="flex flex-col gap-8">
                <Reveal>
                    <div className="flex flex-col gap-1">
                        <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {language === 'th' ? activityData.title.th : activityData.title.en}
                        </h1>
                        
                        {activityData.artist && (
                            <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {language === 'th' ? activityData.artist.th : activityData.artist.en}
                            </p>
                        )}

                        {activityData.dateDisplay && (
                            <p className={`text-xl md:text-2xl text-black font-normal leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {language === 'th' ? activityData.dateDisplay.th : activityData.dateDisplay.en}
                            </p>
                        )}
                        
                        {activityData.typeLabel && (
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">
                                {language === 'th' ? activityData.typeLabel.th : activityData.typeLabel.en}
                            </p>
                        )}
                    </div>
                </Reveal>
            </div>

            {/* Right Column - Text Content */}
            <div className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                <Reveal delay={0.2}>
                    <div className="flex flex-col gap-6">
                        <div dangerouslySetInnerHTML={{ __html: detailContent || '' }} />
                    </div>
                </Reveal>
            </div>
        </div>
      </div>

      {/* Visit Information */}
      <VisitInfo />
    </div>
  );
}
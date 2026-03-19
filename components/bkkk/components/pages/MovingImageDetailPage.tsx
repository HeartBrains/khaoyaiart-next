'use client';
import { useLanguage } from '@/utils/languageContext';
import { getMovingImageProgramBySlug } from '@/utils/movingImageData';
import { getDetailContentByLanguage } from '@/utils/detailContent';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface MovingImageDetailPageProps {
  slug: string;
  onNavigate?: (page: string) => void;
  backPage?: string;
}

export function MovingImageDetailPage({ slug, onNavigate, backPage }: MovingImageDetailPageProps) {
  const { language } = useLanguage();
  const program = getMovingImageProgramBySlug(slug);
  
  // Get detail content from detailContent.ts based on language
  const detailContent = getDetailContentByLanguage(slug, language) || '';

  // Carousel state
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (!program) {
    return (
      <div className="w-full min-h-screen bg-white pt-32 px-6 md:px-12">
        <p className="text-xl">Program not found</p>
      </div>
    );
  }

  // Use gallery from program data or fallback to featured image
  const galleryImages = program.gallery && program.gallery.length > 0 
    ? program.gallery 
    : (program.featuredImage ? [program.featuredImage] : []);

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      {/* Hero Section - Carousel with Dots */}
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
                  <div className="w-full h-[80vh] flex items-center justify-center bg-black">
                    <img
                      src={src}
                      alt={`${program.title[language]} Gallery ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
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
          <div className="w-full h-[80vh] bg-gray-200 flex items-center justify-center">
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

        {/* Back Button */}
        <div className="absolute bottom-8 left-6 md:left-12 z-20">
          <button 
            onClick={() => onNavigate?.('moving-image')}
            className="md:ml-[5%] flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-normal font-sans">
              {language === 'th' ? 'กลับสู่โปรแกรมภาพเคลื่อนไหว' : 'Back to Moving Image Program'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-[5%] md:py-16 pt-[96px] pb-[0px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          {/* Left Column - Program Info */}
          <div className="md:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-0 px-0 md:px-[28px] py-[0px]">
              {/* Title */}
              <h1 className={`text-xl md:text-2xl font-normal ${language === 'th' ? 'leading-[1.82em]' : ''} m-[0px]`}>
                {program.title[language]}
              </h1>

              {/* Dates */}
              <p className={`text-xl md:text-2xl font-normal ${language === 'th' ? 'leading-[1.82em]' : ''} m-[0px]`}>
                {program.dateDisplay[language]}
              </p>
              
              {/* Curated by */}
              <p className={`text-xl md:text-2xl font-normal ${language === 'th' ? 'leading-[1.82em]' : ''} m-[0px]`}>
                {language === 'th' ? 'ภัณฑารักษ์: ' : 'Curated by '}{program.curator[language]}
              </p>
            </div>

            {/* Films in Program */}
            <div className="px-0 md:px-[28px]">
              <h2 className={`text-xl md:text-2xl font-medium leading-tight mb-6 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                {language === 'th' ? 'ภาพยนตร์ในโปรแกรม' : 'Films in Program'}
              </h2>
              
              {program.additionalInfo && (
                <div 
                  className={`[&>p]:mb-4 [&>p]:text-xl [&>p]:md:text-2xl ${language === 'th' ? '[&>p]:leading-[1.82em]' : '[&>p]:leading-tight'}`}
                  dangerouslySetInnerHTML={{ __html: program.additionalInfo }}
                />
              )}
              
              {/* Installation Views */}
              {program.installationViews && program.installationViews.length > 0 && (
                <div className="mt-16">
                  <ul className="space-y-3">
                    {program.installationViews.map((view, index) => (
                      <li key={index} className={`text-[12px] text-gray-600 leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {view.artist}, <em>{view.title}</em>, {view.year}. {language === 'th' ? 'ภาพจัดแสดง, บางกอก คุนสท์ฮัลเล่' : 'Installation view, Bangkok Kunsthalle'}.
                      </li>
                    ))  }
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Statement */}
          <div className="md:col-start-7 md:col-span-6 px-0 md:px-[28px]">
            <div 
              className={`[&>p]:mb-8 [&>p]:text-2xl ${language === 'th' ? '[&>p]:leading-[1.82em]' : ''}`}
              dangerouslySetInnerHTML={{ __html: detailContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
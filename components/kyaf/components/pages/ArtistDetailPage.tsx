// @ts-nocheck
'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';
import { ARTISTS_DATA as ARTISTS } from '@/components/kyaf/utils/residencyData';
import { useScrollHide } from '@/utils/useScrollHide';

interface ArtistDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
  backPage?: string;
}

export function ArtistDetailPage({ onNavigate, slug, backPage }: ArtistDetailPageProps) {
  const { language } = useLanguage();
  const [artistData, setArtistData] = useState<ReturnType<typeof getResidencyBySlug>>();
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState(false);
  const { isScrolling } = useScrollHide();

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slug) {
      setLoading(true);
      const data = getResidencyBySlug(slug);
      if (data) {
        setArtistData(data);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }
  }, [slug]);

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{language === 'th' ? 'กำลังโหลด...' : 'Loading...'}</div>;
  if (error || !artistData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบศิลปิน' : 'Artist not found.'}</div>;

  // Get detail content
  const detailContent = getDetailContentByLanguage(artistData.slug, language);

  // Use gallery from artistData
  const galleryImages = artistData.gallery && artistData.gallery.length > 0 
    ? artistData.gallery 
    : [artistData.image];

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
                            alt={`${language === 'th' ? artistData.name.th : artistData.name.en} Gallery ${index + 1}`}
                            className="w-full h-auto block opacity-90"
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

         {/* Thumbnails */}
         {galleryImages.length > 1 && (
             <div className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-2">
                {galleryImages.map((src, index) => (
                   <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-16 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                         current === index 
                            ? 'border-white scale-105 shadow-lg' 
                            : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                   >
                      <ImageWithFallback
                         src={src}
                         alt={`Thumbnail ${index + 1}`}
                         className="w-full h-full object-cover"
                      />
                   </button>
                ))}
             </div>
         )}

         {/* Gradient Overlay */}
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

         {/* Back Button */}
         <div className="absolute bottom-8 left-6 md:left-12 z-20">
            <button 
                onClick={() => onNavigate(backPage || 'residency')}
                className={`static flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm ${
                    isScrolling ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium font-sans">
                    {language === 'th' ? 'กลับ' : 'Back'}
                </span>
            </button>
         </div>
       </div>

       {/* Content Section */}
       <div className="w-full px-[6vw] pt-[96px]">
          <section className="flex flex-col md:flex-row mb-32 md:mb-40">
             {/* Left Column - Sticky Header */}
             <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
                <div className="md:sticky md:top-32">
                   <Reveal>
                      <h1 className={`text-xl md:text-2xl font-normal mb-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                         {language === 'th' ? artistData.name.th : artistData.name.en}
                      </h1>
                      <p className={`text-xl md:text-2xl font-normal text-gray-600 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                         {language === 'th' ? artistData.period.th : artistData.period.en}
                      </p>
                   </Reveal>
                </div>
             </div>
             
             {/* Right Column - Content */}
             <div className="w-full md:w-1/2">
                <Reveal delay={0.2}>
                   {detailContent ? (
                      <div 
                         className={`prose prose-lg max-w-none detail-content ${language === 'th' ? 'leading-[1.82em]' : ''}`}
                         dangerouslySetInnerHTML={{ __html: detailContent }}
                      />
                   ) : (
                      <p className="text-lg text-gray-400">
                         {language === 'th' ? 'ไม่มีเนื้อหา' : 'No content available'}
                      </p>
                   )}
                </Reveal>
             </div>
          </section>
       </div>
    </div>
  );
}
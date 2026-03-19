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
import { ARTISTS_DATA, ArtistDetail } from '@/utils/residencyData';
import { useLanguage } from '@/utils/languageContext';
import { getDetailContentByLanguage } from '@/utils/detailContent';
import { getResidencyCreditByIndex } from '@/utils/residencyCreditData';

interface ArtistDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
  backPage?: string;
}

export function ArtistDetailPage({ onNavigate, slug, backPage }: ArtistDetailPageProps) {
  const { language, t } = useLanguage();
  const [artist, setArtist] = useState<ArtistDetail | undefined>();
  const [loading, setLoading] = useState(true);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slug) {
        const foundArtist = ARTISTS_DATA.find(a => a.slug === slug);
        setArtist(foundArtist);
    }
    setLoading(false);
  }, [slug]);

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (!artist) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบศิลปิน' : 'Artist not found.'}</div>;

  const displayName = language === 'th' ? artist.nameTH : artist.name;
  const displayPeriod = language === 'th' ? artist.periodTH : artist.period;
  
  // Get detail content from detailContent.ts based on language
  const detailContent = slug ? getDetailContentByLanguage(slug, language) || '' : '';

  // Get gallery images from artist data
  const gallery = artist.gallery || [];

  // Get current image credit
  const currentCredit = slug ? getResidencyCreditByIndex(slug, current) : '';

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
       {/* Hero Section */}
       <div className="h-[35vh] md:h-[80vh] w-full relative overflow-hidden group bg-black">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{ align: "start", loop: true }}
            >
            <CarouselContent className="h-full -ml-0">
                {gallery.map((src, index) => (
                    <CarouselItem key={index} className="h-full pl-0">
                        <ImageWithFallback
                        src={src}
                        alt={`${artist.name} Gallery ${index + 1}`}
                        className="w-full h-full object-cover opacity-90"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            
            {gallery.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <CarouselPrevious className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                    <CarouselNext className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                </div>
            )}

            {/* Back Button */}
            <div className="absolute bottom-8 left-6 md:left-12 z-20">
                <button 
                    onClick={() => onNavigate('residency')}
                    className="fixed top-[120px] left-6 z-30 md:static md:ml-[5%] flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-normal font-sans">
                        {language === 'th' ? 'กลับสู่ศิลปินพำนัก' : 'Back to Residency'}
                    </span>
                </button>
            </div>
            </Carousel>

         {/* Thumbnails */}
         {gallery.length > 1 && (
             <div className="absolute bottom-8 right-[5%] z-20 flex gap-2">
                {gallery.map((_, index) => (
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
      </div>

      {/* Content Section */}
      <div className="w-full px-[5%] pt-[96px] pb-[0px] md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            
            {/* Left Column - Meta Data */}
            <div className="md:col-span-6 flex flex-col gap-8">
                <div className="flex flex-col gap-0 px-0 md:px-[28px] py-[0px]">
                    <h1 className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {displayName}
                    </h1>
                    <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {language === 'th' ? 'ศิลปินพำนัก' : 'Artist in Residence'}
                    </p>
                    <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {displayPeriod.replace(/–/g, ' - ').replace(/\s+-\s+/g, ' - ')}
                    </p>
                    {currentCredit && (
                        <p className={`text-sm md:text-base font-normal text-gray-500 mt-4 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {currentCredit}
                        </p>
                    )}
                </div>
            </div>

            {/* Right Column - Text Content */}
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
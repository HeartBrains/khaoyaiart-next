'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/utils/languageContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft } from 'lucide-react';
import { useExhibitionBySlug } from '@/lib/useWPData';

interface ExhibitionDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
}

export function ExhibitionDetailPage({ onNavigate, slug }: ExhibitionDetailPageProps) {
  const { language, t } = useLanguage();
  const { data, loading, error } = useExhibitionBySlug(slug ?? '');

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !data) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบนิทรรศการ' : 'Exhibition not found.'}</div>;

  const title = language === 'th' ? (data.title?.th || data.title?.en) : data.title?.en;
  const artist = language === 'th' ? (data.artist?.th || data.artist?.en) : data.artist?.en;
  const curator = language === 'th' ? (data.curator?.th || data.curator?.en) : data.curator?.en;
  const dateDisplay = language === 'th' ? (data.dateDisplay?.th || data.dateDisplay?.en) : data.dateDisplay?.en;
  const content = language === 'th' ? (data.content?.th || data.content?.en) : data.content?.en;
  const galleryImages = data.gallery?.length ? data.gallery : (data.featuredImage ? [data.featuredImage] : []);

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      <div className="w-full relative group">
        {galleryImages.length > 0 ? (
          <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full bg-black" opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-0">
              {galleryImages.map((src, index) => (
                <CarouselItem key={index} className="pl-0">
                  <img src={src} alt={`${title} Gallery ${index + 1}`} className="w-full h-auto block"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">{language === 'th' ? 'ไม่มีรูปภาพ' : 'No images available'}</span>
          </div>
        )}

        {galleryImages.length > 1 && (
          <div className="absolute bottom-8 right-6 md:right-[5%] z-20 flex gap-2">
            {galleryImages.map((_, index) => (
              <button key={index} onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-8 left-6 md:left-12 z-20">
          <button onClick={() => onNavigate('exhibitions')}
            className="relative ml-[5%] flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-normal font-sans whitespace-nowrap">
              {language === 'th' ? 'กลับสู่นิทรรศการ' : 'Back to Exhibitions'}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          <div className="md:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-0 px-0 md:px-[28px] py-[0px]">
              <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{title}</h1>
              {artist && <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{artist}</p>}
              {dateDisplay && <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{dateDisplay}</p>}
              {curator && <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? 'ภัณฑารักษ์: ' : 'Curated by '}{curator}</p>}
              {data.imageCredits && <div className="mt-8 pt-6"><p className="text-gray-500 text-[12px]">{data.imageCredits}</p></div>}
            </div>
          </div>
          <div className={`md:col-start-7 md:col-span-6 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
            {content && <div className="[&>p]:mb-8" dangerouslySetInnerHTML={{ __html: content }} />}
          </div>
        </div>
      </div>
    </div>
  );
}

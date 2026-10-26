'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/bkkk/components/ui/carousel';
import {
  relatedContentHref,
  type RelatedContentItem,
  type RelatedContentType,
} from '@/lib/related-content';

type Language = 'en' | 'th';

const TYPE_LABELS: Record<RelatedContentType, Record<Language, string>> = {
  exhibitions: { en: 'Exhibitions', th: 'นิทรรศการ' },
  activities: { en: 'Activities', th: 'กิจกรรม' },
  'moving-image': { en: 'Moving Image', th: 'ภาพเคลื่อนไหว' },
  artists: { en: 'Artists', th: 'ศิลปิน' },
  blog: { en: 'Blog', th: 'บทความ' },
};

export function RelatedContent({
  items,
  language,
}: {
  items?: RelatedContentItem[];
  language: Language;
}) {
  const grouped = new Map<RelatedContentType, RelatedContentItem[]>();
  for (const item of items ?? []) {
    if (!relatedContentHref(item)) continue;
    const group = grouped.get(item.type) ?? [];
    group.push(item);
    grouped.set(item.type, group);
  }

  if (grouped.size === 0) return null;

  return (
    <section className="mt-16 border-t border-black/10 pt-10" aria-label={language === 'th' ? 'เนื้อหาที่เกี่ยวข้อง' : 'Related content'}>
      <h2 className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
        {language === 'th' ? 'เนื้อหาที่เกี่ยวข้อง' : 'Related content'}
      </h2>
      {[...grouped.entries()].map(([type, records]) => (
        <div key={type} className="mt-8">
          <h3 className={`mb-4 text-base md:text-lg font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
            {TYPE_LABELS[type][language]}
          </h3>
          <Carousel
            className="w-full"
            opts={{ align: 'start', loop: records.length > 2 }}
          >
            <CarouselContent>
            {records.map((item) => {
              const href = relatedContentHref(item);
              if (!href) return null;
              return (
                <CarouselItem
                  key={`${item.site}:${item.type}:${item.id}`}
                  className="basis-[85%] sm:basis-[55%] lg:basis-[45%]"
                >
                  <a
                    href={href}
                    data-related-site={item.site}
                    data-related-type={item.type}
                    className="group block h-full text-black"
                  >
                    {item.image ? (
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title[language] || item.title.en}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <h4 className={`mt-3 text-base md:text-lg font-normal leading-tight group-hover:opacity-60 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {item.title[language] || item.title.en}
                    </h4>
                    {item.date ? (
                      <p className="mt-2 text-sm text-gray-500">{item.date}</p>
                    ) : null}
                  </a>
                </CarouselItem>
              );
            })}
            </CarouselContent>
            {records.length > 1 ? (
              <>
                <CarouselPrevious
                  aria-label={language === 'th' ? 'รายการก่อนหน้า' : 'Previous related items'}
                  className="left-2 top-1/2 z-10 -translate-y-1/2 border-0 bg-white/90 shadow-md hover:bg-white"
                />
                <CarouselNext
                  aria-label={language === 'th' ? 'รายการถัดไป' : 'Next related items'}
                  className="right-2 top-1/2 z-10 -translate-y-1/2 border-0 bg-white/90 shadow-md hover:bg-white"
                />
              </>
            ) : null}
          </Carousel>
        </div>
      ))}
    </section>
  );
}

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
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((item) => {
              const href = relatedContentHref(item);
              if (!href) return null;
              return (
                <a
                  key={`${item.site}:${item.type}:${item.id}`}
                  href={href}
                  data-related-site={item.site}
                  data-related-type={item.type}
                  className="group block text-black"
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
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

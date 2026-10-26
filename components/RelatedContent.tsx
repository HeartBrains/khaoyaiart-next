'use client';

import {
  relatedContentHref,
  type RelatedContentItem,
  type RelatedContentType,
} from '@/lib/related-content';

type Language = 'en' | 'th';

const RELATED_HEADINGS: Record<RelatedContentType, Record<Language, string>> = {
  exhibitions: { en: 'Related Exhibitions', th: 'นิทรรศการที่เกี่ยวข้อง' },
  activities: { en: 'Related Activities', th: 'กิจกรรมที่เกี่ยวข้อง' },
  'moving-image': { en: 'Related Moving Image', th: 'ภาพเคลื่อนไหวที่เกี่ยวข้อง' },
  artists: { en: 'Related Artists', th: 'ศิลปินที่เกี่ยวข้อง' },
  blog: { en: 'Related Blog Posts', th: 'บทความที่เกี่ยวข้อง' },
};

const TYPE_ORDER: RelatedContentType[] = [
  'exhibitions',
  'activities',
  'moving-image',
  'artists',
  'blog',
];

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
  const orderedGroups: Array<[RelatedContentType, RelatedContentItem[]]> = [];
  for (const type of TYPE_ORDER) {
    const records = grouped.get(type);
    if (records?.length) orderedGroups.push([type, records]);
  }

  return (
    <section
      className="mt-16 border-t border-black/10 pt-8"
      aria-label={language === 'th' ? 'เนื้อหาที่เกี่ยวข้อง' : 'Related content'}
    >
      {orderedGroups.map(([type, records], groupIndex) => (
        <div key={type} className={groupIndex > 0 ? 'mt-12' : ''}>
          <h2 className={`mb-6 text-xl font-bold text-black ${language === 'th' ? 'leading-[1.82em]' : 'leading-tight'}`}>
            {RELATED_HEADINGS[type][language]}
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {records.map((item) => {
              const href = relatedContentHref(item);
              if (!href) return null;
              return (
                <a
                  key={`${item.site}:${item.type}:${item.id}`}
                  href={href}
                  data-related-site={item.site}
                  data-related-type={item.type}
                  className="group block min-w-0 text-black"
                >
                  {item.image ? (
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title[language] || item.title.en}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <h3 className={`mt-4 text-base font-bold leading-tight group-hover:opacity-60 md:text-lg ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {item.title[language] || item.title.en}
                  </h3>
                  {item.date ? (
                    <p className="mt-1 text-sm text-gray-500">{item.date}</p>
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

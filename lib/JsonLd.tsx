// Server component — renders JSON-LD script tag for structured data
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Exhibition / Event schema
export function exhibitionJsonLd({
  name,
  description,
  image,
  startDate,
  endDate,
  url,
  location,
  organizer,
}: {
  name: string;
  description?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  url: string;
  location: { name: string; address: string };
  organizer: { name: string; url: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExhibitionEvent',
    name,
    description,
    image,
    startDate,
    endDate,
    url,
    location: {
      '@type': 'Place',
      name: location.name,
      address: location.address,
    },
    organizer: {
      '@type': 'Organization',
      name: organizer.name,
      url: organizer.url,
    },
  };
}

// Organization schema for site-level pages
export function organizationJsonLd({
  name,
  url,
  logo,
  description,
  address,
  sameAs,
}: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    address,
    sameAs,
  };
}

// BreadcrumbList schema
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

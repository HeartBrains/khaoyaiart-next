import { ASSETS } from './assets';
import { WPPost } from './types';

// Helper to create basic mock post
const createMockPost = (slug: string, type: 'exhibition' | 'activity' | 'post', title: string, date: string, image: string, artist?: string): WPPost => ({
    id: slug,
    slug,
    type,
    title,
    date,
    content: `<p>This is a placeholder content for <strong>${title}</strong>. Detailed information about this ${type} is coming soon.</p>`,
    featuredImage: { sourceUrl: image, altText: title },
    acf: { artist, curator: 'Curator Name' },
    gallery: [image]
});

export const MOCK_POSTS: Record<string, WPPost> = {
    // Activities
    'neon-reveries': {
        id: 'activity-1',
        slug: 'neon-reveries',
        type: 'activity',
        title: 'Neon Reveries',
        date: '01 Oct – 01 Nov 2025',
        categories: ['Wong Kar-Wai', 'Screening Series', 'Screenings'],
        content: `<p>This August and September, Khao Yai Art Forest screens four Wong Kar Wai classics on Saturday nights, beginning with 'In the Mood for Love' (2000) on August 22—filmed partly in the Yaowarat neighborhood of the Art Forest. The series continues with 'Happy Together' (1997) on August 23, 'Chungking Express' (1994) on August 30, and 'Fallen Angels' (1995) on September 6. Moving from quiet longing to restless encounters and neon-lit nights, the films capture Wong's unforgettable vision of love, loneliness, and fleeting connection.</p>`,
        featuredImage: {
            sourceUrl: ASSETS.EVENT_HERO,
            altText: 'Neon Reveries'
        },
        gallery: [
            ASSETS.EVENT_HERO,
            "https://images.unsplash.com/photo-1726591466875-8868a42b4e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0JTIwaG9uZyUyMGtvbmclMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzY2MTMxMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1752769479345-36628bb26d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjByZWQlMjBtb29kJTIwbGlnaHRpbmclMjBwb3J0cmFpdCUyMGJsdXJyZWR8ZW58MXx8fHwxNzY2MTMxMzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1604060800795-80a563440fb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b25nJTIwa2FyJTIwd2FpJTIwc3R5bGUlMjBzdHJlZXQlMjByYWluJTIwbmlnaHR8ZW58MXx8fHwxNzY2MTMxMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            "https://images.unsplash.com/photo-1764649841560-eebc51d76dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwc2lnbiUyMGNoaW5lc2UlMjBjaGFyYWN0ZXJzJTIwbmlnaHR8ZW58MXx8fHwxNzY2MTMxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        acf: {
            schedule: [
                { title: "'In the Mood for Love' (2000)", details: "on August 22 19.00 (one round only)" },
                { title: "'Happy Together' (1997)", details: "on August 23 Round 1 at 17.00 Round 2 at 19.00" },
                { title: "'Chungking Express' (1994)", details: "on August 30 Round 1 at 17.00 Round 2 at 19.00" },
                { title: "'Fallen Angels' (1995)", details: "on September 6 Round 1 at 17.00 Round 2 at 19.00" }
            ],
            additionalContent: `We encourage you to arrive at Khao Yai Art Forest 15-30 minutes before the screening begins. Seats not claimed by the start of the film may be released to visitors in the standby line.`
        }
    },
    'liminal-signals': createMockPost('liminal-signals', 'activity', 'Liminal Signals', '21 November 2025', 'https://images.unsplash.com/photo-1747504858849-fde086e3680a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZXhwZXJpbWVudGFsJTIwY2luZW1hJTIwcGVyZm9ybWFuY2UlMjBhcnR8ZW58MXx8fHwxNzY4MDI5MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080', 'Cedric Arnold & Thanapat Ogaslert'),
    'morlam-collective': createMockPost('morlam-collective', 'activity', 'Morlam Collective', '2025', 'https://images.unsplash.com/photo-1677123628739-dea0cfd09fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3JsYW0lMjBDb2xsZWN0aXZlJTIwcGVyZm9ybWFuY2UlMjBhcnQlMjB0cmFkaXRpb25hbCUyMFRoYWklMjBkYW5jZXxlbnwxfHx8fDE3NjgwMzk2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'),
    'living-cinematheque': createMockPost('living-cinematheque', 'activity', 'Living Cinematheque', '2025', 'https://images.unsplash.com/photo-1572689600233-ce64e0d0d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTcGVuY2VyJTIwU3dlZW5leSUyMGFydGlzdCUyMHRhbGslMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4MDM5NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080'),
    'a-very-long-gif': createMockPost('a-very-long-gif', 'activity', 'A Very Long Gif', '2025', 'https://images.unsplash.com/photo-1609167110008-9ded171e95b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBJTIwVmVyeSUyMExvbmclMjBHaWYlMjBFZHVhcmRvJTIwV2lsbGlhbXMlMjB2aWRlbyUyMGFydHxlbnwxfHx8fDE3NjgwMzk2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080'),
    'the-tuss': createMockPost('the-tuss', 'activity', 'The Tuss', '2025', 'https://images.unsplash.com/photo-1746556333642-ba1bd743c8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGUlMjBUdXNzJTIwUnlhbiUyME9nYXNsZXJ0JTIwUnVzaHVwJTIwRWRnZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2ODAzOTY3MHww&ixlib=rb-4.1.0&q=80&w=1080'),
    
    // Exhibitions
    'unwinding-architecture': {
        id: 'exhibition-1',
        slug: 'unwinding-architecture',
        type: 'exhibition',
        title: 'Unwinding Architecture the Poetics of the Snake Nicolas Amato',
        date: '10 Jan - 10 Mar 2025',
        content: `
    <p>The serpent moves across time, across borders. It is a transcultural and transhistorical symbol appearing in diverse mythologies from the frozen landscapes of Russia to the arid expanses of Egypt, from the dense jungles of the Americas to the sacred temples of Thailand. Across millennia, the serpent has persisted as an emblem of ritual, an artifact of ancient epistemologies, and a bridge between the seen and the unseen.</p>
    <p>At Khao Yai Art Forest, this presence moves across floors and across buildings.</p>
    <p>It is not imposed but revealed. The serpent stretches along the banister, winding across four flights of green terrazzo stairs. Nicolas Amato, arriving at the Art Forest on the first day of the Chinese New Year—the Year of the Snake—recognized it embedded within the architecture itself. His intervention does not introduce something foreign; rather, it uncovers what was already there, transforming perception through an act as subtle yet profound as polishing.</p>
    <p>The Art Forest's curatorial program is the architectural intervention, a practice of domesticating the building through art. Amato's work is in perfect dialogue with this dynamic—not an addition, but a revelation, an unveiling of what was always there.</p>
    <p>The act of polishing becomes the intervention itself, not an imposition but an attunement, blurring the boundaries between art and architecture. The decision to polish the terrazzo rather than mark or alter it ensures that the intervention does not announce itself as a discrete artwork but instead dissolves into the materiality of the space. The act of refinement—of rendering the surface luminous—becomes the artistic gesture itself, reinforcing the conceptual and physical integration of the work within the architecture.</p>
    <p>The snake of green polished terrazzo inhabits the in-between spaces.</p>
    <p>Like an emerald entangled in the derelict building, it stretches across floors, piercing through the building, a silent guide toward the roof. It traverses thresholds, operating both spatially and metaphorically. More than a decorative motif, it acts as a structural force, shaping the movement through the building. It is more than moving through the floors, it is about dwelling the liminal spaces.</p>
  `,
        featuredImage: {
            sourceUrl: ASSETS.BLOG_6,
            altText: 'Unwinding Architecture'
        },
        acf: { curator: 'Curator Name', artist: 'Nicolas Amato' }
    },
    'description-without-place': createMockPost('description-without-place', 'exhibition', 'Description Without Place', '13 December 2025 – 31 May 2026', 'https://images.unsplash.com/photo-1747100934541-22fd3a57fea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1pbmltYWwlMjBpbnN0YWxsYXRpb24lMjBhcnQlMjBhYnN0cmFjdCUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjgwMjkwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Absalon'),
    'vernacular-objects': createMockPost('vernacular-objects', 'exhibition', 'Vernacular Objects', '27 November 2025 – 15 March 2026', 'https://images.unsplash.com/photo-1766792235402-2496867ea9e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBhYnN0cmFjdCUyMGNvbnRlbXBvcmFyeSUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NjgwMjkwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Mark Chearavanont'),
    'mitta-del-santi': createMockPost('mitta-del-santi', 'exhibition', 'Mitta del Santi', '26 September 2025 – 8 February 2026', 'https://images.unsplash.com/photo-1574240635388-2a6bdc8d3c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGxhcmdlJTIwdGV4dGlsZSUyMGFydCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NjgwMjkwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080', 'Ploenchun Vinyaratn'),
    'seeds': createMockPost('seeds', 'exhibition', 'seeds', '30 April – 22 June 2026', 'https://images.unsplash.com/photo-1611923973164-e0e5f7f69872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGhvbGRpbmclMjB3aGl0ZSUyMGNlcmFtaWMlMjBiYWxscyUyMGFydHxlbnwxfHx8fDE3NjgwMzkxODd8MA&ixlib=rb-4.1.0&q=80&w=1080'),
    'we-gather': createMockPost('we-gather', 'exhibition', 'we gather', '28 February – 27 April 2026', 'https://images.unsplash.com/photo-1747504858849-fde086e3680a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2luZW1hJTIwcm9vbSUyMHNjcmVlbmluZyUyMHZpZGVvJTIwYXJ0fGVufDF8fHx8MTc2ODAzOTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080'),
    'shapeshifting-spaces': createMockPost('shapeshifting-spaces', 'exhibition', 'Shapeshifting Spaces', '17 January – 27 February 2026', 'https://images.unsplash.com/photo-1761655072443-9dec151c3e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGFydCUyMGluc3RhbGxhdGlvbiUyMHllbGxvdyUyMHRhYmxlJTIwaGFuZHN8ZW58MXx8fHwxNzY4MDM5MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080'),

    // Blog
    'art-as-reflection': {
        id: 'post-1',
        slug: 'art-as-reflection',
        type: 'post',
        title: 'Art as a Reflection of Society',
        date: '01 December 2025',
        categories: ['Contemporary Art', 'Culture', 'Insights'],
        content: `
    <p>Art has always served as a mirror to society, reflecting its triumphs, struggles, and evolving identity. In the contemporary landscape, this relationship has become even more intricate. Artists are not merely observers but active participants in the cultural dialogue, challenging norms and envisioning new futures.</p>
    <p>The role of public institutions like the Khao Yai Art Forest is to facilitate this conversation. By providing a space where diverse voices can be heard, we foster a community that values creativity and critical thinking. Our upcoming exhibitions aim to explore these themes deeply, inviting visitors to engage with art that speaks directly to the human condition in the 21st century.</p>
  `,
        featuredImage: {
            sourceUrl: ASSETS.BLOG_1,
            altText: 'Blog Detail Hero'
        },
        acf: {
            keyThemes: [
                { title: "Identity & Belonging", desc: "Exploring how personal and collective identities are shaped in a globalized world." },
                { title: "Urban Transformation", desc: "Documenting the changing face of our cities and the impact on local communities." },
                { title: "Digital Horizons", desc: "Investigating the intersection of technology and traditional artistic practices." }
            ]
        }
    },
    'future-visions': createMockPost('future-visions', 'post', 'Future Visions', '15 January 2026', ASSETS.BLOG_1),
    'evolution-of-light': createMockPost('evolution-of-light', 'post', 'The Evolution of Light Installations', '15 November 2025', ASSETS.BLOG_2),
    'digital-frontiers': createMockPost('digital-frontiers', 'post', 'Digital Frontiers in Art', '20 October 2025', ASSETS.BLOG_3),
    'sustainable-sculpture': createMockPost('sustainable-sculpture', 'post', 'Sustainable Sculpture', '05 September 2025', ASSETS.BLOG_4),
    'shadows-and-silhouettes': createMockPost('shadows-and-silhouettes', 'post', 'Shadows and Silhouettes', '15 December 2024', ASSETS.BLOG_3),
    'neon-cities': createMockPost('neon-cities', 'post', 'Neon Cities: Urban Aesthetics', '10 November 2024', ASSETS.BLOG_4),
    'abstract-expressionism': createMockPost('abstract-expressionism', 'post', 'Abstract Expressionism Today', '22 September 2024', ASSETS.BLOG_5),
    'minimalist-architecture': createMockPost('minimalist-architecture', 'post', 'Minimalist Architecture', '14 August 2024', ASSETS.BLOG_6),
    'sound-of-art': createMockPost('sound-of-art', 'post', 'The Sound of Art', '30 June 2024', ASSETS.BLOG_1),
    'traditional-dance': createMockPost('traditional-dance', 'post', 'Traditional Dance in Modern Times', '05 December 2023', ASSETS.BLOG_5),
    'ceramics-and-culture': createMockPost('ceramics-and-culture', 'post', 'Ceramics and Culture', '12 October 2023', ASSETS.BLOG_2),
    'street-art': createMockPost('street-art', 'post', 'Street Art Revolution', '18 August 2023', ASSETS.BLOG_3),
    'textile-narratives': createMockPost('textile-narratives', 'post', 'Textile Narratives', '05 June 2023', ASSETS.BLOG_4),
    'performance-art-retro': createMockPost('performance-art-retro', 'post', 'Performance Art Retrospective', '22 April 2023', ASSETS.BLOG_6),
    'industrial-spaces': createMockPost('industrial-spaces', 'post', 'Industrial Spaces Reimagined', '01 December 2022', ASSETS.BLOG_6),
    'photography-digital': createMockPost('photography-digital', 'post', 'Photography in the Digital Age', '15 October 2022', ASSETS.BLOG_1),
    'installation-basics': createMockPost('installation-basics', 'post', 'Installation Art Basics', '20 August 2022', ASSETS.BLOG_2),
    'color-theory': createMockPost('color-theory', 'post', 'Color Theory in Practice', '10 June 2022', ASSETS.BLOG_3),
    'origins-bauhaus': createMockPost('origins-bauhaus', 'post', 'The Origins of Bauhaus', '12 December 2021', ASSETS.BLOG_4),
    'art-deco-revival': createMockPost('art-deco-revival', 'post', 'Art Deco Revival', '05 October 2021', ASSETS.BLOG_5),
};

// Keep exports for backward compatibility if needed, though mostly using lookup now
export const MOCK_ACTIVITY = MOCK_POSTS['neon-reveries'];
export const MOCK_EXHIBITION = MOCK_POSTS['unwinding-architecture'];
export const MOCK_POST = MOCK_POSTS['art-as-reflection'];

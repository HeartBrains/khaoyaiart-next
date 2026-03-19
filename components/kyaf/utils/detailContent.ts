/**
 * Detail Content - English
 * Long-form content separated from metadata
 * Following DETAIL_CONTENT_ARCHITECTURE.md patterns
 */

import { DETAIL_CONTENT_THAI } from './detailContentThaiData';

/**
 * Detail Content Interface
 */
export interface DetailContent {
  slug: string;
  category: 'Exhibition' | 'Activity' | 'Residency';
  content: string;
}

/**
 * Detail Content Array
 * Organized by category: Exhibitions → Activities → Residencies
 */
export const DETAIL_CONTENT: DetailContent[] = [
  // ══════════════════════════════════════════════════════════
  // EXHIBITIONS
  // ══════════════════════════════════════════════════════════
  {
    slug: 'madrid-circle',
    category: 'Exhibition',
    content: `
      <p>Richard Long's "Madrid Circle" (1988) is situated within Khao Yai Art Forest as a work that foregrounds the relationship between artistic gesture, landscape, and temporal experience. Installed at the highest point of the site, the work establishes a dialogue between human intervention and the natural environment, operating simultaneously as a spatial marker and a framework for perception.</p>
      
      <p>As a pioneering figure of Land Art, Richard Long has consistently explored walking as both a sculptural act and a method of engaging with the world. His practice is grounded in minimal means, often employing basic geometric forms and materials gathered directly from the landscapes he traversed. In Khao Yai Art Forest, "Madrid Circle" exemplifies this approach by articulating presence without monumentality and structure without imposition.</p>
      
      <p>The work consists of a circular arrangement of slate stones laid directly onto the ground. The circle is a recurring form in Long's practice, functioning as an organizing device rather than a symbolic image in a conventional sense. It introduces order into the landscape while remaining visually and materially integrated with its surroundings. In Khao Yai, the clarity of the geometric form contrasts with the density and irregularity of the forest, emphasizing the tension between human intention and natural processes without attempting to resolve it.</p>
      
      <p>Access to the work requires sustained physical effort. Visitors must walk several kilometers uphill through uneven terrain in order to reach the site. This journey is not ancillary to the work but integral to its meaning. Long has repeatedly described walking as both medium and outcome, a position encapsulated in his statement from 2000: "My intention was to make a new art which was also a new way of walking: walking as art." In Khao Yai, the experience of walking situates the body within the temporal scale of the forest, foregrounding duration, distance, and attention.</p>
      
      <p>Within the cultural context of Thailand, this emphasis on walking acquires additional layers of interpretation. The act of moving slowly through the landscape resonates with practices of walking meditation embedded within Buddhist traditions. While Long's work does not explicitly reference religious frameworks, its reception within Khao Yai is inevitably shaped by the cultural conditions of the site. The circle is thus read not only as a formal structure but also as a space of rest, reflection, and collective presence.</p>
      
      <p>In this context, "Madrid Circle" operates as a site of mediation rather than representation. It does not symbolize, depict, or idealize nature. Instead, it establishes conditions under which visitors encounter landscape, time, and one another differently. Through minimal means and sustained duration, the work affirms art as a practice embedded within natural systems and social processes, remaining responsive to both rather than standing apart from them.</p>
    `
  },
  {
    slug: 'maman',
    category: 'Exhibition',
    content: `
      <p>"Maman" (1999), a pivotal work from Louise Bourgeois's series of spider sculptures, is a meditation on motherhood, memory, vulnerability, and care. Conceived as an homage to the artist's mother, it holds together seemingly contradictory ideas, strength and fragility, protection and threat, endurance and exposure, within a single monumental form.</p>
      
      <p>Installed within Khao Yai Art Forest, "Maman" enters into a living relationship with its environment, allowing its symbolic language to be reactivated through direct engagement with the forest.</p>
      
      <p>The title "Maman," the French word for "mama" or "mommy," refers to Joséphine Fauriaux, Bourgeois's mother, a weaver and restorer of tapestries. Bourgeois described her as intelligent, patient, and quietly authoritative. Her attentive labor shaped the artist's early understanding of care as strength. The spider, a spinner of webs, becomes a metaphor for this maternal figure: industrious, vigilant, and capable of holding complex structures together through repetition and attention. Bourgeois described her mother as "deliberate, clever, patient, soothing, reasonable, dainty, subtle, indispensable, neat, and useful as a spider," grounding the sculpture's symbolism in lived experience.</p>
      
      <p>The spider is an ambivalent figure. It appears simultaneously as maternal presence and predator, as shelter and mechanism of capture, both nest and prison. This tension is central to Bourgeois's exploration of familial relationships, where care and domination, intimacy and threat, protection and control coexist. "Maman" does not idealize motherhood but exposes its emotional complexity, acknowledging that nurture carries vulnerability.</p>
      
      <p>Placed at the edge of the forest rather than within a gallery, the sculpture undergoes a perceptual shift. Its towering legs, often uncanny in urban settings, resemble organic extensions rising from the ground and interlacing with surrounding teak canopies.</p>
      
      <p>In this setting, "Maman" assumes a sentinel-like presence. Visitors encounter it through movement across uneven terrain, shifting light, and changing weather. The experience unfolds over time, aligning the sculpture with the rhythms of growth and decay that define the forest.</p>
      
      <p>During the installation, birds built nests among the white marble eggs suspended beneath the spider's body. This unplanned gesture transformed the work from representation into a site of actual shelter.</p>
      
      <p>The sculpture's materials reinforce these meanings. Bronze and stainless steel suggest durability, while the marble eggs evoke fragility. Together they embody Bourgeois's central tension between care and vulnerability.</p>
      
      <p>In parallel with the installation between August 2024 to 2025, the surrounding land was transformed into cultivated rice fields through regenerative agricultural projects developed with Khon Kaen University, extending the sculpture's themes of nurture, care, and interdependence into ecological practice.</p>
    `
  },
  {
    slug: 'khao-yai-fog-forrest',
    category: 'Exhibition',
    content: `
      <p>Fujiko Nakaya's fog sculptures exemplify a paradigm shift in the relationship between art and nature, representing what could be called a form of "Land Art 2.0." Unlike traditional Land Art, which often imposes geometric forms onto the natural context, Nakaya's work reveals latent forces within nature itself, acting as a medium through which environmental dynamics become perceptible.</p>
      
      <p>Her fog installations do not merely occupy space; they articulate the interplay of wind, temperature, humidity, and pressure. Fog becomes a diagram of unseen environmental processes, rendering invisible forces visible. By immersing viewers in the fog, the installations elicit a visceral awareness of natural rhythms and foster a reconnection with the Earth within everyday life.</p>
      
      <p>First realized in 1970 for the Pepsi Pavilion at the Osaka Expo, Nakaya's fog sculptures explored the idea of open art, free from technological domination and artistic self-consciousness. They invite a direct relationship between humans and nature, relying on pure water and embracing environmental forces rather than resisting them. This collaboration between human intervention and natural phenomena reflects an approach to art that prioritizes dialogue rather than imposition.</p>
      
      <p>Nakaya's fog is not a static object or a traditional sculpture but a living, dynamic environment that evolves continuously. As artificial fog drifts, dissipates, and reforms, familiar landscapes transform into ephemeral, immersive worlds. This transient quality softens boundaries between the self and the environment, allowing participants to experience nature as an interconnected system.</p>
      
      <p>In "Khao Yai Fog Forest" (2024), her largest permanent installation, Nakaya modeled an entire hillside to choreograph the fog. Precise interventions include shaping terrain, planting trees to create turbulence, and introducing gentle hills to influence air currents. The landscape was designed by the MET team architects, formerly Atsushi Kitagawara Architects, led by long-term collaborator Angel Estevez. These interventions follow meticulous on-site studies.</p>
      
      <p>Nakaya's fog sculptures redefine landscape as a dynamic timescape where the contours of land shape the passage of time. Fog itself is temporal, emerging when humidity reaches a threshold and disappearing when conditions shift. By shaping terrain to delay its dissipation, the landscape becomes a system that holds fleeting moments, slowing time and revealing natural processes.</p>
      
      <p>Interacting with Nakaya's fog is an embodied experience beyond the visual. In the fog forest, the loss of spatial orientation encourages reliance on tactile and sensory perception. Children play, animals wander, and adults navigate the white mass, rediscovering a multisensory connection often dulled in daily life.</p>
      
      <p>Artificial fog produced through micro-droplet nozzles is compositionally identical to natural fog, allowing it to integrate seamlessly into the environment. The fog becomes a site where relationships between humans and nature, artificial and natural, object and event, interior and exterior are suspended, inviting a renewed relationship with the world.</p>
    `
  },
  {
    slug: 'k-bar',
    category: 'Exhibition',
    content: `
      <p>"K-BAR" (2024) is a site-specific installation situated at the heart of Khao Yai Art Forest, by Elmgreen & Dragset, the Scandinavian artist duo based in Berlin. Echoing their seminal project "Prada Marfa" (2005), which famously inserted a luxury boutique into the Texan desert, "K-BAR" can be understood as the artists' interpretation of Land Art. Central to both works is the strategy of displacement: the deliberate insertion of an architectural and social typology associated with urban life into a remote landscape.</p>
      
      <p>Conceived as a tribute to the late German artist Martin Kippenberger, who died in 1997 and whose life was marked by a well-known predilection for alcohol, "K-BAR" takes the form of an intimate pavilion designed to seat only six guests at a time. However, the bar is open only on the second Saturday of each month. Inside, an original Kippenberger painting from 1996 is permanently installed next to the entrance, visible—along with the meticulously designed interior—through the glass door even when the bar is closed.</p>
      
      <p>For most visitors, "K-BAR" is encountered not as a functioning bar but as a sculptural object. In its closed state, the pavilion assumes a mirage-like quality: a fully recognizable bar that nonetheless withholds the social function its form promises. The transparency of the glass door allows a clear view inside, yet this visibility intensifies the sense of distance rather than resolving it. "K-BAR" oscillates between invitation and refusal, presence and inaccessibility, transforming an architecture of hospitality into an object of contemplation.</p>
      
      <p>Inside, "K-BAR" draws on the visual language of metropolitan bars: backlit shelves,a custom stainless-steel and dark-wood counter, red leather stools, and terrazzo flooring. Once a month at dusk, guests traverse the dark forest to reach the softly illuminated pavilion, where they are served cocktails developed by Elmgreen & Dragset in collaboration with a local mixologist, including the aptly named "Dry Martin".</p>
      
      <p>The placement of a Kippenberger painting within the rural context of Khao Yai resonates with the artist's own efforts to challenge conventional modes of exhibition—an approach that has had a lasting influence on Elmgreen & Dragset. At the same time, the work subtly reframes contemporary debates around the restitution of looted art. By situating a significant European artwork in a rural context in Southeast Asia, "K-BAR" proposes an inversion of the discussion: what if European institutions were asked to send some of their local masterpieces abroad in exchange for the objects they once extracted?</p>
      
      <p>More broadly, "K-BAR" operates through a series of radical inversions. Rather than celebrating its natural setting or any romantic perception of nature, the work stages an oasis of metropolitan life in the midst of the forest.</p>
    `
  },
  {
    slug: 'god',
    category: 'Exhibition',
    content: `
      <p>Installed within the teak forest of Khao Yai Art Forest, "GOD" (2024) unfolds as a work of radical restraint and concentrated density. Monumental in presence yet intimate in meaning, the sculpture operates at the intersection of material weight and metaphysical language, engaging spirituality not as image or doctrine, but as an unresolved physical tension. "GOD" is both an object to be deciphered and a prayer to be recited and reenacted—physically, intellectually, and ethically.</p>
      
      <p>The work resonates with the cultural context of Thailand, where spirituality and nature are often understood as inseparable. Without invoking specific iconographies or belief systems, "GOD" approaches this worldview through humility and restraint. It does not speak the language of any single faith; instead it stages belief as a universal human condition suspended between longing and unknowing.</p>
      
      <p>Arena's practice is grounded in an inquiry into history, memory, and the politics of form. His sculptures frequently transform language into vessels of time, allowing matter to register what resists explanation. In Khao Yai this approach finds a resonant context. Rather than imposing a symbolic structure onto the landscape, "GOD" enters into a silent dialogue with it, allowing the forest to frame and temper the work's presence.</p>
      
      <p>"GOD" was the first work installed on site, carrying an inaugural significance for Khao Yai Art Forest. After a prolonged search, two massive stones were located in the region of Kanchanaburi. During their removal, workers performed a small offering to the forest, acknowledging that if something is taken from the land something must be given in return. This symbolic exchange continues to resonate within the sculpture, embedding it within a logic of reciprocity rather than extraction.</p>
      
      <p>The sculpture consists of two massive stones stacked vertically, forming a compact monolith. Each stone is carved with letters: one bearing "G" and "D," the other "O." Only when the stones are joined is the word "GOD" completed, and at that moment it disappears from view. Language collapses into matter and meaning is sealed within mass. The divine, traditionally named and invoked, is rendered invisible and withheld from representation.</p>
      
      <p>Approaching the work requires a bodily negotiation with the site. The crunch of dry leaves underfoot gives way to silence as the visitor halts before the sculpture. This quietness, intensified by the density of the forest, creates a threshold that suspends movement and thought. "GOD" confronts the visitor with the weight of belief, doubt, or indifference. Meaning no longer resides in the object but is displaced onto the encounter itself.</p>
      
      <p>Although monumental, the sculpture avoids the rhetoric of domination often associated with scale. Its proportions remain modest within the teak forest, yet its mass generates a quiet gravity. Light and shadow continually redraw the work across the day, binding it to the rhythms of the forest. Visitors are encouraged to place their hands on the stone, registering its temperature, texture, and resistance. Faith becomes tactile; mystery acquires weight.</p>
    `
  },
  {
    slug: 'pilgrimage-to-eternity',
    category: 'Exhibition',
    content: `
      <p>"Pilgrimage to Eternity" (2024), created by Thai artist ubatsat, is conceived within the framework of Land Art 2.0—a practice that moves away from monumentality and the domination of the landscape toward modes of attunement, care, and co-existence. Rather than treating the land as a surface to be inscribed or transformed through force, the work understands ubatsat and the forest as active collaborators. Rooted in Buddhist philosophy and embedded within the ecology of Khao Yai Art Forest, the installation unfolds as both a spatial journey and a meditation on impermanence, transformation, and interdependence.</p>
      
      <p>The project originates from the highly specialized and increasingly rare tradition of stupa construction. Instead of reproducing it as a finished architectural object, ubatsat approaches this lineage conceptually, reworking its language to respond to time, ritual, and ecological entanglement. The work establishes a dialogue between Buddhist notions of "anicca" (impermanence), the temporality of human labor, and the slow, generative rhythms of nature.</p>
      
      <p>Trained as both an artisan and a monk, ubatsat is deeply grounded in the cultural and spiritual heritage of Thai Buddhism. His practice reflects a sustained commitment to honoring this legacy while allowing it to evolve in response to present ecological realities. By deconstructing the canonical form of the stupa, he resists the logic of permanence and completion traditionally associated with sacred architecture. Instead, continuity is redefined as a process—one that remains open, vulnerable, and responsive to environmental change.</p>
      
      <p>"Pilgrimage to Eternity" comprises nine sculptural elements dispersed throughout the forest. Each sculpture is produced using molds traditionally employed in stupa construction—tools usually considered provisional, hidden, and instrumental. ubatsat reclaims these molds as autonomous sculptural forms, shifting attention from the finished monument to the conditions of making. This gesture displaces authorship from the heroic act of construction toward a quieter, process-based understanding of form, where what is normally invisible becomes the primary site of meaning.</p>
      
      <p>The spatial distribution of the nine sculptures invites visitors to undertake a pilgrimage through the forest. Movement becomes essential to the work: walking, pausing, and orienting oneself within the landscape are integral to its experience. Collectively, the sculptures form a fragmented yet coherent structure—a deconstructed stupa—reimagined as a field rather than a monument. Meaning emerges through duration and traversal, not through visual dominance.</p>
      
      <p>As the installation remains in situ, the sculptures enter a condition of continual becoming. Subject to rain, heat, humidity, vegetal growth, and decay, they are gradually absorbed into the forest's rhythms. This transformation is not conceived as loss, but as practice: a material meditation on "anicca", in which form is understood as provisional and relational. Here, impermanence is not represented symbolically but enacted, allowing the forest itself to participate in the unfolding of the work as an expression of dependent co-arising.</p>
    `
  },
  {
    slug: 'pulsus-vitae',
    category: 'Exhibition',
    content: `
      <p>The pulse of life is the resonance of a tree with a human heartbeat.</p>
      
      <p>The vibratory sound can only be heard and felt by placing the ear or the body against the trunk. It generates sensory, organic and soothing relationships between the tree and the body.</p>
      
      <p>The tree is a symbol of the body, through its cover and its flesh. The bark is the skin of the tree as the body, and it is a surface of appearance, both protective and fragile. By exploring its sinuous prints, it invites to feel its intimacy, as a mirror of our own body.</p>
      
      <p>Scenocosme overturns various technologies in order to create interactive installations which evolve thanks to bodily and social relations of the audience. Their works came from possible hybridizations between the technology and living world, which meeting points incite them to invent sensitive and poetic languages.</p>
    `
  },
  {
    slug: 'two-planets-series',
    category: 'Exhibition',
    content: `
      <p>"Two Planets Series" (2007 - 2008) by Araya Rasdjarmrearnsook offers one of the clearest articulations of the artist's poetics. More than a work about cultural difference or exchange, it crystallizes a recurring intuition in her practice: art is a confidence addressed to an impossible interlocutor. The more intimate and vulnerable the message, the less likely it is to be fully received or reciprocated. Communication in Rasdjarmrearnsook's work is never guaranteed. It remains exposed, asymmetrical, and unresolved.</p>
      
      <p>In the series, Rasdjarmrearnsook juxtaposes two apparently incompatible worlds: rural Thai villagers and canonical works of Western art. Reproductions of nineteenth-century European paintings are presented within rural settings, while the artist records the villagers' spontaneous reactions.</p>
      
      <p>A bamboo forest becomes the backdrop for Manet's Le Déjeuner sur l'herbe (1863) in one scene and for Renoir's Bal du moulin de la Galette (1876) in another. Millet's Des glaneuses (1857) is installed along a riverbank beside tall grass, while Van Gogh's La méridienne (1889–1890) stands before a cultivated field. Villagers gather, talk, and laugh. One person remarks that the grass in "Des glaneuses" appears dead; another suggests it is wheat. Someone comments on the apparent laziness of Van Gogh's figures. The group laughs. These exchanges remain casual and unguarded, yet they do not produce shared meaning. Instead, they reveal gaps and divergent systems of value.</p>
      
      <p>The dialogue between East and West follows the same trajectory as Rasdjarmrearnsook's other conversations: it is structurally impossible. The villagers do not interpret the paintings through art-historical conventions. Their responses emerge from local knowledge and everyday experience. Misrecognition is not a failure but the condition of the encounter.</p>
      
      <p>Rather than attempting to bridge cultural distance, the work invites viewers to contemplate it. Cultural difference is not something to be harmonized. "Two Planets Series" proposes an ethics grounded in respect for difference rather than equivalence or translation.</p>
      
      <p>The series also departs from pedagogical models of cross-cultural art. It neither explains Western art nor presents villagers as symbols of authenticity. The paintings are displaced from museums and reintroduced as images among others, available to be misunderstood or re-signified.</p>
      
      <p>Crucially, the work suggests that artworks remain alive through encounter rather than correct interpretation. Meaning does not reside inside the object; it emerges in relation to others. The villagers' conversations reanimate these paintings while their canonical authority recedes.</p>
      
      <p>Installed within Khao Yai Art Forest, the work gains another layer. Visitors encounter the video within a forest clearing while moving through the landscape, occupying a position similar to that of the villagers. In this context, "Two Planets Series" reflects on the conditions under which art speaks at all. Communication remains partial, yet this instability keeps the work alive by allowing it to be continually reactivated by new encounters.</p>
    `
  },
  
  // ══════════════════════════════════════════════════════════
  // ACTIVITIES
  // ══════════════════════════════════════════════════════════
  {
    slug: 'k-bar-experience',
    category: 'Activity',
    content: `
      <p>The K-BAR Experience is an ongoing program that combines contemporary art with culinary innovation. This unique dining experience takes place in a specially designed space within the Art Forest, where food becomes a medium for artistic expression and cultural exchange.</p>
      
      <p>Each menu is carefully curated to reflect seasonal ingredients from the local area, prepared using both traditional Thai techniques and contemporary culinary approaches. The dining environment integrates artworks, creating an immersive experience that engages all the senses.</p>
      
      <p>K-BAR serves as a social space where visitors can gather, share meals, and engage in conversation about art, nature, and culture. The program regularly hosts special events, including artist talks, workshops, and collaborative dinners that bring together the local community and international visitors.</p>
      
      <p>This initiative reflects Khao Yai Art Forest's commitment to creating accessible entry points for engaging with contemporary art. By combining food and art, K-BAR demonstrates that aesthetic experiences can be integrated into everyday life.</p>
    `
  },
  {
    slug: 'forest-meditation',
    category: 'Activity',
    content: `
      <p>Forest Meditation is a regular program offering guided meditation sessions in the natural setting of Khao Yai's forest. Led by experienced practitioners, these sessions help participants develop mindfulness and deepen their connection with the natural environment.</p>
      
      <p>The practice combines traditional Buddhist meditation techniques with contemporary approaches to nature-based wellness. Sessions are held at various locations throughout the forest, each chosen for its particular qualities of light, sound, and atmosphere.</p>
      
      <p>Participants learn techniques for quiet observation, breath awareness, and sensory engagement with their surroundings. The program is open to all levels of experience, from complete beginners to advanced practitioners.</p>
      
      <p>Forest Meditation exemplifies the Art Forest's holistic approach to art and ecology, recognizing that creative and contemplative practices can work together to foster environmental awareness and personal well-being.</p>
    `
  },
  {
    slug: 'artist-workshops',
    category: 'Activity',
    content: `
      <p>Our Artist Workshops program offers hands-on learning experiences led by visiting and resident artists. These workshops cover a range of practices including drawing, sculpture, performance, photography, and environmental art-making.</p>
      
      <p>Workshops are designed for participants of all skill levels and backgrounds. They provide opportunities to learn new techniques, experiment with materials, and develop creative practices in dialogue with the forest environment.</p>
      
      <p>Past workshops have included nature drawing sessions, land art creation, sound recording and composition, and botanical documentation. Each workshop is tailored to the specific expertise of the teaching artist and the unique conditions of the season.</p>
      
      <p>The program aims to make contemporary art practices accessible and engaging while fostering environmental awareness and creative community-building.</p>
    `
  },
  {
    slug: 'nature-photography-walks',
    category: 'Activity',
    content: `
      <p>Nature Photography Walks are guided excursions through the Art Forest designed to help participants develop their photographic skills while deepening their observation of the natural environment. Led by professional photographers and naturalists, these walks combine technical instruction with ecological education.</p>
      
      <p>Participants learn to see the forest through the camera lens, discovering compositions in the interplay of light, shadow, texture, and form. The walks take place at different times of day to capture varying light conditions, from the soft glow of dawn to the golden hour before sunset.</p>
      
      <p>Beyond technical skills, the program emphasizes ethical photography practices that respect wildlife and minimize environmental impact. Participants are encouraged to develop a patient, contemplative approach to photography that prioritizes observation over aggressive image-making.</p>
    `
  },
  {
    slug: 'seasonal-festivals',
    category: 'Activity',
    content: `
      <p>Seasonal Festivals celebrate the changing rhythms of the forest throughout the year. These special events mark significant moments in the natural calendar, from the flowering seasons to the monsoon rains, creating opportunities for community gathering and cultural celebration.</p>
      
      <p>Each festival includes performances, workshops, exhibitions, and communal meals that reflect the character of the season. Local artists, musicians, and cultural practitioners collaborate to create programming that honors both traditional Thai culture and contemporary artistic practices.</p>
      
      <p>The festivals serve as anchor points in the Art Forest's calendar, bringing together diverse audiences and creating memorable experiences that connect art, nature, and community. They demonstrate how cultural programming can respond to and celebrate environmental cycles.</p>
    `
  },
  
  // ══════════════════════════════════════════════════════════
  // RESIDENCIES
  // ══════════════════════════════════════════════════════════
  // Data removed - structure kept for future use
];

/**
 * Helper function to get detail content by language
 * @param slug - The content slug
 * @param language - 'en' or 'th'
 * @returns The detail content HTML string or null if not found
 */
export function getDetailContentByLanguage(slug: string, language: 'en' | 'th'): string | null {
  if (language === 'th') {
    const thaiContent = DETAIL_CONTENT_THAI.find(item => item.slug === slug);
    return thaiContent?.content || null;
  }
  
  const englishContent = DETAIL_CONTENT.find(item => item.slug === slug);
  return englishContent?.content || null;
}

/**
 * Helper function to get detail content by slug (English only - for backward compatibility)
 * @deprecated Use getDetailContentByLanguage instead
 */
export function getDetailContent(slug: string): string | null {
  return getDetailContentByLanguage(slug, 'en');
}
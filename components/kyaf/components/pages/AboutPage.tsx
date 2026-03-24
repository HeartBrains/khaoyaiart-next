'use client';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import { useEffect, useRef, useState } from 'react';

import { useCovers } from '@/lib/coversContext';
import { useLanguage } from '@/utils/languageContext';

import { ABOUT_HERO_IMAGE } from '@/utils/imageConstants';

export type AboutPageType = 'about' | 'vision' | 'history';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  activePage?: AboutPageType;
}

export function AboutPage({ onNavigate, activePage = 'about' }: AboutPageProps) {
  const { language } = useLanguage();
  const covers = useCovers();
  const didScroll = useRef(false);
  const [activeSection, setActiveSection] = useState<string>(activePage === 'history' ? 'history' : 'about');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (didScroll.current) return;
    didScroll.current = true;
    const id = activePage === 'history' ? 'history' : 'about';
    setTimeout(() => scrollTo(id), 100);
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'history'];
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentEN = [
    `Khao Yai Art Forest is a new paradigm of institution whose name "Art Forest" reflects the institution's ambition: advancing, supporting, and realizing visionary proposals of artists in the natural environment.`,
    `Khao Yai Art Forest enables artists to realize visionary projects within nature that may be unattainable due to scale or scope. It achieves this through commissioning single-artist projects, organizing exhibitions, creating site-specific installations, and collecting the work of Thai and international artists focusing on healing nature. To heal is to recover. Beyond the practice of well-being and more than the already established mindfulness activities in nature, Khao Yai Art Forest recovers the lost possibilities, complexities, and vitalities of nature through the art of living, making, practicing, and thinking, not about but with nature.`,
    `From its inception, Khao Yai Art Forest has shown a commitment to following and supporting artists' ideas that contribute to challenging and enriching the relationship with Nature. Through the Research and Public Activities such as gastronomies, workshops, and symposiums, we share values, alter perspectives, and learn and unlearn together. Knowledge is exchanged across a wide range of ages, backgrounds, intellectual interests, disciplines, and nationalities in this transversal milieu.`,
    `Since its establishment, Art Forest has been transforming the Khao Yai area into a vibrant arts destination for visitors from the region and internationally.`
  ];

  const contentTH = [
    `เขาใหญ่ อาร์ตฟอเรสต์ คือกระบวนทัศน์ใหม่ของสถาบันที่ชื่อว่า "อาร์ตฟอเรสต์" สะท้อนถึงความมุ่งมั่นของสถาบันในการผลักดัน สนับสนุน และทำให้ข้อเสนอที่มีวิสัยทัศน์ของศิลปินในสภาพแวดล้อมทางธรรมชาติเป็นจริง`,
    `เขาใหญ่ อาร์ตฟอเรสต์ ช่วยให้ศิลปินสามารถดำเนินโครงการที่มีวิสัยทัศน์ท่ามกลางธรรมชาติ ซึ่งอาจทำได้ยากเนื่องจากขนาดหรือขอบเขต โดยทำผ่านการว่าจ้างโครงการศิลปินเดี่ยว การจัดนิทรรศการ การสร้างสรรค์ผลงานศิลปะจัดวางเฉพาะพื้นที่ และการสะสมผลงานของศิลปินไทยและนานาชาติที่มุ่งเน้นการเยียวยาธรรมชาติ การเยียวยาคือการฟื้นฟู นอกเหนือจากการฝึกฝนเพื่อสุขภาวะและกิจกรรมการเจริญสติในธรรมชาติที่มีอยู่แล้ว เขาใหญ่ อาร์ตฟอเรสต์ ฟื้นฟูความเป็นไปได้ ความซับซ้อน และพลังชีวิตที่สูญหายไปของธรรมชาติ ผ่านศิลปะแห่งการใช้ชีวิต การสร้างสรรค์ การฝึกฝน และการคิด ไม่ใช่เกี่ยวกับธรรมชาติ แต่ร่วมกับธรรมชาติ`,
    `นับตั้งแต่ก่อตั้ง เขาใหญ่ อาร์ตฟอเรสต์ ได้แสดงความมุ่งมั่นในการติดตามและสนับสนุนความคิดของศิลปินที่มีส่วนช่วยท้าทายและเสริมสร้างความสัมพันธ์กับธรรมชาติ ผ่านโครงการวิจัยและกิจกรรมสาธารณะ เช่น อาหารการกิน เวิร์กช็อป และการประชุมสัมมนา เราแบ่งปันค่านิยม ปรับเปลี่ยนมุมมอง เรียนรู้และละทิ้งความรู้เดิมร่วมกัน ความรู้จะถูกแลกเปลี่ยนข้ามช่วงวัย ภูมิหลัง ความสนใจทางปัญญา สาขาวิชา และสัญชาติในสภาพแวดล้อมที่หลากหลายนี้`,
    `นับตั้งแต่การก่อตั้ง อาร์ตฟอเรสต์ ได้เปลี่ยนพื้นที่เขาใหญ่ให้เป็นจุดหมายปลายทางทางศิลปะที่มีชีวิตชีวาสำหรับผู้มาเยือนจากในภูมิภาคและระดับนานาชาติ`
  ];

  const historyEN = [
    `Khao Yai Art Forest spans 36 hectares, bordering the Khao Yai National Park in Nakhon Ratchasima, a land notable for its reddish soil. Within this quiet, mountainous landscape remain traces of a twenty-year-old mango orchard and vacant plots once used for corn cultivation. Deeper into the site, teak trees stand in orderly rows, planted in a precise grid. As one of Thailand's important economic crops, these trees have struggled under increasingly challenging climatic conditions, particularly prolonged dry seasons and insufficient water retention. Consequently, much of the land has been left fallow.`,
    `In 2022, Khao Yai Art Forest was established with a core mission focused on ecological restoration and the healing of nature. The site, which had been degraded by monoculture agriculture, is currently in a process of recovery through collaboration with PLandscape (PLA), a landscape architecture studio based in Bangkok. Their work emphasizes the surveying and documentation of existing vegetation in order to gain a deeper understanding of the site's native plant species.`,
    `After nearly two years of restoration, the former cassava field is now covered in lush greenery. Butterflies emerge during the summer months, while birds and cicadas enliven the forest with sound. These subtle yet significant indicators reflect the gradual recovery of the forest and its ecosystem. In this context, healing is understood as an intentional practice of care, encompassing plant selection, soil preparation, watering, pruning, and ongoing maintenance. The slow, continuous process of growth itself becomes a form of practice. The establishment of Khao Yai Art Forest not only provides visitors with an opportunity to reconnect with nature but also actively involves the on-site team—members of the local community—in the shared practice of restoring and nurturing the land.`
  ];

  const historyTH = [
    `เขาใหญ่ อาร์ตฟอเรสต์ มีพื้นที่ครอบคลุม 36 เฮกตาร์ ติดกับอุทยานแห่งชาติเขาใหญ่ในจังหวัดนครราชสีมา ดินแดนที่มีลักษณะเด่นด้วยดินสีแดง ภายในภูมิทัศน์ภูเขาอันเงียบสงบนี้ ยังคงมีร่องรอยของสวนมะม่วงอายุยี่สิบปีและที่ดินว่างเปล่าที่เคยใช้ปลูกข้าวโพด ลึกเข้าไปในที่ดิน ต้นสักยืนเรียงเป็นแถวเป็นระเบียบ ปลูกเป็นกริดที่แม่นยำ ในฐานะพืชเศรษฐกิจที่สำคัญของประเทศไทย ต้นไม้เหล่านี้ต้องดิ้นรนภายใต้สภาพภูมิอากาศที���ท้าทายมากขึ้นเรื่อยๆ โดยเฉพาะฤดูแล้งที่ยาวนานและการกักเก็บน้ำไม่เพียงพอ ส่งผลให้ที่ดินส่วนใหญ่ถูกทิ้งร้าง`,
    `ในปี พ.ศ. 2565 เขาใหญ่ อาร์ตฟอเรสต์ ได้ก่อตั้งขึ้นโดยมีภารกิจหลักที่มุ่งเน้นการฟื้นฟูระบบนิเวศและการเยียวยาธรรมชาติ พื้นที่ซึ่งเคยเสื่อมโทรมจากการทำเกษตรเชิงเดี่ยว กำลังอยู่ในกระบวนการฟื้นฟูผ่านความร่วมมือกับ PLandscape (PLA) สตูดิโอสถาปัตยกรรมภูมิทัศน์ในกรุงเทพฯ งานของพวกเขาเน้นการสำรวจและบันทึกพืชพรรณที่มีอยู่ เพื่อทำความเข้าใจพันธุ์พืชพื้นเมืองของพื้นที่อย่างลึกซึ้งยิ่งขึ้น`,
    `หลังจากการฟื้นฟูเกือบสองปี ทุ่งมันสำปะหลังเดิมปัจจุบันปกคลุมไปด้วยพืชพรรณเขียวชอุ่ม ผีเสื้อปรากฏตัวในช่วงฤดูร้อน ขณะที่นกและจักจั่นทำให้ป่าเต็มไปด้วยเสียง ตัวบ่งชี้ที่ละเอียดอ่อนแต่สำคัญเหล่านี้สะท้อนถึงการฟื้นตัวอย่างค่อยเป็นค่อยไปของป่าและระบบนิเวศ ในบริบทนี้ การเยียวยาถูกเข้าใจว่าเป็นการปฏิบัติการดูแลอย่างตั้งใจ ครอบคลุมการเลือกพืช การเตรียมดิน การรดน้ำ การตัดแต่งกิ่ง และการบำรุงรักษาอย่างต่อเนื่อง กระบวนการเจริญเติบโตที่ช้าและต่อเนื่องนั้นเองกลายเป็นรูปแบบของการปฏิบัติ การก่อตั้งเขาใหญ่ อาร์ตฟอเรสต์ ไม่เพียงแต่ให้โอกาสผู้มาเยือนได้เชื่อมต่อกับธรรมชาติอีกครั้ง แต่ยังมีส่วนร่วมอย่างแข็งขันกับทีมงานในสถานที่ ซึ่งเป็นสมาชิกของชุมชนท้องถิ่น ในการปฏิบัติร่วมกันในการฟื้นฟูและดูแลที่ดิน`
  ];

  return (
    <div className="w-full min-h-screen bg-white pb-24">
      <ParallaxHero image={covers.about || ABOUT_HERO_IMAGE} height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      <div className="w-full px-[6vw] pt-[96px] pb-[0px]">
        <div className="flex flex-col md:flex-row">

          {/* Sticky left nav */}
          <aside className="w-full md:w-1/2 shrink-0 mb-12 md:mb-0">
            <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
              <button
                onClick={() => scrollTo('about')}
                className={`text-left text-xl md:text-2xl font-sans font-normal transition-colors duration-300 ${language === 'th' ? 'leading-[1.82em]' : ''} ${activeSection === 'about' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                {language === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
              </button>
              <button
                onClick={() => scrollTo('history')}
                className={`text-left text-xl md:text-2xl font-sans font-normal transition-colors duration-300 ${language === 'th' ? 'leading-[1.82em]' : ''} ${activeSection === 'history' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                {language === 'th' ? 'ประวัติ' : 'History'}
              </button>
            </nav>
          </aside>

          {/* Scrollable content */}
          <main className="w-full md:w-1/2">

            <section id="about" className="mb-24 md:mb-32 scroll-mt-32">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-6 text-xl md:text-2xl font-normal leading-tight text-black">
                  {(language === 'th' ? contentTH : contentEN).map((p, i) => (
                    <p key={i} className={language === 'th' ? 'leading-[1.82em]' : ''}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </section>

            <section id="history" className="scroll-mt-32">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-6 text-xl md:text-2xl font-normal leading-tight text-black">
                  {(language === 'th' ? historyTH : historyEN).map((p, i) => (
                    <p key={i} className={language === 'th' ? 'leading-[1.82em]' : ''}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
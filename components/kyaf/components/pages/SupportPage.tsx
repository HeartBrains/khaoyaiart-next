'use client';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TEAM_HERO_IMAGE, IMG_PULSUS_SRC } from '@/utils/imageConstants';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';

const PARTNERS = [
    { name: 'The Fine Arts Department', nameTh: 'กรมศิลปากร', short: 'FAD', bgPos: '0% 0%' },
    { name: 'Ministry of Culture', nameTh: 'กระทรวงวัฒนธรรม', short: 'MOC', bgPos: '100% 0%' },
    { name: 'C.P. Group', nameTh: 'กลุ่มเครือเจริญโภคภัณฑ์', short: 'C.P.', bgPos: '0% 33.3333%' },
    { name: 'True Corporation', nameTh: 'ทรู คอร์ปอเรชั่น', short: 'true', bgPos: '100% 33.3333%' },
    { name: 'Tourism Authority of Thailand', nameTh: 'การท่องเที่ยวแห่งประเทศไทย', short: 'TAT', bgPos: '0% 66.6666%' },
    { name: 'Chef Cares', nameTh: 'เชฟแคร์ส', short: 'Chef Cares', bgPos: '100% 66.6666%' },
    { name: 'Thai Airways', nameTh: 'การบินไทย', short: 'THAI', bgPos: '0% 100%' },
    { name: 'Eden Estate', nameTh: 'อีเดน เอสเตท', short: 'EDEN', bgPos: '100% 100%' },
];

export function SupportPage() {
    const { language } = useLanguage();
    
    return (
        <div className="w-full bg-white pb-24 min-h-screen">
            {/* Hero Section */}
            <ParallaxHero 
                image={TEAM_HERO_IMAGE}
                height="h-[80vh]"
            >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
            </ParallaxHero>

            {/* Content */}
            <div className="w-full px-6 py-16 md:py-24">
                <Reveal>
                    <h1 className="text-3xl md:text-4xl font-sans mb-16 md:mb-24">
                      {language === 'th' ? 'ผู้สนับสนุน' : 'Support'}
                    </h1>
                </Reveal>
                
                
            </div>
        </div>
    );
}
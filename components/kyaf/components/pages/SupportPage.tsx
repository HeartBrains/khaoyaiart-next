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
            <div className="w-full px-[6vw] py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16">

                    {/* Left column */}
                    <div className="md:col-span-6 flex flex-col gap-8">
                        <Reveal>
                            <h1 className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                Cultivating Art. Connecting Worlds.
                            </h1>
                            <p className={`text-xl md:text-2xl font-normal text-black mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                From forest to city, a living dialogue unfolds.
                            </p>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                We warmly invite you to support Khao Yai Art Social Enterprise, an institute for contemporary and experimental practices across Bangkok Kunsthalle and Khao Yai Art Forest, enriching Thailand's cultural landscape and extending its resonance beyond borders.
                            </p>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                If you wish to donate, please proceed via bank transfer using the QR code or bank details below and send proof of payment to:{' '}
                                <a href="mailto:membership@khaoyaiart.com" className="underline underline-offset-4 hover:opacity-60 transition-opacity">membership@khaoyaiart.com</a>
                            </p>
                        </Reveal>
                    </div>

                    {/* Right column */}
                    <div className="md:col-start-7 md:col-span-6 flex flex-col gap-8">
                        <Reveal delay={0.1}>
                            <div className="flex flex-col gap-4">
                                <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                    Bank details:
                                </p>
                                {/* QR Code */}
                                <img
                                    src="https://content.khaoyaiart.org/wp-content/uploads/2026/03/qr-donate.png"
                                    alt="Donation QR Code"
                                    className="w-48 h-48 object-contain"
                                />
                                <div className={`text-xl md:text-2xl font-normal text-black flex flex-col gap-1 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                    <p>Bank Name: Siam Commercial Bank Public Company Limited</p>
                                    <p>Account Name: Khaoyai Art Social Enterprise Co., Ltd</p>
                                    <p>Account Number: 168-231447-3</p>
                                    <p>Bank Branch: CP Tower (333 Silom Road, Bang Rak, Bangkok 10500, Thailand)</p>
                                    <p>SWIFT Code: SICOTHBK</p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                We are profoundly grateful for your generosity. It is through your belief in our mission that Khao Yai Art can continue to thrive as a lasting, vibrant cultural home for everyone.
                            </p>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <p className={`text-xl md:text-2xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                For any enquiries or to explore further involvement, please do not hesitate to contact us at{' '}
                                <a href="mailto:claudia.k@khaoyaiart.com" className="underline underline-offset-4 hover:opacity-60 transition-opacity">claudia.k@khaoyaiart.com</a>
                                {' '}or{' '}
                                <a href="mailto:siripat.r@khaoyaiart.com" className="underline underline-offset-4 hover:opacity-60 transition-opacity">siripat.r@khaoyaiart.com</a>
                            </p>
                        </Reveal>
                    </div>

                </div>
            </div>
        </div>
    );
}
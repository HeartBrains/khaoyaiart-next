'use client';
import { Reveal } from '../../ui/Reveal';
import { useLanguage } from '@/utils/languageContext';

export function VisitInfo() {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Location */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                  {language === 'th' ? 'สถานที่' : 'Location'}
                </span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'บางกอก คุนซ์ฮาลเล่' : 'Bangkok Kunsthalle'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? '599 ซอย พันธจิตต์ แขวงป้อมปราบ' : '599 Pantachit Alley, Pom Prap,'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'เขตป้อมปราบศัตรูพาย กรุงเทพมหานคร 10100' : 'Pom Prap Sattru Phai, Bangkok,'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'ประเทศไทย' : '10100 Thailand'}
                    </p>
                </div>
                
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'เวลาทำการ' : 'Opening Hours'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'วันพุธ - วันอาทิตย์' : 'Wednesday - Sunday'}
                    </p>
                    <p className="text-xl md:text-2xl font-sans text-black">14:00 - 20:00</p>
                    <p className={`text-xl md:text-2xl font-sans text-black mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'ปิดทำการ: วันจันทร์ - วันอังคาร' : 'Closed: Monday - Tuesday'}
                    </p>
                </div>
                
                <div className="w-full aspect-square md:aspect-[4/3] bg-[#D9D9D9] relative overflow-hidden">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.640882!2d100.5151093!3d13.7403172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299183fb5ee6b%3A0xf0317ecca013dd7b!2sBangkok%20Kunsthalle!5e0!3m2!1sen!2sth!4v1710417600000!5m2!1sen!2sth&z=21"
                        title="Bangkok Kunsthalle Map"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
      </Reveal>

      {/* Admission */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                  {language === 'th' ? 'ค่าเข้าชม' : 'Admission'}
                </span>
            </div>
            <div className="md:col-span-6">
                {language === 'th' ? (
                  <>
                    <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">เข้าชมนิทรรศการฟรี ยกเว้น</p>
                    <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">กิจกรรมพิเศษที่อาจมีค่าใช้จ่ายแตกต่างกัน</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl md:text-2xl font-sans text-black">Entry to exhibitions is free, except for special events, charges will vary.</p>
                  </>
                )}
            </div>
        </div>
      </Reveal>

      {/* Transportation */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                  {language === 'th' ? 'การดินทาง' : 'Transportation'}
                </span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-8">
                {/* MRT */}
                <div className="flex flex-col gap-4">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'รถไฟฟ้าใต้ดิน' : 'MRT'}
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                              {language === 'th' ? 'สถานีหัวลำโพง' : 'Hua Lamphong Station'}
                            </p>
                            <p className={`text-xl md:text-2xl font-sans text-gray-500 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                              {language === 'th' ? 'เดิน 6 - 7 นาที' : '6 - 7 minute walk.'}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                              {language === 'th' ? 'สถานีวัดมังกร' : 'Wat Mangkon Station'}
                            </p>
                            <p className={`text-xl md:text-2xl font-sans text-gray-500 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                              {language === 'th' ? 'เดิน 10 - 12 นาที' : '10 - 12 minute walk.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Taxi or Grab */}
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'แท็กซี่หรือแกร็บ' : 'Taxi or Grab'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? (
                        <>
                          ค้นหา "<a href="https://maps.app.goo.gl/88XLQBeDFaC1wvuQA" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">บางกอก คุนซ์ฮาลเล่</a>"
                        </>
                      ) : (
                        <>
                          Search for "<a href="https://maps.app.goo.gl/88XLQBeDFaC1wvuQA" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Bangkok Kunsthalle</a>"
                        </>
                      )}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'หรือแสดงที่อยู่นี้ให้คนขับ:' : 'or show the driver this address in Thai:'}
                    </p>
                    <p className="text-xl md:text-2xl font-sans text-black mt-2 leading-[1.82em]">599 ซอย พันธจิตต์ แขวงป้อมปราบ</p>
                    <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">เขตป้อมปราบศัตรูพาย กรุงเทพมหานคร</p>
                </div>

                {/* Boat */}
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'เรือ' : 'Boat'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'สำหรับเส้นทางที่สวยงามกวา นั่งเรือด่วนเจ้าพระยาไปที่ท่ากรมเจ้าท่า (N4)' : 'For a more scenic route, take the Chao Phraya Express Boat to Marine Department (N4)'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-gray-500 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'เดิน 15 นาที' : 'with a 15 minute walk.'}
                    </p>
                </div>

                {/* Car & Parking */}
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'รถยนต์และที่จอดรถ' : 'Car & Parking'}
                    </p>
                    {language === 'th' ? (
                      <>
                        <p className="text-xl md:text-2xl font-sans text-black mt-2 leading-[1.82em]">ที่จอดรถในสถานที่มีจำกัดมากเนื่องจากตั้งอยู่ในซอยแคบ</p>
                        <p className="text-xl md:text-2xl font-sans text-black mt-4 leading-[1.82em]">แนะนำอย่างยิ่งให้���อดรถที่ลานจอรถเชิพาณิชย์ใกล้เคียง:</p>
                        <p className="text-xl md:text-2xl font-sans text-black mt-2 leading-[1.82em]">
                          <a href="https://maps.app.goo.gl/bz9RmmiWfELuy4MV6" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                            อาคารจอดรถ Moh Mee Development
                          </a>
                        </p>
                        <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                          <a href="https://maps.app.goo.gl/Djd42rKh3Wqt4cvv5" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                            ลานจอดรถสถานีรถไฟหัวลำโพง
                          </a>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl md:text-2xl font-sans text-black mt-2">On-site parking is extremely limited due to our location in a narrow alley.</p>
                        <p className="text-xl md:text-2xl font-sans text-black mt-4">It is highly recommended to park at nearby commercial lots:</p>
                        <p className="text-xl md:text-2xl font-sans text-black mt-2">
                          <a href="https://maps.app.goo.gl/bz9RmmiWfELuy4MV6" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                            Moh Mee Development Parking Building
                          </a>
                        </p>
                        <p className="text-xl md:text-2xl font-sans text-black">
                          <a href="https://maps.app.goo.gl/Djd42rKh3Wqt4cvv5" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                            Hua Lamphong railway station car park
                          </a>
                        </p>
                      </>
                    )}
                </div>
            </div>
        </div>
      </Reveal>
    </div>
  );
}
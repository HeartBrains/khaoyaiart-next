'use client';
import { useLanguage } from '@/utils/languageContext';

export function VisitInfo() {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Visit Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className="text-xl md:text-2xl font-sans text-black">
                  {language === 'th' ? 'เยี่ยมชม' : 'Visit'}
                </span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-8">
                {/* Location */}
                <div className="flex flex-col gap-4">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium text-left">
                      {language === 'th' ? 'สถานที่' : 'Location'}
                    </p>
                    {language !== 'th' && (
                        <div className="flex flex-col gap-1">
                            <p className="text-xl md:text-2xl font-sans text-black">
                              Khao Yai Art Forest
                            </p>
                            <p className="text-xl md:text-2xl font-sans text-black">
                              Pong Ta Long, Pak Chong, Nakhon Ratchasima, 30130 Thailand
                            </p>
                        </div>
                    )}
                    {language === 'th' && (
                        <div className="flex flex-col gap-1">
                            <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                              Khao Yai Art Forest
                            </p>
                            <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                              โป่งตาลอง ปากช่อง นครราชสีมา 30130 ประเทศไทย
                            </p>
                        </div>
                    )}
                </div>
                
                {/* Opening Hour */}
                <div className="flex flex-col gap-4">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium">
                      {language === 'th' ? 'วันเปิดบริการ' : 'Opening Hours'}
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        {/* Thu-Fri */}
                        <div className="flex flex-col gap-1">
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black">
                                        Thursday - Friday: 12:30 - 18:00
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                        วันพฤหัสบดี - วันศุกร์: 12:30 - 18:00
                                     </p>
                                 )}
                             </div>
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500">
                                        Fog Forest Experience: 16:00 (10 minutes)
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                        เวลาชมผลงาน Fog Forest: 16:00 (10 นาที)
                                     </p>
                                 )}
                             </div>
                        </div>

                        {/* Sat-Sun */}
                        <div className="flex flex-col gap-1">
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black">
                                        Saturday - Sunday: 10:00 - 18:00
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                        วันเสาร์ - วันอาทิตย์: 10:00 - 18:00
                                     </p>
                                 )}
                             </div>
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500">
                                        Fog Forest Experience: 11:30 and 16:30 (10 minutes)
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                        เวลาชมผลงาน Fog Forest: 11:30 และ 16:30 (10 นาที)
                                     </p>
                                 )}
                             </div>
                        </div>
                        
                        {/* K-BAR Experience */}
                        <div className="flex flex-col gap-1">
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500">
                                        K-BAR Experience: Every second Saturday of the month. Sessions run from 16:00 - 22:00, last session at 21:00 (45 minutes per session).
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                        K-BAR Experience: ทุกวันเสาร์ที่สองของเดือน เซสชั่นเวลา 16:00 - 22:00 เซสชั่นสุดท้าย 21:00 (45 นาทีต่อเซสชั่น)
                                     </p>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Closed */}
                <div className="flex flex-col gap-1">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium">
                      {language === 'th' ? 'วันปิดทำการ' : 'Closed'}
                    </p>
                    <div className="flex flex-col">
                        {language !== 'th' && (
                            <p className="text-xl md:text-2xl font-sans text-black">
                                Monday - Wednesday
                            </p>
                        )}
                        {language === 'th' && (
                            <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                วันจันทร์ - วันพุธ
                            </p>
                        )}
                    </div>
                </div>
                
                {/* Admission */}
                <div className="flex flex-col gap-4">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium">
                      {language === 'th' ? 'ค่าเข้าชม' : 'Admission'}
                    </p>
                    
                    <div className="flex flex-col gap-3">
                        {language !== 'th' && (
                            <>
                                <p className="text-xl md:text-2xl font-sans text-black">
                                    Full Site Admission
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Adult ฿500.00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Full-time student and Senior (65+ years old) ฿250.00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 mt-2">
                                    "Bamboo Journey" Tasting Experience (Lunch) & Full Site Admission ฿1,000.00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    "Forest Table" Tasting Experience (Dinner) & Full Site Admission ฿1,500.00
                                </p>
                            </>
                        )}
                        {language === 'th' && (
                            <>
                                <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                    ค่าเข้าชมทั้งหมด
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    ผู้ใหญ่ ฿500.00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    นักเรียน/นักศึกษา และผู้สูงอายุ (65 ปีขึ้นไป) ฿250.00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em] mt-2">
                                    "Bamboo Journey" Tasting Experience (มื้อกลางวัน) & ค่าเข้าชมทั้งหมด ฿1,000.00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    "Forest Table" Tasting Experience (มื้อเย็น) & ค่าเข้าชมทั้งหมด ฿1,500.00
                                </p>
                            </>
                        )}
                        
                        <a 
                            href="https://www.tickettailor.com/events/khaoyaiart?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnZ58WewWZ2vQQgnQ8T3vZXQFOuBUurUn85pe8W_nDgktNIWKZZchAA69KFlQ_aem_3vo6Fple5H5mqKNa6G0eQA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl md:text-2xl font-sans text-black underline hover:text-gray-600 transition-colors mt-2"
                        >
                            {language === 'th' ? 'จองตั๋ว' : 'Get Ticket'}
                        </a>
                    </div>
                </div>
                
                {/* Transportation */}
                <div className="flex flex-col gap-4">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium">
                      {language === 'th' ? 'การเดินทาง' : 'Transportation'}
                    </p>
                    
                    {/* Shuttle Service */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xl md:text-2xl font-sans text-black">
                          {language === 'th' ? 'บริการรถรับส่ง' : 'Shuttle Service'}
                        </p>
                        
                        {language !== 'th' && (
                            <>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Shuttle service departs daily round-trip. Departure from{' '}
                                    <a 
                                        href="https://maps.app.goo.gl/88XLQBeDFaC1wvuQA"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-gray-700 transition-colors"
                                    >
                                        Bangkok Kunsthalle
                                    </a>
                                    {' '}at 10:00, return from Khao Yai Art Forest at 17:00.
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Service available every Thursday to Sunday
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Additional fee ฿500 / person for round-trip (Full Site Admission excluded).
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Available for Full Site Admission or "Bamboo Journey" Tasting Experience (Lunch)
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Limited seats available.
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Advance reservation required.
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500">
                                    Kindly review the departure schedule prior to booking.
                                </p>
                            </>
                        )}
                        {language === 'th' && (
                            <>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    บริการรถรับส่งไป-กลับทุกวัน ออกเดินทางจาก{' '}
                                    <a 
                                        href="https://maps.app.goo.gl/88XLQBeDFaC1wvuQA"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-gray-700 transition-colors"
                                    >
                                        Bangkok Kunsthalle
                                    </a>
                                    {' '}เวลา 10:00 กลับจาก Khao Yai Art Forest เวลา 17:00
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    บริการทุกวันพฤหัสบดีถึงวันอาทิตย์
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    ค่าบริการเพิ่เติม ฿500 / ท่าน สำหรับไป-กลับ (ไม่รวมค่าเข้าชม)
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    ใช้ได้กับค่าเข้าชมทั้งหมด หรือ "Bamboo Journey" Tasting Experience (มื้อกลางวัน)
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    ที่นั่งจำกัด
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    ต้องจองล่วงหน้า
                                </p>
                                <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                    กรุณาตรวจสอบตารางเวลาก่อนจอง
                                </p>
                            </>
                        )}
                        
                        <a 
                            href="https://www.tickettailor.com/events/khaoyaiart?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnZ58WewWZ2vQQgnQ8T3vZXQFOuBUurUn85pe8W_nDgktNIWKZZchAA69KFlQ_aem_3vo6Fple5H5mqKNa6G0eQA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl md:text-2xl font-sans text-black underline hover:text-gray-600 transition-colors"
                        >
                            {language === 'th' ? 'จองตั๋ว' : 'Get Ticket'}
                        </a>
                    </div>
                    
                    {/* Car & Parking */}
                    <div className="flex flex-col gap-3 mt-4">
                        <p className="text-xl md:text-2xl font-sans text-black">
                          {language === 'th' ? 'รถยนต์ & ที่จอดรถ' : 'Car & Parking'}
                        </p>
                        
                        {language !== 'th' && (
                            <p className="text-xl md:text-2xl font-sans text-gray-500">
                                Around 3 hours drive from Bangkok. On-site parking is provided:{' '}
                                <a 
                                    href="https://maps.app.goo.gl/du5SEK5sPfnQfydp8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-gray-700 transition-colors"
                                >
                                    Khao Yai Art Forest
                                </a>.
                            </p>
                        )}
                        {language === 'th' && (
                            <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                ใช้เวลาเดินทางจากกรุงเทพฯ ประมาณ 3 ชั่วโมง มีที่จอดรถในสถานที่:{' '}
                                <a 
                                    href="https://maps.app.goo.gl/du5SEK5sPfnQfydp8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-gray-700 transition-colors"
                                >
                                    Khao Yai Art Forest
                                </a>
                            </p>
                        )}
                    </div>
                </div>
                
                {/* Map */}
                <div className="w-full aspect-square md:aspect-[4/3] bg-[#D9D9D9] relative overflow-hidden mt-4">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.234!2d101.372!3d14.502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f-8.9!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMwJzA3LjIiTiAxMDHCsDIyJzE5LjIiRQ!5e0!3m2!1sen!2sth!4v1709292837283!5m2!1sen!2sth"
                        title="Khao Yai Art Forest Map"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
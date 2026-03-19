'use client';
const imgImage1 = '/assets/8e246e2ab08ea6847836a779350a6d9869881ed9.png';
const imgImproveQuality = '/assets/0071ef88c5b70f64f427c978c8989d4f2ff57cb1.png';
const imgImage2 = '/assets/31ea28713060df0bb7786615b9851978be305cbd.png';
const imgImage4 = '/assets/5e5fe5af7fc9a06cab3c5821b3896144f393d971.png';

export default function HeroBanners() {
  return (
    <div className="bg-white relative size-full" data-name="hero banners">
      <div className="absolute h-[792px] left-[-6px] top-[317px] w-[1414px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <p className="absolute font-['Tinos:Bold',sans-serif] leading-[75px] left-[775px] not-italic text-[#151515] text-[60px] text-nowrap text-right top-[147px] tracking-[-1.5px] translate-x-[-100%] whitespace-pre">Home</p>
      <p className="absolute font-['Tinos:Bold',sans-serif] leading-[75px] left-[775px] not-italic text-[#151515] text-[60px] text-nowrap text-right top-[1249px] tracking-[-1.5px] translate-x-[-100%] whitespace-pre">Activities</p>
      <p className="absolute font-['Tinos:Bold',sans-serif] leading-[75px] left-[807px] not-italic text-[#151515] text-[60px] text-nowrap text-right top-[2392px] tracking-[-1.5px] translate-x-[-100%] whitespace-pre">support</p>
      <p className="absolute font-['Tinos:Bold',sans-serif] leading-[75px] left-[790px] not-italic text-[#151515] text-[60px] text-nowrap text-right top-[3648px] tracking-[-1.5px] translate-x-[-100%] whitespace-pre">COntact</p>
      <div className="absolute h-[786px] left-[-6px] top-[1368px] w-[1399px]" data-name="Improve quality">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImproveQuality} />
      </div>
      <div className="absolute h-[790px] left-[-6px] top-[2509px] w-[1399px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <div className="absolute h-[783px] left-[-6px] top-[3782px] w-[1399px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
    </div>
  );
}
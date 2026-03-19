'use client';
const img6 = '/assets/0cec509a8de27fb0b79ccc6a098d36be6839f3d8.png';
const img8 = '/assets/fe6045862f4d9e81cf9cbe2b1306923c3d696089.png';
const img7 = '/assets/a1a1118b6be54436ce0c9baf1800346619efcd46.png';

export default function Team() {
  return (
    <div className="bg-white relative size-full" data-name="Team">
      <div className="absolute h-[4096px] left-[254px] top-[234px] w-[1369px]" data-name="หน้าหนังสือ_6">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img6} />
      </div>
      <div className="absolute h-[4096px] left-[3994px] top-[234px] w-[1369px]" data-name="หน้าหนังสือ_8">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img8} />
      </div>
      <div className="absolute h-[4096px] left-[2063px] top-[234px] w-[1369px]" data-name="หน้าหนังสือ_7">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img7} />
      </div>
    </div>
  );
}
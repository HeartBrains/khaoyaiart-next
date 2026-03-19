'use client';
const img9 = '/assets/7abfdc14b7238c5560d0bac14a8b2eb91ba476cc.png';
const img10 = '/assets/e22c355f227be675506a95a918e1709b69f6b229.png';

export default function SHop() {
  return (
    <div className="bg-white relative size-full" data-name="SHop">
      <div className="absolute h-[4096px] left-[167px] top-[285px] w-[1369px]" data-name="หน้าหนังสือ_9">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img9} />
      </div>
      <div className="absolute h-[4096px] left-[1576px] top-[285px] w-[1369px]" data-name="หน้าหนังสือ_10">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img10} />
      </div>
    </div>
  );
}
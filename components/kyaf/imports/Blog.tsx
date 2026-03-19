'use client';
const imgPage1 = '/assets/d943e42f7e9cd184f849b82dffcea308ae6b43d3.png';

export default function Blog() {
  return (
    <div className="bg-white relative size-full" data-name="Blog">
      <div className="absolute h-[4096px] left-[290px] top-[264px] w-[1369px]" data-name="หน้าหนังสือ_4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPage1} />
      </div>
    </div>
  );
}
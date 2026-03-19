'use client';
const imgPage4 = '/assets/4aaacc7db0768648c918cf11d1de85636d5b715f.png';

export default function ExhibitionsDetail() {
  return (
    <div className="bg-white relative size-full" data-name="Exhibitions detail">
      <div className="absolute h-[4096px] left-0 top-[104px] w-[880px]" data-name="page_4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPage4} />
      </div>
    </div>
  );
}
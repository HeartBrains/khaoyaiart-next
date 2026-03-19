'use client';
const img1 = '/assets/131b2548dc118b39858ee0d21b4214fe923bd00f.png';
const img5 = '/assets/595911bc30911c24b0fc6829d3cd870a14de2f04.png';
const img3 = '/assets/eac803c72b1f401001f34751077157becab055df.png';
const imgPage4 = '/assets/4aaacc7db0768648c918cf11d1de85636d5b715f.png';

export default function Exhibitions() {
  return (
    <div className="bg-white relative size-full" data-name="Exhibitions">
      <div className="absolute h-[4096px] left-[1924px] top-[264px] w-[1369px]" data-name="page_9">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
      </div>
      <div className="absolute h-[4096px] left-[3330px] top-[274px] w-[1369px]" data-name="page_8">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img5} />
      </div>
      <div className="absolute h-[4096px] left-[355px] top-[264px] w-[1369px]" data-name="page_5">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img3} />
      </div>
      <div className="absolute h-[4096px] left-[4899px] top-[255px] w-[880px]" data-name="page_4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPage4} />
      </div>
    </div>
  );
}
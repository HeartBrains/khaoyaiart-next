'use client';
const imgPage2 = '/assets/b76ea5166f18ab6e70485da83ec1e8e9fd55d6fa.png';
const imgPage1 = '/assets/0d324eb9849fc5e2beb44923cc3e0b0173f0e867.png';

export default function Activity() {
  return (
    <div className="bg-white relative size-full" data-name="Activity">
      <div className="absolute h-[4096px] left-[300px] top-[320px] w-[1369px]" data-name="หน้าหนังสือ_1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPage1} />
      </div>
      <div className="absolute h-[4096px] left-[1904px] top-[320px] w-[1369px]" data-name="หน้าหนังสือ_2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPage2} />
      </div>
    </div>
  );
}
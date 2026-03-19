'use client';
import { ASSETS } from '@/utils/assets';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function HiddenAssetsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Assets Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(ASSETS).map(([key, value]) => (
          <div key={key} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 break-all">{key}</h2>
            <div className="aspect-video relative overflow-hidden bg-gray-100 rounded">
              <ImageWithFallback 
                key={String(value)}
                src={value} 
                alt={key}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500 break-all">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

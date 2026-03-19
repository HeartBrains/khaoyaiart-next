'use client';
const image_33593f765d2a675d88ce409217db74d077b37979 = '/assets/33593f765d2a675d88ce409217db74d077b37979.png';
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  image_33593f765d2a675d88ce409217db74d077b37979

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" className="w-full h-full object-cover" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HaberSlider({ haberler }) {
  const [aktif, setAktif] = useState(0)
  const sliderHaberler = haberler.slice(0, 6)

  useEffect(() => {
    const timer = setInterval(() => {
      setAktif(prev => (prev + 1) % sliderHaberler.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [sliderHaberler.length])

  if (!sliderHaberler.length) return null

  const haber = sliderHaberler[aktif]

  return (
    <div className="relative w-full overflow-hidden" style={{height: '420px'}}>
      {sliderHaberler.map((h, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === aktif ? 'opacity-100' : 'opacity-0'}`}>
          {h.image_url ? (
            <img src={h.image_url} alt={h.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.2) 100%)'}} />
        </div>
      ))}
<div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 35%, transparent 100%)', pointerEvents: 'none'}} />
      <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-16 cursor-pointer">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wide">
            {haber.category}
          </span>
          <h2 style={{color: '#ffffff', fontSize: '26px', fontWeight: '900', lineHeight: '1.3', marginBottom: '8px', textShadow: '3px 3px 6px rgba(0,0,0,1)'}}>
            {haber.title}
          </h2>
          <p style={{color: '#ffffff', fontSize: '13px', textShadow: '2px 2px 4px rgba(0,0,0,1)'}}>
            {new Date(haber.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </Link>

      <div className="absolute bottom-4 right-8 flex gap-2">
        {sliderHaberler.map((_, i) => (
          <button key={i} onClick={() => setAktif(i)}
            className={`h-2.5 rounded-full transition-all ${i === aktif ? 'bg-red-500 w-6' : 'bg-white opacity-60 w-2.5'}`} />
        ))}
      </div>

      <button onClick={() => setAktif(prev => (prev - 1 + sliderHaberler.length) % sliderHaberler.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-90 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">
        ‹
      </button>
      <button onClick={() => setAktif(prev => (prev + 1) % sliderHaberler.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-90 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">
        ›
      </button>
    </div>
  )
}
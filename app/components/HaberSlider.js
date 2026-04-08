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
    <div className="relative w-full overflow-hidden bg-gray-100" style={{height: '420px'}}>
      {sliderHaberler.map((h, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === aktif ? 'opacity-100' : 'opacity-0'}`}>
          {h.image_url ? (
            <img src={h.image_url} alt={h.title} className="w-full h-full object-cover opacity-30" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>
      ))}

      <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-8 cursor-pointer">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-wide w-fit">
            {haber.category}
          </span>
          <h2 style={{color: '#111111', fontSize: '26px', fontWeight: '900', lineHeight: '1.3', marginBottom: '8px'}}>
            {haber.title}
          </h2>
          <p style={{color: '#555555', fontSize: '13px'}}>
            {new Date(haber.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </Link>

      <div className="absolute bottom-4 right-8 flex gap-2">
        {sliderHaberler.map((_, i) => (
          <button key={i} onClick={() => setAktif(i)}
            className={`h-2.5 rounded-full transition-all ${i === aktif ? 'bg-red-500 w-6' : 'bg-gray-400 w-2.5'}`} />
        ))}
      </div>

      <button onClick={() => setAktif(prev => (prev - 1 + sliderHaberler.length) % sliderHaberler.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow">
        ‹
      </button>
      <button onClick={() => setAktif(prev => (prev + 1) % sliderHaberler.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow">
        ›
      </button>
    </div>
  )
}
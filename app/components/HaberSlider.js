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
    <div className="w-full">
      {/* Resim kısmı */}
      <div className="relative w-full overflow-hidden" style={{height: '320px'}}>
        {sliderHaberler.map((h, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === aktif ? 'opacity-100' : 'opacity-0'}`}>
            {h.image_url ? (
              <img src={h.image_url} alt={h.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-800" />
            )}
          </div>
        ))}

        <button onClick={() => setAktif(prev => (prev - 1 + sliderHaberler.length) % sliderHaberler.length)}
          style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', color:'white', border:'none', width:'40px', height:'40px', borderRadius:'50%', fontSize:'22px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          ‹
        </button>
        <button onClick={() => setAktif(prev => (prev + 1) % sliderHaberler.length)}
          style={{position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', color:'white', border:'none', width:'40px', height:'40px', borderRadius:'50%', fontSize:'22px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          ›
        </button>
      </div>

      {/* Başlık kısmı - resmin altında ayrı alan */}
      <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
        <div style={{background:'#1a1a1a', padding:'16px 24px', cursor:'pointer'}} className="hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span style={{background:'#c0392b', color:'white', fontSize:'11px', fontWeight:'800', padding:'3px 10px', borderRadius:'4px', textTransform:'uppercase', letterSpacing:'1px'}}>
              {haber.category}
            </span>
            <p style={{color:'#aaaaaa', fontSize:'12px'}}>
              {new Date(haber.created_at).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' })}
            </p>
          </div>
          <h2 style={{color:'#ffffff', fontSize:'20px', fontWeight:'900', lineHeight:'1.4'}}>
            {haber.title}
          </h2>
        </div>
      </Link>

      {/* Nokta navigasyonu */}
      <div style={{background:'#111', padding:'8px 24px', display:'flex', gap:'6px', alignItems:'center'}}>
        {sliderHaberler.map((_, i) => (
          <button key={i} onClick={() => setAktif(i)} style={{
            height:'6px', width: i === aktif ? '24px' : '6px',
            borderRadius:'3px', background: i === aktif ? '#c0392b' : 'rgba(255,255,255,0.3)',
            border:'none', cursor:'pointer', transition:'all 0.3s'
          }} />
        ))}
      </div>
    </div>
  )
}
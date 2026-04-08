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
        </div>
      ))}

      {/* Alt koyu şerit - başlık için */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.85)',
        padding: '20px 32px',
      }}>
        <span style={{background:'#c0392b', color:'white', fontSize:'11px', fontWeight:'800', padding:'3px 10px', borderRadius:'4px', marginBottom:'10px', display:'inline-block', textTransform:'uppercase', letterSpacing:'1px'}}>
          {haber.category}
        </span>
        <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
          <h2 style={{color:'#ffffff', fontSize:'22px', fontWeight:'900', lineHeight:'1.3', margin:'8px 0 6px 0', cursor:'pointer'}}>
            {haber.title}
          </h2>
        </Link>
        <p style={{color:'#cccccc', fontSize:'12px'}}>
          {new Date(haber.created_at).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' })}
        </p>
      </div>

      <div style={{position:'absolute', bottom:'16px', right:'32px', display:'flex', gap:'6px'}}>
        {sliderHaberler.map((_, i) => (
          <button key={i} onClick={() => setAktif(i)} style={{
            height:'8px', width: i === aktif ? '24px' : '8px',
            borderRadius:'4px', background: i === aktif ? '#c0392b' : 'rgba(255,255,255,0.6)',
            border:'none', cursor:'pointer', transition:'all 0.3s'
          }} />
        ))}
      </div>

      <button onClick={() => setAktif(prev => (prev - 1 + sliderHaberler.length) % sliderHaberler.length)}
        style={{position:'absolute', left:'16px', top:'40%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', color:'white', border:'none', width:'40px', height:'40px', borderRadius:'50%', fontSize:'22px', cursor:'pointer'}}>
        ‹
      </button>
      <button onClick={() => setAktif(prev => (prev + 1) % sliderHaberler.length)}
        style={{position:'absolute', right:'16px', top:'40%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', color:'white', border:'none', width:'40px', height:'40px', borderRadius:'50%', fontSize:'22px', cursor:'pointer'}}>
        ›
      </button>
    </div>
  )
}
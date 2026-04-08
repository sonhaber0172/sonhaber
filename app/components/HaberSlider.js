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
    <div className="w-full bg-gray-900" style={{height: '420px'}}>
      <div className="flex h-full">
        
        {/* Sol - Resim */}
        <div className="w-3/5 relative overflow-hidden">
          {sliderHaberler.map((h, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === aktif ? 'opacity-100' : 'opacity-0'}`}>
              {h.image_url ? (
                <img src={h.image_url} alt={h.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-700" />
              )}
            </div>
          ))}
          <button onClick={() => setAktif(prev => (prev - 1 + sliderHaberler.length) % sliderHaberler.length)}
            style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.6)', color:'white', border:'none', width:'36px', height:'36px', borderRadius:'50%', fontSize:'20px', cursor:'pointer'}}>
            ‹
          </button>
          <button onClick={() => setAktif(prev => (prev + 1) % sliderHaberler.length)}
            style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.6)', color:'white', border:'none', width:'36px', height:'36px', borderRadius:'50%', fontSize:'20px', cursor:'pointer'}}>
            ›
          </button>
        </div>

        {/* Sağ - Başlık ve bilgiler */}
        <div className="w-2/5 flex flex-col justify-between p-8 bg-gray-900">
          <div>
            <span style={{background:'#c0392b', color:'white', fontSize:'11px', fontWeight:'800', padding:'4px 12px', borderRadius:'4px', display:'inline-block', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'16px'}}>
              {haber.category}
            </span>
            <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
              <h2 style={{color:'#ffffff', fontSize:'22px', fontWeight:'900', lineHeight:'1.4', cursor:'pointer'}}
                className="hover:text-red-400 transition-colors">
                {haber.title}
              </h2>
            </Link>
            <p style={{color:'#aaaaaa', fontSize:'13px', marginTop:'12px'}}>
              {new Date(haber.created_at).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' })}
            </p>
          </div>

          {/* Alt haberler listesi */}
          <div className="flex flex-col gap-3">
            {sliderHaberler.map((h, i) => (
              <button key={i} onClick={() => setAktif(i)}
                className="text-left"
                style={{borderLeft: i === aktif ? '3px solid #c0392b' : '3px solid #444', paddingLeft:'10px', background:'none', border:'none', borderLeft: i === aktif ? '3px solid #c0392b' : '3px solid #444', cursor:'pointer'}}>
                <p style={{color: i === aktif ? '#ffffff' : '#888888', fontSize:'12px', fontWeight: i === aktif ? '700' : '400', lineHeight:'1.3'}}>
                  {h.title.substring(0, 60)}...
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
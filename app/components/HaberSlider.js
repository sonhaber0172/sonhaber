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
    <div style={{width:'100%', background:'#000'}}>
      
      {/* RESİM ALANI */}
      <div style={{position:'relative', width:'100%', height:'350px', overflow:'hidden'}}>
        {sliderHaberler.map((h, i) => (
          <div key={i} style={{
            position:'absolute', inset:0,
            opacity: i === aktif ? 1 : 0,
            transition:'opacity 0.7s ease'
          }}>
            {h.image_url
              ? <img src={h.image_url} alt={h.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              : <div style={{width:'100%', height:'100%', background:'#222'}} />
            }
          </div>
        ))}

        {/* Sol ok */}
        <button onClick={() => setAktif(p => (p - 1 + sliderHaberler.length) % sliderHaberler.length)}
          style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)',
            width:'44px', height:'44px', borderRadius:'50%', border:'none', cursor:'pointer',
            background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:'24px', display:'flex',
            alignItems:'center', justifyContent:'center', zIndex:10}}>
          ‹
        </button>

        {/* Sağ ok */}
        <button onClick={() => setAktif(p => (p + 1) % sliderHaberler.length)}
          style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
            width:'44px', height:'44px', borderRadius:'50%', border:'none', cursor:'pointer',
            background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:'24px', display:'flex',
            alignItems:'center', justifyContent:'center', zIndex:10}}>
          ›
        </button>

        {/* Nokta navigasyonu */}
        <div style={{position:'absolute', bottom:'12px', right:'16px', display:'flex', gap:'6px', zIndex:10}}>
          {sliderHaberler.map((_, i) => (
            <button key={i} onClick={() => setAktif(i)}
              style={{height:'8px', width: i === aktif ? '28px' : '8px',
                borderRadius:'4px', border:'none', cursor:'pointer',
                background: i === aktif ? '#c0392b' : 'rgba(255,255,255,0.5)',
                transition:'all 0.3s'}} />
          ))}
        </div>
      </div>

      {/* BAŞLIK ALANI */}
      <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
        <div style={{
          background:'#1a1a1a',
          padding:'18px 28px',
          borderLeft:'4px solid #c0392b',
          cursor:'pointer'
        }}>
          <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px'}}>
            <span style={{
              background:'#c0392b', color:'#fff',
              fontSize:'11px', fontWeight:'800',
              padding:'4px 12px', borderRadius:'4px',
              textTransform:'uppercase', letterSpacing:'1px'
            }}>
              {haber.category}
            </span>
            <span style={{color:'#888', fontSize:'12px'}}>
              {new Date(haber.created_at).toLocaleDateString('tr-TR', {day:'numeric', month:'long', year:'numeric'})}
            </span>
          </div>
          <h2 style={{
            color:'#f5c518',
            fontSize:'20px',
            fontWeight:'900',
            lineHeight:'1.4',
            margin:0
          }}>
            {haber.title}
          </h2>
        </div>
      </Link>

    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AnaHaberSlider({ haberler }) {
  const [aktif, setAktif] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAktif(prev => (prev + 1) % haberler.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [haberler.length])

  if (!haberler.length) return null
  const haber = haberler[aktif]

  return (
    <div style={{borderRadius:'12px', overflow:'hidden', border:'1px solid #f0f0f0'}}>
      {/* Resim */}
      <div style={{position:'relative', height:'300px', overflow:'hidden', background:'#f1f1f1'}}>
        {haberler.map((h, i) => (
          <div key={i} style={{
            position:'absolute', inset:0,
            opacity: i === aktif ? 1 : 0,
            transition:'opacity 0.6s ease'
          }}>
            {h.image_url
              ? <img src={h.image_url} alt={h.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              : <div style={{width:'100%', height:'100%', background:'#e5e5e5'}} />
            }
          </div>
        ))}
        <button onClick={() => setAktif(p => (p - 1 + haberler.length) % haberler.length)}
          style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', color:'white', border:'none', width:'36px', height:'36px', borderRadius:'50%', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          ‹
        </button>
        <button onClick={() => setAktif(p => (p + 1) % haberler.length)}
          style={{position:'absolute', right:'10px', top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', color:'white', border:'none', width:'36px', height:'36px', borderRadius:'50%', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          ›
        </button>
        <div style={{position:'absolute', bottom:'10px', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'6px'}}>
          {haberler.map((_, i) => (
            <button key={i} onClick={() => setAktif(i)}
              style={{width: i === aktif ? '24px' : '8px', height:'8px', borderRadius:'4px', border:'none', cursor:'pointer', background: i === aktif ? '#c0392b' : 'rgba(255,255,255,0.8)', transition:'all 0.3s'}} />
          ))}
        </div>
      </div>

      {/* Başlık - beyaz arka plan üzerinde, her zaman görünür */}
      <Link href={`/haber/${encodeURIComponent(haber.id)}`}>
        <div style={{background:'#ffffff', padding:'16px', borderTop:'3px solid #c0392b', cursor:'pointer'}}>
          <span style={{color:'#c0392b', fontSize:'11px', fontWeight:'800', textTransform:'uppercase', letterSpacing:'1px'}}>
            {haber.category}
          </span>
          <h2 style={{color:'#111111', fontSize:'20px', fontWeight:'900', lineHeight:'1.4', margin:'6px 0 8px 0'}}>
            {haber.title}
          </h2>
          <p style={{color:'#888', fontSize:'12px', margin:'0 0 10px 0'}}>
            {new Date(haber.created_at).toLocaleDateString('tr-TR', {day:'numeric', month:'long', year:'numeric'})}
          </p>
          <span style={{background:'#c0392b', color:'white', padding:'8px 16px', borderRadius:'8px', fontSize:'13px', fontWeight:'700', display:'inline-block'}}>
            Haberin Devamını Oku →
          </span>
        </div>
      </Link>
    </div>
  )
}
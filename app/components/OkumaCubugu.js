'use client'
import { useState, useEffect } from 'react'

export default function OkumaCubugu() {
  const [yuzde, setYuzde] = useState(0)

  useEffect(() => {
    const hesapla = () => {
      const sayfa = document.documentElement
      const kaydirilan = window.scrollY
      const toplam = sayfa.scrollHeight - sayfa.clientHeight
      const oran = toplam > 0 ? (kaydirilan / toplam) * 100 : 0
      setYuzde(Math.min(100, Math.round(oran)))
    }

    window.addEventListener('scroll', hesapla)
    return () => window.removeEventListener('scroll', hesapla)
  }, [])

  if (yuzde === 0) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: `${yuzde}%`,
      height: '4px',
      background: '#c0392b',
      zIndex: 9999,
      transition: 'width 0.1s ease',
      boxShadow: '0 0 8px rgba(192, 57, 43, 0.6)'
    }} />
  )
}
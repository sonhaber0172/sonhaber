'use client'
import { useState, useEffect } from 'react'

export default function YukariCik() {
  const [gorunum, setGorunum] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setGorunum(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const yukariCik = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!gorunum) return null

  return (
    <button
      onClick={yukariCik}
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '44px',
        height: '44px',
        background: '#c0392b',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 999,
        fontSize: '18px',
        transition: 'background 0.2s'
      }}
      onMouseEnter={e => e.target.style.background = '#a93226'}
      onMouseLeave={e => e.target.style.background = '#c0392b'}
      title="Yukarı çık"
    >
      ↑
    </button>
  )
}
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Arama({ haberler }) {
  const [aramaMetni, setAramaMetni] = useState('')
  const [sonuclar, setSonuclar] = useState([])
  const [acik, setAcik] = useState(false)

  const handleArama = (e) => {
    const metin = e.target.value
    setAramaMetni(metin)
    if (metin.length > 2) {
      const bulunan = haberler.filter(h => 
        h.title?.toLowerCase().includes(metin.toLowerCase()) ||
        h.content?.toLowerCase().includes(metin.toLowerCase())
      ).slice(0, 6)
      setSonuclar(bulunan)
      setAcik(true)
    } else {
      setSonuclar([])
      setAcik(false)
    }
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm border-2 border-gray-200 focus-within:border-red-500 transition-colors">
        <svg className="w-5 h-5 text-gray-400 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Haber ara..."
          value={aramaMetni}
          onChange={handleArama}
          onBlur={() => setTimeout(() => setAcik(false), 200)}
          onFocus={() => aramaMetni.length > 2 && setAcik(true)}
          className="w-full px-4 py-3 text-base outline-none bg-transparent"
        />
        {aramaMetni && (
          <button onClick={() => { setAramaMetni(''); setSonuclar([]); setAcik(false) }}
            className="mr-3 text-gray-400 hover:text-gray-600">
            ✕
          </button>
        )}
      </div>

      {acik && sonuclar.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 mt-2 z-50 overflow-hidden">
          {sonuclar.map((haber, index) => (
            <Link key={index} href={`/haber/${encodeURIComponent(haber.id)}`}
              className="flex gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
              {haber.image_url ? (
                <img src={haber.image_url} alt={haber.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
              ) : (
                <div className="w-16 h-12 bg-red-100 rounded-lg shrink-0 flex items-center justify-center">
                  <span className="text-red-600 font-black text-xs">SH</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-xs text-red-600 font-bold">{haber.category}</span>
                <p className="text-sm font-bold text-gray-900 line-clamp-2 mt-0.5">{haber.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {acik && aramaMetni.length > 2 && sonuclar.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 mt-2 z-50 p-4 text-center text-gray-400">
          Sonuç bulunamadı
        </div>
      )}
    </div>
  )
}
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MobilMenu() {
  const [acik, setAcik] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setAcik(!acik)}
        className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Menü"
      >
        <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${acik ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${acik ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${acik ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {acik && (
        <div className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 px-6 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Ana Sayfa</Link>
          <Link href="/gundem" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Gündem</Link>
          <Link href="/spor" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Spor</Link>
          <Link href="/ekonomi" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Ekonomi</Link>
          <Link href="/teknoloji" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Teknoloji</Link>
          <Link href="/dunya" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Dünya</Link>
          <Link href="/saglik" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Sağlık</Link>
          <Link href="/kultur" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Kültür</Link>
          <Link href="/yasam" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Yaşam</Link>
          <Link href="/hakkimizda" onClick={() => setAcik(false)} className="text-gray-700 font-semibold hover:text-red-600 transition-colors py-2 border-b border-gray-100">Hakkımızda</Link>
          <Link href="/iletisim" onClick={() => setAcik(false)} className="bg-red-600 text-white font-bold px-4 py-2.5 rounded-lg text-center hover:bg-red-700 transition-colors">İletişim</Link>
        </div>
      )}
    </div>
  )
}
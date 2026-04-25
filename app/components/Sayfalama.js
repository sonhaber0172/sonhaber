'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Sayfalama({ sayfaNo, toplamSayfa, oncekiSayfa, sonrakiSayfa, kategoriParam }) {
  const router = useRouter()

  const sayfalar = []
  if (toplamSayfa <= 7) {
    for (let i = 1; i <= toplamSayfa; i++) sayfalar.push(i)
  } else {
    sayfalar.push(1)
    if (sayfaNo > 3) sayfalar.push('...')
    for (let i = Math.max(2, sayfaNo - 1); i <= Math.min(toplamSayfa - 1, sayfaNo + 1); i++) {
      sayfalar.push(i)
    }
    if (sayfaNo < toplamSayfa - 2) sayfalar.push('...')
    sayfalar.push(toplamSayfa)
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8 mt-8">
      <div className="hidden md:flex items-center gap-2">
        {oncekiSayfa ? (
          <Link href={oncekiSayfa} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-red-600 hover:text-red-600 transition-colors font-semibold text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:border-red-500 dark:hover:text-red-500">
            ← Önceki
          </Link>
        ) : (
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed font-semibold text-sm dark:border-gray-700 dark:text-gray-600">
            ← Önceki
          </span>
        )}

        {sayfalar.map((s, i) =>
          s === '...' ? (
            <span key={`dot-${i}`} className="px-3 py-2.5 text-gray-400 dark:text-gray-500">•••</span>
          ) : (
            <Link key={s} href={`/?sayfa=${s}${kategoriParam}`}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                s === sayfaNo
                  ? 'bg-red-600 text-white'
                  : 'border border-gray-200 text-gray-700 hover:border-red-600 hover:text-red-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-red-500 dark:hover:text-red-500'
              }`}>
              {s}
            </Link>
          )
        )}

        {sonrakiSayfa ? (
          <Link href={sonrakiSayfa} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors font-semibold text-sm dark:border-gray-600 dark:hover:bg-red-600">
            Sonraki →
          </Link>
        ) : (
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed font-semibold text-sm dark:border-gray-700 dark:text-gray-600">
            Sonraki →
          </span>
        )}
      </div>

      {/* Mobil */}
      <div className="flex md:hidden items-center justify-center gap-3">
        {oncekiSayfa ? (
          <Link href={oncekiSayfa} className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-base bg-white dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800">
            ← Önceki
          </Link>
        ) : (
          <span className="px-5 py-3 rounded-xl border border-gray-200 text-gray-300 cursor-not-allowed font-bold text-base bg-white dark:border-gray-700 dark:text-gray-600 dark:bg-gray-800">
            ← Önceki
          </span>
        )}

        <select
          value={sayfaNo}
          onChange={(e) => router.push(`/?sayfa=${e.target.value}${kategoriParam}`)}
          className="px-5 py-3 rounded-xl border border-gray-800 text-base font-bold text-white bg-gray-800 cursor-pointer dark:border-gray-600"
        >
          {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map(s => (
            <option key={s} value={s}>Sayfa {s}</option>
          ))}
        </select>

        <span className="text-gray-500 text-base font-semibold">/ {toplamSayfa} sayfa</span>

        {sonrakiSayfa ? (
          <Link href={sonrakiSayfa} className="px-5 py-3 rounded-xl border border-gray-200 text-red-600 font-bold text-base bg-white dark:border-gray-600 dark:bg-gray-800">
            Sonraki →
          </Link>
        ) : (
          <span className="px-5 py-3 rounded-xl border border-gray-200 text-gray-300 cursor-not-allowed font-bold text-base bg-white dark:border-gray-700 dark:bg-gray-800">
            Sonraki →
          </span>
        )}
      </div>
    </div>
  )
}
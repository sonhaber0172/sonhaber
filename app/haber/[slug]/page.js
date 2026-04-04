import { supabase } from '../../../lib/supabase'
import { fetchRSSNews } from '../../../lib/rss'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HaberDetay({ params }) {
  const { slug } = await params
  const id = decodeURIComponent(slug)
  
  let haber = null

  const { data: customHaber } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (customHaber) {
    haber = customHaber
  } else {
    const rssNews = await fetchRSSNews()
    haber = rssNews.find(h => h.id === id)
  }

  const rssNews = await fetchRSSNews()
  const { data: customNews } = await supabase
    .from('articles')
    .select('*')
    .eq('is_custom', true)
    .order('priority_score', { ascending: false })
    .limit(20)

  const tumHaberler = [...(customNews || []), ...rssNews]
  const digerHaberler = tumHaberler.filter(h => h.id !== id).slice(0, 16)
  const sagHaberler = digerHaberler.slice(0, 8)
  const altHaberler = digerHaberler.slice(8, 16)

  if (!haber) {
    return (
      <main className="min-h-screen bg-white">
        <header className="bg-red-700 text-white shadow-lg">
          <div className="px-6 py-3">
            <Link href="/"><h1 className="text-3xl font-bold text-white cursor-pointer">SONHABER</h1></Link>
          </div>
        </header>
        <div className="px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Haber bulunamadı</h2>
          <Link href="/" className="text-red-600 mt-4 block">Ana sayfaya dön</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-red-700 text-white shadow-lg">
        <div className="px-6 py-3 flex items-center justify-between">
          <Link href="/"><h1 className="text-2xl md:text-3xl font-black cursor-pointer">SONHABER</h1></Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/iletisim" className="hover:text-red-200">İletişim</Link>
          </nav>
        </div>
      </header>

      {/* Üst Kısım - Sol Haber + Sağ Haberler */}
      <div className="flex flex-col lg:flex-row">

        {/* Sol - Ana Haber */}
        <div className="lg:w-3/5 py-8 px-6 border-r border-gray-100">
          {haber.image_url && (
            <img src={haber.image_url} alt={haber.title} className="w-full h-64 md:h-96 object-cover mb-6 rounded-xl" />
          )}
          <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded">{haber.category}</span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-4 mb-3 leading-tight">{haber.title}</h1>
          <p className="text-gray-400 text-sm mb-6 border-b border-gray-100 pb-4">
            {new Date(haber.created_at).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="text-gray-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{__html: haber.content}} />
          <div className="mt-6 flex items-center justify-between">
            <Link href="/" className="text-red-600 hover:text-red-700 font-medium">
              ← Ana sayfaya dön
            </Link>
            {haber.source_url && !haber.is_custom && (
              <a href={haber.source_url} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 text-sm">
                Kaynak habere git
              </a>
            )}
          </div>

          {/* Haberin Altı - Bunları da Okuyun */}
          <div className="mt-10 border-t-2 border-red-600 pt-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-red-600 rounded"></div>
              <h2 className="text-lg font-black text-gray-900">Bunları da Okuyun</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {altHaberler.map((h, i) => (
                <Link key={i} href={`/haber/${encodeURIComponent(h.id)}`}>
                  <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full">
                    {h.image_url ? (
                      <img src={h.image_url} alt={h.title} className="w-full h-32 object-cover" />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                        <span className="text-white font-black text-lg opacity-40">SH</span>
                      </div>
                    )}
                    <div className="p-3">
                      <span className="text-xs text-red-600 font-bold">{h.category}</span>
                      <p className="text-xs font-bold text-gray-900 line-clamp-2 mt-1">{h.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ - Diğer Haberler */}
        <div className="lg:w-2/5 px-4 py-8 bg-gray-50">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-red-600 rounded"></div>
            <h2 className="text-lg font-black text-gray-900">Diğer Haberler</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sagHaberler.map((h, i) => (
              <Link key={i} href={`/haber/${encodeURIComponent(h.id)}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full">
                  {h.image_url ? (
                    <img src={h.image_url} alt={h.title} className="w-full h-28 object-cover" />
                  ) : (
                    <div className="w-full h-28 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                      <span className="text-white font-black text-lg opacity-40">SH</span>
                    </div>
                  )}
                  <div className="p-2">
                    <span className="text-xs text-red-600 font-bold">{h.category}</span>
                    <p className="text-xs font-bold text-gray-900 line-clamp-2 mt-1">{h.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
        <p className="font-bold text-white text-lg mb-1">SONHABER</p>
        <p>© 2025 SonHaber. Tüm hakları saklıdır.</p>
        <Link href="/iletisim" className="text-red-400 hover:text-red-300 mt-2 block font-medium">İletişim için tıklayın</Link>
      </footer>
    </main>
  )
}
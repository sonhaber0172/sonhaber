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
  const digerHaberler = tumHaberler.filter(h => h.id !== id).slice(0, 12)
  const sonHaberler = tumHaberler.filter(h => h.id !== id).slice(0, 8)

  if (!haber) {
    return (
      <div style={{background: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
        <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 40px rgba(0,0,0,0.15)'}}>
          <header className="bg-red-700 text-white shadow-lg">
            <div className="px-6 py-3">
              <Link href="/"><h1 className="text-3xl font-bold text-white cursor-pointer">SONHABER</h1></Link>
            </div>
          </header>
          <div className="px-4 py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Haber bulunamadi</h2>
            <Link href="/" className="text-red-600 mt-4 block">Ana sayfaya don</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{background: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 40px rgba(0,0,0,0.15)'}}>
        <header className="bg-red-700 text-white shadow-lg">
          <div className="px-6 py-3 flex items-center justify-between">
            <Link href="/"><h1 className="text-2xl md:text-3xl font-black cursor-pointer">SONHABER</h1></Link>
            <nav className="flex gap-4 text-sm font-medium">
              <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
              <Link href="/iletisim" className="hover:text-red-200">İletişim</Link>
            </nav>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">

          {/* Sol - Ana Haber */}
          <div className="lg:w-2/3 px-6 py-8">
            <div className="bg-white rounded-xl overflow-hidden">
              {haber.image_url && (
                <img src={haber.image_url} alt={haber.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-6" />
              )}
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded">{haber.category}</span>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-4 mb-3 leading-tight">{haber.title}</h1>
              <p className="text-gray-400 text-sm mb-6 border-b border-gray-100 pb-4">
                {new Date(haber.created_at).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <div className="text-gray-700 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{__html: haber.content}} />
            </div>

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

            {/* Bunları da Okuyun - 2li 1li dönüşümlü */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-red-600 rounded"></div>
                <h2 className="text-xl font-black text-gray-900">Bunları da Okuyun</h2>
              </div>
              <div className="flex flex-col gap-4">
                {[0, 3, 6, 9].map(start => (
                  <div key={start}>
                    {/* 2 haber yan yana */}
                    {digerHaberler[start] && digerHaberler[start + 1] && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {[digerHaberler[start], digerHaberler[start + 1]].map((h, i) => (
                          <Link key={i} href={`/haber/${encodeURIComponent(h.id)}`}>
                            <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full">
                              {h.image_url ? (
                                <img src={h.image_url} alt={h.title} className="w-full h-36 object-cover" />
                              ) : (
                                <div className="w-full h-36 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                                  <span className="text-white font-black text-xl opacity-40">SH</span>
                                </div>
                              )}
                              <div className="p-3">
                                <span className="text-xs text-red-600 font-bold">{h.category}</span>
                                <p className="text-sm font-bold text-gray-900 line-clamp-2 mt-1">{h.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {/* 1 büyük haber */}
                    {digerHaberler[start + 2] && (
                      <Link href={`/haber/${encodeURIComponent(digerHaberler[start + 2].id)}`}>
                        <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex gap-4 p-3">
                          {digerHaberler[start + 2].image_url ? (
                            <img src={digerHaberler[start + 2].image_url} alt={digerHaberler[start + 2].title} className="w-40 h-28 object-cover rounded-lg shrink-0" />
                          ) : (
                            <div className="w-40 h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shrink-0 flex items-center justify-center">
                              <span className="text-white font-black text-xl opacity-40">SH</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0 py-1">
                            <span className="text-xs text-red-600 font-bold">{digerHaberler[start + 2].category}</span>
                            <p className="text-base font-black text-gray-900 line-clamp-3 mt-1 leading-snug">{digerHaberler[start + 2].title}</p>
                            <p className="text-xs text-gray-400 mt-2">{new Date(digerHaberler[start + 2].created_at).toLocaleDateString('tr-TR')}</p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ - Son Haberler */}
          <div className="lg:w-1/3 px-4 py-8 border-l border-gray-100">
            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden sticky top-4">
              <div className="bg-red-600 px-4 py-3">
                <h3 className="text-white font-black">Son Haberler</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {sonHaberler.map((h, i) => (
                  <Link key={i} href={`/haber/${encodeURIComponent(h.id)}`}>
                    <div className="p-3 hover:bg-gray-50 transition-colors flex gap-3">
                      {h.image_url ? (
                        <img src={h.image_url} alt={h.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                      ) : (
                        <div className="w-16 h-12 bg-red-100 rounded-lg shrink-0 flex items-center justify-center">
                          <span className="text-red-600 font-black text-xs">SH</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-red-600 font-bold">{h.category}</span>
                        <p className="text-xs font-bold text-gray-800 line-clamp-2 mt-0.5">{h.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-4">
                <Link href="/" className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                  Tüm Haberlere Git
                </Link>
              </div>
            </div>
          </div>

        </div>

        <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
          <p className="font-bold text-white text-lg mb-1">SONHABER</p>
          <p>© 2025 SonHaber. Tüm hakları saklıdır.</p>
          <Link href="/iletisim" className="text-red-400 hover:text-red-300 mt-2 block font-medium">İletişim için tıklayın</Link>
        </footer>
      </main>
    </div>
  )
}
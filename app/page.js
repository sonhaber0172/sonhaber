import Link from 'next/link'
import { fetchRSSNews } from '../lib/rss'
import { supabase } from '../lib/supabase'

export const revalidate = 300

const kategoriler = ['Tumu', 'Gundem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dunya', 'Saglik', 'Kultur', 'Yasam']

export default async function HomePage({ searchParams }) {
  const { kategori } = await searchParams
  const rssNews = await fetchRSSNews()
  
  const { data: customNews } = await supabase
    .from('articles')
    .select('*')
    .eq('is_custom', true)
    .order('priority_score', { ascending: false })

  let allNews = [...(customNews || []), ...rssNews]
  
  if (kategori && kategori !== 'Tumu') {
    allNews = allNews.filter(n => n.category === kategori)
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">SONHABER</h1>
            <p className="text-red-200 text-sm md:text-base mt-1">Turkiyenin Haber Merkezi</p>
          </div>
          <nav className="hidden md:flex gap-8 text-base font-medium">
            <Link href="/" className="hover:text-red-200 transition-colors">Ana Sayfa</Link>
            <Link href="/paketler" className="bg-white text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">Reklam Ver</Link>
          </nav>
          <nav className="flex md:hidden gap-3 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/paketler" className="hover:text-red-200">Reklam</Link>
          </nav>
        </div>
        <div className="bg-red-800 text-center py-2 text-sm text-red-200">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      {/* Son Dakika */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded shrink-0 uppercase">Son Dakika</span>
          <p className="text-sm md:text-base truncate font-medium">{allNews[0]?.title || 'Haberler yukleniyor...'}</p>
        </div>
      </div>

      {/* Kategoriler */}
      <div className="bg-white dark:bg-gray-800 border-b-2 border-red-600 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {kategoriler.map(k => (
              <Link key={k} href={k === 'Tumu' ? '/' : `/?kategori=${k}`}
                className={`shrink-0 px-4 py-2 text-sm font-semibold transition-colors border-b-2 ${
                  (k === 'Tumu' && !kategori) || kategori === k
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-red-600 hover:border-red-300'
                }`}>
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ana İcerik */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Üst Bolum: Sol büyük haber + Sag liste */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* Sol: Büyük Ana Haber */}
          <div className="lg:w-3/5">
            {allNews[0] && (
              allNews[0].is_custom ? (
                <Link href={`/haber/${encodeURIComponent(allNews[0].id)}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer h-full">
                    <div className="relative">
                      {allNews[0].image_url ? (
                        <img src={allNews[0].image_url} alt={allNews[0].title} className="w-full h-72 md:h-96 object-cover" />
                      ) : (
                        <div className="w-full h-72 md:h-96 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                          <span className="text-white text-6xl font-black opacity-30">SH</span>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">{allNews[0].category}</span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-3">{allNews[0].title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-base line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 300) + '...'}} />
                      <p className="text-sm text-gray-400 mt-4">{new Date(allNews[0].created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <a href={allNews[0].source_url || '#'} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer h-full">
                    <div className="relative">
                      {allNews[0].image_url ? (
                        <img src={allNews[0].image_url} alt={allNews[0].title} className="w-full h-72 md:h-96 object-cover" />
                      ) : (
                        <div className="w-full h-72 md:h-96 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                          <span className="text-white text-6xl font-black opacity-30">SH</span>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">{allNews[0].category}</span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-3">{allNews[0].title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-base line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 300) + '...'}} />
                      <p className="text-sm text-gray-400 mt-4">{new Date(allNews[0].created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>

          {/* Sag: Haber Listesi */}
          <div className="lg:w-2/5 flex flex-col gap-3">
            {allNews.slice(1, 8).map((news, index) => (
              news.is_custom ? (
                <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer flex gap-3 p-3">
                    {news.image_url ? (
                      <img src={news.image_url} alt={news.title} className="w-24 h-20 object-cover rounded-lg shrink-0" />
                    ) : (
                      <div className="w-24 h-20 bg-red-100 rounded-lg shrink-0 flex items-center justify-center">
                        <span className="text-red-600 font-black text-lg">SH</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-red-600 font-bold">{news.category}</span>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-3 mt-1">{news.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <a key={index} href={news.source_url || '#'} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer flex gap-3 p-3">
                    {news.image_url ? (
                      <img src={news.image_url} alt={news.title} className="w-24 h-20 object-cover rounded-lg shrink-0" />
                    ) : (
                      <div className="w-24 h-20 bg-red-100 rounded-lg shrink-0 flex items-center justify-center">
                        <span className="text-red-600 font-black text-lg">SH</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-red-600 font-bold">{news.category}</span>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-3 mt-1">{news.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </a>
              )
            ))}
          </div>
        </div>

        {/* Alt Grid */}
        <div className="border-t-2 border-red-600 pt-6">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Diger Haberler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allNews.slice(8, 24).map((news, index) => (
              news.is_custom ? (
                <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full">
                    {news.image_url ? (
                      <img src={news.image_url} alt={news.title} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                        <span className="text-white font-black text-2xl opacity-40">SH</span>
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-red-600 font-bold">{news.category}</span>
                      <h3 className="font-bold text-gray-900 dark:text-white mt-1 text-sm leading-snug line-clamp-3">{news.title}</h3>
                      <p className="text-xs text-gray-400 mt-2">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <a key={index} href={news.source_url || '#'} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full">
                    {news.image_url ? (
                      <img src={news.image_url} alt={news.title} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                        <span className="text-white font-black text-2xl opacity-40">SH</span>
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-red-600 font-bold">{news.category}</span>
                      <h3 className="font-bold text-gray-900 dark:text-white mt-1 text-sm leading-snug line-clamp-3">{news.title}</h3>
                      <p className="text-xs text-gray-400 mt-2">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </a>
              )
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-8 text-sm md:text-base">
        <p className="font-bold text-white text-lg mb-1">SONHABER</p>
        <p>2025 SonHaber. Tum haklari saklidir.</p>
        <Link href="/paketler" className="text-red-400 hover:text-red-300 mt-2 block font-medium">Reklam vermek icin tiklayin</Link>
      </footer>
    </main>
  )
}
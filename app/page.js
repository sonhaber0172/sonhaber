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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">SONHABER</h1>
            <p className="text-red-200 text-sm md:text-base">Turkiyenin Haber Merkezi</p>
          </div>
          <nav className="flex gap-4 md:gap-8 text-sm md:text-base font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/paketler" className="hover:text-red-200">Reklam</Link>
          </nav>
        </div>
        <div className="bg-red-800 text-center py-1 text-sm text-red-200">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div className="bg-gray-900 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded shrink-0">SON DAKİKA</span>
          <p className="text-sm md:text-base truncate">{allNews[0]?.title || 'Haberler yukleniyor...'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {kategoriler.map(k => (
              <Link key={k} href={k === 'Tumu' ? '/' : `/?kategori=${k}`}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (k === 'Tumu' && !kategori) || kategori === k
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100'
                }`}>
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {allNews[0] && (
          <div className="mb-8 md:mb-10">
            {allNews[0].is_custom ? (
              <Link href={`/haber/${encodeURIComponent(allNews[0].id)}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  {allNews[0].image_url && (
                    <img src={allNews[0].image_url} alt={allNews[0].title} className="w-full h-56 md:h-96 object-cover" />
                  )}
                  <div className="p-5 md:p-8">
                    <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded">{allNews[0].category}</span>
                    <h2 className="text-xl md:text-3xl font-bold mt-3 text-gray-900 dark:text-white">{allNews[0].title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-base line-clamp-3" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 250) + '...'}} />
                  </div>
                </div>
              </Link>
            ) : (
              <a href={allNews[0].source_url || '#'} target="_blank" rel="noopener noreferrer">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  {allNews[0].image_url && (
                    <img src={allNews[0].image_url} alt={allNews[0].title} className="w-full h-56 md:h-96 object-cover" />
                  )}
                  <div className="p-5 md:p-8">
                    <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded">{allNews[0].category}</span>
                    <h2 className="text-xl md:text-3xl font-bold mt-3 text-gray-900 dark:text-white">{allNews[0].title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-base line-clamp-3" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 250) + '...'}} />
                  </div>
                </div>
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allNews.slice(1, 19).map((news, index) => (
            news.is_custom ? (
              <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full">
                  {news.image_url && (
                    <img src={news.image_url} alt={news.title} className="w-full h-48 md:h-56 object-cover" />
                  )}
                  <div className="p-4 md:p-5">
                    <span className="text-sm text-red-600 font-semibold">{news.category}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white mt-2 text-base leading-snug line-clamp-3">{news.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <a key={index} href={news.source_url || '#'} target="_blank" rel="noopener noreferrer">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full">
                  {news.image_url && (
                    <img src={news.image_url} alt={news.title} className="w-full h-48 md:h-56 object-cover" />
                  )}
                  <div className="p-4 md:p-5">
                    <span className="text-sm text-red-600 font-semibold">{news.category}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white mt-2 text-base leading-snug line-clamp-3">{news.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </a>
            )
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-8 md:mt-12 text-sm md:text-base">
        <p>2025 SonHaber. Tum haklari saklidir.</p>
        <Link href="/paketler" className="text-red-400 hover:text-red-300 mt-2 block">Reklam vermek icin tiklayin</Link>
      </footer>
    </main>
  )
}
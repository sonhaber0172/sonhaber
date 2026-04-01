import Link from 'next/link'
import { fetchRSSNews } from '../lib/rss'
import { supabase } from '../lib/supabase'

export const revalidate = 300

export default async function HomePage() {
  const rssNews = await fetchRSSNews()
  
  const { data: customNews } = await supabase
    .from('articles')
    .select('*')
    .eq('is_custom', true)
    .order('priority_score', { ascending: false })

  const allNews = [...(customNews || []), ...rssNews]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SONHABER</h1>
            <p className="text-red-200 text-sm">Turkiyenin Haber Merkezi</p>
          </div>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/paketler" className="hover:text-red-200">Reklam Paketleri</Link>
          </nav>
        </div>
        <div className="bg-red-800 text-center py-1 text-xs text-red-200">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div className="bg-gray-900 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shrink-0">SON DAKIKA</span>
          <p className="text-sm truncate">{allNews[0]?.title || 'Haberler yukleniyor...'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {allNews[0] && (
          <div className="mb-8">
            <a href={allNews[0].source_url || '#'} target="_blank" rel="noopener noreferrer">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                {allNews[0].image_url && (
                  <img src={allNews[0].image_url} alt={allNews[0].title} className="w-full h-80 object-cover" />
                )}
                <div className="p-6">
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">{allNews[0].category}</span>
                  <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{allNews[0].title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-3" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 200) + '...'}} />
                </div>
              </div>
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.slice(1, 19).map((news, index) => (
            <a key={index} href={news.source_url || '#'} target="_blank" rel="noopener noreferrer">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full">
                {news.image_url && (
                  <img src={news.image_url} alt={news.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <span className="text-xs text-red-600 font-semibold">{news.category}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mt-1 text-sm leading-snug line-clamp-3">{news.title}</h3>
                  <p className="text-xs text-gray-400 mt-2">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
        <p>2025 SonHaber. Tum haklari saklidir.</p>
        <Link href="/paketler" className="text-red-400 hover:text-red-300 mt-1 block">Reklam vermek icin tiklayin</Link>
      </footer>
    </main>
  )
}
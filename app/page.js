import Link from 'next/link'
import { fetchRSSNews } from '../lib/rss'
import { supabase } from '../lib/supabase'
import Arama from './components/Arama'
import SosyalMediaBar from './components/SosyalMediaBar'

export const revalidate = 300

const kategoriler = ['Tumu', 'Gündem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dünya', 'Sağlık', 'Kültür', 'Yaşam']

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
    <div style={{background: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 40px rgba(0,0,0,0.15)'}}>
      
      <header className="bg-red-700 text-white shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">SONHABER</h1>
            <p className="text-red-200 text-sm md:text-base mt-1">Türkiye'nin Güvenilir Haber Kaynağı</p>
          </div>
          <nav className="hidden md:flex gap-8 text-base font-medium">
            <Link href="/" className="hover:text-red-200 transition-colors">Ana Sayfa</Link>
            <Link href="/iletisim" className="bg-white text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">İletişim</Link>
          </nav>
          <nav className="flex md:hidden gap-3 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/iletisim" className="hover:text-red-200">İletişim</Link>
          </nav>
        </div>
        <div className="bg-red-800 text-center py-2 text-sm text-red-200">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="px-6 py-3 bg-red-600">
          <Arama haberler={allNews} />
        </div>
      </header>

      <SosyalMediaBar />

      <div className="bg-gray-900 text-white py-2">
        <div className="px-6 flex items-center gap-4">
          <span className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded shrink-0 uppercase">Son Dakika</span>
          <p className="text-sm md:text-base truncate font-medium">{allNews[0]?.title || 'Haberler yükleniyor...'}</p>
        </div>
      </div>

      <div className="bg-white border-b-2 border-red-600 sticky top-0 z-10 shadow-sm">
        <div className="w-full px-4">
          <div className="flex gap-4 overflow-x-auto py-5">
            {kategoriler.map(k => (
              <Link key={k} href={k === 'Tumu' ? '/' : `/?kategori=${k}`}
                className={`shrink-0 px-10 py-5 text-xl font-black transition-colors rounded-xl ${
                  (k === 'Tumu' && !kategori) || kategori === k
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white'
                }`}>
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-6 bg-white">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-3/5">
            {allNews[0] && (
              <Link href={`/haber/${encodeURIComponent(allNews[0].id)}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer h-full">
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
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">{allNews[0].title}</h2>
                    <p className="text-gray-600 text-base line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 300) + '...'}} />
                    <p className="text-sm text-gray-400 mt-4">{new Date(allNews[0].created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:w-2/5 flex flex-col gap-3">
            {allNews.slice(1, 8).map((news, index) => (
              <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer flex gap-3 p-3">
                  {news.image_url ? (
                    <img src={news.image_url} alt={news.title} className="w-24 h-20 object-cover rounded-lg shrink-0" />
                  ) : (
                    <div className="w-24 h-20 bg-red-100 rounded-lg shrink-0 flex items-center justify-center">
                      <span className="text-red-600 font-black text-lg">SH</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-red-600 font-bold">{news.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-3 mt-1">{news.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-red-600 pt-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Diğer Haberler</h2>
          
          {/* 2 Büyük Haber */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {allNews.slice(8, 10).map((news, index) => (
              <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full">
                  {news.image_url ? (
                    <img src={news.image_url} alt={news.title} className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                      <span className="text-white font-black text-3xl opacity-40">SH</span>
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs text-red-600 font-bold">{news.category}</span>
                    <h3 className="font-black text-gray-900 mt-1 text-lg leading-snug line-clamp-2">{news.title}</h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2" dangerouslySetInnerHTML={{__html: news.content?.substring(0, 120) + '...'}} />
                    <p className="text-xs text-gray-400 mt-3">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Normal Grid Haberler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allNews.slice(10, 30).map((news, index) => (
              <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full">
                  {news.image_url ? (
                    <img src={news.image_url} alt={news.title} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                      <span className="text-white font-black text-2xl opacity-40">SH</span>
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs text-red-600 font-bold">{news.category}</span>
                    <h3 className="font-bold text-gray-900 mt-1 text-sm leading-snug line-clamp-3">{news.title}</h3>
                    <p className="text-xs text-gray-400 mt-2">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-8">
        <div className="px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700">
          <div>
            <h3 className="text-2xl font-black text-white mb-3">SONHABER</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Türkiye'nin güvenilir ve hızlı haber kaynağı. Son dakika haberleri, gündem, spor, ekonomi ve daha fazlası için doğru adres.</p>
            <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm">
              <span>💬</span> WhatsApp ile İletişim
            </a>
          </div>
          <div>
            <h4 className="text-lg font-black text-white mb-4">Kategoriler</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Gündem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dünya', 'Sağlık', 'Kültür', 'Yaşam'].map(k => (
                <Link key={k} href={`/?kategori=${k}`}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  → {k}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-black text-white mb-4">Bizi Takip Edin</h4>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/sonhaber0165" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-sm font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="ig2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433"/>
                      <stop offset="50%" stopColor="#dc2743"/>
                      <stop offset="100%" stopColor="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig2)"/>
                  <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                </svg>
                Instagram
              </a>
              <a href="https://twitter.com/sonhaber263775" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="5" fill="black"/>
                  <path d="M17.5 3h3l-6.5 7.5L21 21h-5.5L11 14.5 5.5 21H2.5l7-8L3 3h5.5l4 6L17.5 3z" fill="white"/>
                </svg>
                Twitter / X
              </a>
              <a href="https://www.facebook.com/share/1AeXFntFTx/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="5" fill="#1877F2"/>
                  <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.8.4-1.5 1.5-1.5H17V4.5s-1.1-.2-2.2-.2c-2.3 0-3.8 1.4-3.8 3.9V10.5H8.5v3H11V21h2.5z" fill="white"/>
                </svg>
                Facebook
              </a>
              <a href="https://www.tiktok.com/@sonhaber4" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="5" fill="#010101"/>
                  <path d="M16.5 5.5c.7 1 1.8 1.7 3 1.8v2.5c-1 0-2-.3-2.8-.8v5.5c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.2 0 .5 0 .7.1v2.6c-.2-.1-.5-.1-.7-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V5.5h2.3z" fill="white"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
        <div className="px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2025 SonHaber. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">Ana Sayfa</Link>
            <Link href="/iletisim" className="text-gray-500 hover:text-white text-sm transition-colors">İletişim</Link>
            <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 text-sm transition-colors font-medium">Reklam Ver</a>
          </div>
        </div>
      </footer>
      </main>
    </div>
  )
}
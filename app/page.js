import Link from 'next/link'
import { fetchRSSNews } from '../lib/rss'
import { supabase } from '../lib/supabase'
import Arama from './components/Arama'
import SosyalMediaBar from './components/SosyalMediaBar'
import MobilMenu from './components/MobilMenu'
export const revalidate = 300
import KaranlikMod from './components/KaranlikMod'
import HaberSlider from './components/HaberSlider'
const SAYFA_BASI_HABER = 30

export async function generateMetadata({ searchParams }) {
  const { kategori, sayfa } = await searchParams
  const sayfaNo = parseInt(sayfa) || 1
  if (kategori && kategori !== 'Tümü') {
    return {
      title: sayfaNo > 1 ? `${kategori} Haberleri - Sayfa ${sayfaNo} | SonHaber` : `${kategori} Haberleri | SonHaber`,
      description: `${kategori} kategorisindeki son dakika haberleri SonHaber'de. Türkiye'nin en güncel haber kaynağı.`,
      alternates: { canonical: `https://sonhaber-rouge.vercel.app/?kategori=${kategori}${sayfaNo > 1 ? `&sayfa=${sayfaNo}` : ''}` }
    }
  }
  return {
    title: sayfaNo > 1 ? `Son Dakika Haberleri - Sayfa ${sayfaNo} | SonHaber` : 'SonHaber - Son Dakika Haberleri, Gündem, Spor, Ekonomi',
    description: 'Son dakika haberleri, gündem, spor, ekonomi, teknoloji ve daha fazlası SonHaber\'de. Türkiye\'nin en güncel haber kaynağı.',
    alternates: { canonical: `https://sonhaber-rouge.vercel.app${sayfaNo > 1 ? `?sayfa=${sayfaNo}` : ''}` }
  }
}

const kategoriler = ['Tümü', 'Gündem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dünya', 'Sağlık', 'Kültür', 'Yaşam']

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": "SonHaber",
  "url": "https://sonhaber-rouge.vercel.app",
  "description": "Son dakika haberleri, gündem, spor, ekonomi, teknoloji ve daha fazlası SonHaber'de.",
  "inLanguage": "tr-TR",
  "foundingLocation": {
    "@type": "Place",
    "name": "Adana, Türkiye"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Turkish"
  }
}

export default async function HomePage({ searchParams }) {
  const { kategori, sayfa } = await searchParams
  const sayfaNo = parseInt(sayfa) || 1

  const rssNews = await fetchRSSNews()
  
  const { data: customNews } = await supabase
    .from('articles')
    .select('*')
    .eq('is_custom', true)
    .order('priority_score', { ascending: false })

  let allNews = [...(customNews || []), ...rssNews]
  
  if (kategori && kategori !== 'Tümü') {
    allNews = allNews.filter(n => n.category === kategori)
  }

  const toplamHaber = allNews.length
  const toplamSayfa = Math.ceil(toplamHaber / SAYFA_BASI_HABER)
  const baslangic = (sayfaNo - 1) * SAYFA_BASI_HABER
  const sayfaHaberleri = sayfaNo === 1 ? allNews : allNews.slice(baslangic, baslangic + SAYFA_BASI_HABER)

  const kategoriParam = kategori && kategori !== 'Tümü' ? `&kategori=${kategori}` : ''
  const oncekiSayfa = sayfaNo > 1 ? `/?sayfa=${sayfaNo - 1}${kategoriParam}` : null
  const sonrakiSayfa = sayfaNo < toplamSayfa ? `/?sayfa=${sayfaNo + 1}${kategoriParam}` : null

  const gosterilecekHaberler = sayfaNo === 1 ? allNews.slice(8) : sayfaHaberleri

  const BuyukHaberVeYan = ({ buyukIndex, yanIndex1, yanIndex2 }) => {
    const liste = sayfaNo === 1 ? allNews.slice(8) : sayfaHaberleri
    const buyuk = liste[buyukIndex]
    const yan1 = liste[yanIndex1]
    const yan2 = liste[yanIndex2]
    if (!buyuk) return null
    return (
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="lg:w-1/2">
          <Link href={`/haber/${encodeURIComponent(buyuk.id)}`}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg relative" style={{height: '256px'}}>
                {buyuk.image_url ? (
                  <img src={buyuk.image_url} alt={buyuk.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-300 text-4xl font-black">SH</span>
                  </div>
                )}
              </div>
              <div className="pt-3">
                <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{buyuk.category}</span>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mt-1 mb-2 group-hover:text-red-600 transition-colors">{buyuk.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{__html: buyuk.content?.substring(0, 150) + '...'}} />
                <p className="text-xs text-gray-400 mt-2">{new Date(buyuk.created_at).toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="lg:w-1/2 flex flex-col gap-4">
          {[yan1, yan2].filter(Boolean).map((news, i) => (
            <Link key={i} href={`/haber/${encodeURIComponent(news.id)}`}>
              <div className="group cursor-pointer flex gap-3">
                <div className="overflow-hidden rounded-lg shrink-0" style={{width: '96px', height: '80px'}}>
                  {news.image_url ? (
                    <img src={news.image_url} alt={news.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-300 font-black">SH</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{news.category}</span>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-3 mt-1 group-hover:text-red-600 transition-colors">{news.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const KucukGrid = ({ haberler }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {haberler.map((news, index) => (
        <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg" style={{height: '144px'}}>
              {news.image_url ? (
                <img src={news.image_url} alt={news.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300 font-black text-xl">SH</span>
                </div>
              )}
            </div>
            <div className="pt-2">
              <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{news.category}</span>
              <h3 className="font-semibold text-gray-900 mt-1 text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">{news.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )

 const Sayfalama = () => (
    <div className="flex items-center justify-center gap-6 py-12 border-t-4 border-red-600 mt-8 bg-gray-50 rounded-xl">
      {oncekiSayfa ? (
        <Link href={oncekiSayfa} className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl transition-colors text-lg shadow-lg">
          ← Önceki
        </Link>
      ) : (
        <span className="flex items-center gap-3 bg-gray-200 text-gray-400 font-black px-8 py-4 rounded-xl cursor-not-allowed text-lg">
          ← Önceki
        </span>
      )}
      <div className="flex flex-col items-center">
        <span className="text-red-600 font-black text-3xl">{sayfaNo}</span>
        <span className="text-gray-400 text-sm font-semibold">/ {toplamSayfa} sayfa</span>
      </div>
      {sonrakiSayfa ? (
        <Link href={sonrakiSayfa} className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl transition-colors text-lg shadow-lg">
          Sonraki →
        </Link>
      ) : (
        <span className="flex items-center gap-3 bg-gray-200 text-gray-400 font-black px-8 py-4 rounded-xl cursor-not-allowed text-lg">
          Sonraki →
        </span>
      )}
    </div>
  )

  return (
    <div style={{background: '#f8f8f8', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 30px rgba(0,0,0,0.08)'}}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100">
        <div className="px-6 py-5 flex items-center justify-between">
          <Link href="/">
            <div style={{borderLeft: '5px solid #c0392b', paddingLeft: '12px', cursor: 'pointer'}}>
              <div style={{display: 'flex', alignItems: 'baseline'}}>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '32px', fontWeight: '900', color: '#c0392b'}}>SON</span>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '32px', fontWeight: '900', color: '#111'}}>HABER</span>
              </div>
              <span style={{fontSize: '11px', color: '#999', letterSpacing: '3px', fontWeight: '700'}}>TÜRKİYE'NİN SESİ</span>
            </div>
          </Link>
          <KaranlikMod />
          <nav className="hidden md:flex items-center gap-6 text-base font-semibold text-gray-600">
            <Link href="/" className="hover:text-red-600 transition-colors px-2 py-1">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="hover:text-red-600 transition-colors px-2 py-1">Hakkımızda</Link>
            <Link href="/iletisim" className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-bold text-base">İletişim</Link>
          </nav>
          <MobilMenu />
        </div>
        <div className="px-6 py-2 text-xs text-gray-400 border-t border-gray-50">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="px-6 py-2 border-t border-gray-100">
          <Arama haberler={allNews} />
        </div>
      </header>

      <SosyalMediaBar />

      <div className="bg-gray-50 border-b border-gray-100 px-6 py-1.5 text-xs text-gray-400 flex items-center justify-between">
        <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} — {new Date().toLocaleDateString('tr-TR')}</span>
        <span className="flex items-center gap-1">
  <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
  Güncel
</span>
      </div>

      {/* SON DAKİKA */}
      <div className="bg-red-600 text-white py-2.5 px-6 flex items-center gap-3 overflow-hidden">
        <span className="text-xs font-bold uppercase tracking-widest shrink-0 bg-white text-red-600 px-2 py-0.5 rounded">Son Dakika</span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {allNews.slice(0, 8).map((h, i) => (
              <a key={i} href={`/haber/${encodeURIComponent(h.id)}`} className="text-sm hover:underline shrink-0">
                {h.title}
              </a>
            ))}
            {allNews.slice(0, 8).map((h, i) => (
              <a key={`b${i}`} href={`/haber/${encodeURIComponent(h.id)}`} className="text-sm hover:underline shrink-0">
                {h.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* KATEGORİLER */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
           {kategoriler.map(k => (
  <Link key={k} href={k === 'Tümü' ? '/' : `/${k === 'Gündem' ? 'gundem' : k === 'Dünya' ? 'dunya' : k === 'Sağlık' ? 'saglik' : k === 'Kültür' ? 'kultur' : k === 'Yaşam' ? 'yasam' : k.toLowerCase()}`}
                className={`shrink-0 px-7 py-3 text-base font-bold transition-colors rounded-full ${
                  (k === 'Tümü' && !kategori) || kategori === k
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200'
                }`}>
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>
{sayfaNo === 1 && <HaberSlider haberler={allNews} />}
      {/* ANA İÇERİK */}
      <div className="px-6 py-6 bg-white">

        {sayfaNo === 1 && (
          <>
            {/* Ana haber + sağ liste - sadece 1. sayfada */}
            <div className="flex flex-col lg:flex-row gap-6 mb-10 pb-8 border-b border-gray-100">
              <div className="lg:w-3/5">
                {allNews[0] && (
                  <Link href={`/haber/${encodeURIComponent(allNews[0].id)}`}>
                    <div className="group cursor-pointer">
                      <div className="overflow-hidden rounded-xl" style={{height: '320px'}}>
                        {allNews[0].image_url ? (
                          <img src={allNews[0].image_url} alt={allNews[0].title} fetchpriority="high" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-gray-300 text-5xl font-black">SH</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-4">
                        <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{allNews[0].category}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mt-1 mb-2 group-hover:text-red-600 transition-colors">{allNews[0].title}</h2>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{__html: allNews[0].content?.substring(0, 200) + '...'}} />
                        <p className="text-xs text-gray-400 mt-3">{new Date(allNews[0].created_at).toLocaleDateString('tr-TR')}</p>
                        <div className="mt-4">
                          <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">
                            Haberin Devamını Oku →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="lg:w-2/5 flex flex-col gap-5">
                {allNews.slice(1, 8).map((news, index) => (
                  <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                    <div className="group cursor-pointer flex gap-3 pb-4 border-b border-gray-50 last:border-0">
                      <div className="overflow-hidden rounded-lg shrink-0" style={{width: '80px', height: '64px'}}>
                        {news.image_url ? (
                          <img src={news.image_url} alt={news.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-300 font-black text-sm">SH</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{news.category}</span>
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mt-0.5 group-hover:text-red-600 transition-colors">{news.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Diğer Haberler */}
        <div className="pt-2">
          <h2 className="text-base font-bold text-gray-500 uppercase tracking-widest mb-6 pb-2 border-b border-gray-100">
            {sayfaNo === 1 ? 'Diğer Haberler' : `Haberler - Sayfa ${sayfaNo}`}
          </h2>
          <KucukGrid haberler={gosterilecekHaberler.slice(0, 7)} />
          <BuyukHaberVeYan buyukIndex={7} yanIndex1={8} yanIndex2={9} />
          <KucukGrid haberler={gosterilecekHaberler.slice(10, 17)} />
          <BuyukHaberVeYan buyukIndex={17} yanIndex1={18} yanIndex2={19} />
          <KucukGrid haberler={gosterilecekHaberler.slice(20, 30)} />
        </div>

        <Sayfalama />
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white mt-4">
        <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800">
          <div>
            <div style={{borderLeft: '4px solid #c0392b', paddingLeft: '10px', marginBottom: '12px'}}>
              <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '22px', fontWeight: '900', color: '#fff'}}>SON</span>
              <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '22px', fontWeight: '900', color: '#c0392b'}}>HABER</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Türkiye'nin güvenilir ve hızlı haber kaynağı.</p>
            <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-lg transition-colors text-base">
              <span>💬</span> WhatsApp ile Ulaş
            </a>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Kategoriler</h4>
            <div className="grid grid-cols-2 gap-2">
            {[
  { ad: 'Gündem', url: '/gundem' },
  { ad: 'Spor', url: '/spor' },
  { ad: 'Ekonomi', url: '/ekonomi' },
  { ad: 'Teknoloji', url: '/teknoloji' },
  { ad: 'Dünya', url: '/dunya' },
  { ad: 'Sağlık', url: '/saglik' },
  { ad: 'Kültür', url: '/kultur' },
  { ad: 'Yaşam', url: '/yasam' },
].map(k => (
  <Link key={k.ad} href={k.url} className="text-gray-400 hover:text-red-400 transition-colors text-base font-medium">
    {k.ad}
  </Link>
))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Takip Edin</h4>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com/sonhaber0165" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-base">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <defs><linearGradient id="ig2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig2)"/>
                  <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                </svg>
                Instagram
              </a>
              <a href="https://twitter.com/sonhaber263775" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors text-base">
                <svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="black"/><path d="M17.5 3h3l-6.5 7.5L21 21h-5.5L11 14.5 5.5 21H2.5l7-8L3 3h5.5l4 6L17.5 3z" fill="white"/></svg>
                Twitter / X
              </a>
              <a href="https://www.facebook.com/share/1AeXFntFTx/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors text-base">
                <svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1877F2"/><path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.8.4-1.5 1.5-1.5H17V4.5s-1.1-.2-2.2-.2c-2.3 0-3.8 1.4-3.8 3.9V10.5H8.5v3H11V21h2.5z" fill="white"/></svg>
                Facebook
              </a>
              <a href="https://www.tiktok.com/@sonhaber4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-base">
                <svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#010101"/><path d="M16.5 5.5c.7 1 1.8 1.7 3 1.8v2.5c-1 0-2-.3-2.8-.8v5.5c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.2 0 .5 0 .7.1v2.6c-.2-.1-.5-.1-.7-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V5.5h2.3z" fill="white"/></svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
        <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-base text-gray-400">
          <p>© 2026 SonHaber. Tüm hakları saklıdır.</p>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors font-medium">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="hover:text-white transition-colors font-medium">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-white transition-colors font-medium">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-white transition-colors font-medium">Gizlilik</Link>
            <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors font-medium">Reklam Ver</a>
          </div>
        </div>
      </footer>
      </main>
    </div>
  )
}
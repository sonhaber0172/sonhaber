import Link from 'next/link'
import Arama from './Arama'
import SosyalMediaBar from './SosyalMediaBar'

const SAYFA_BASI_HABER = 28

export default function KategoriSayfasi({ haberler, kategoriAdi, sayfaNo, toplamSayfa, oncekiSayfa, sonrakiSayfa }) {

  const anaHaber = haberler[0]
  const yanHaberler = haberler.slice(1, 4)
  const digerHaberler = haberler.slice(4)

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
            <nav className="hidden md:flex items-center gap-6 text-base font-semibold text-gray-600">
              <Link href="/" className="hover:text-red-600 transition-colors px-2 py-1">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="hover:text-red-600 transition-colors px-2 py-1">Hakkımızda</Link>
              <Link href="/iletisim" className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-bold">İletişim</Link>
            </nav>
            <nav className="flex md:hidden gap-4 text-sm font-semibold text-gray-600">
              <Link href="/" className="hover:text-red-600">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="hover:text-red-600">Hakkımızda</Link>
              <Link href="/iletisim" className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700">İletişim</Link>
            </nav>
          </div>
          <div className="px-6 py-2 text-xs text-gray-400 border-t border-gray-50">
            {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="px-6 py-2 border-t border-gray-100">
            <Arama haberler={haberler} />
          </div>
        </header>

        <SosyalMediaBar />

        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <span style={{display:'inline-block', width:'5px', height:'28px', background:'#c0392b', borderRadius:'3px'}}></span>
          <h1 className="text-2xl font-black text-gray-900">{kategoriAdi} Haberleri</h1>
          <span className="text-gray-400 text-sm font-medium ml-2">{haberler.length} haber</span>
        </div>

        <div className="px-6 py-6 bg-white">
          {anaHaber && sayfaNo === 1 && (
            <div className="flex flex-col lg:flex-row gap-6 mb-10 pb-8 border-b border-gray-100">
              <div className="lg:w-3/5">
                <Link href={`/haber/${encodeURIComponent(anaHaber.id)}`}>
                  <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-xl" style={{height: '300px'}}>
                      {anaHaber.image_url ? (
                        <img src={anaHaber.image_url} alt={anaHaber.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-gray-300 text-5xl font-black">SH</span>
                        </div>
                      )}
                    </div>
                    <div className="pt-4">
                      <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{anaHaber.category}</span>
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight mt-1 mb-2 group-hover:text-red-600 transition-colors">{anaHaber.title}</h2>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{__html: anaHaber.content?.substring(0, 200) + '...'}} />
                      <p className="text-xs text-gray-400 mt-3">{new Date(anaHaber.created_at).toLocaleDateString('tr-TR')}</p>
                      <div className="mt-4">
                        <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">
                          Haberin Devamını Oku →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="lg:w-2/5 flex flex-col gap-5">
                {yanHaberler.map((news, index) => (
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
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {digerHaberler.map((news, index) => (
              <Link key={index} href={`/haber/${encodeURIComponent(news.id)}`}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg" style={{height: '160px'}}>
                    {news.image_url ? (
                      <img src={news.image_url} alt={news.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-300 font-black text-xl">SH</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-gray-900 mt-1 text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">{news.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{new Date(news.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Sayfalama />
        </div>

        <footer className="bg-gray-900 text-white mt-4">
          <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800">
            <div>
              <div style={{borderLeft: '4px solid #c0392b', paddingLeft: '10px', marginBottom: '12px'}}>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '20px', fontWeight: '900', color: '#fff'}}>SON</span>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '20px', fontWeight: '900', color: '#c0392b'}}>HABER</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Türkiye'nin güvenilir ve hızlı haber kaynağı.</p>
              <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                <span>💬</span> WhatsApp
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
                  <Link key={k.ad} href={k.url} className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                    {k.ad}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Bağlantılar</h4>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Ana Sayfa</Link>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors text-sm">Hakkımızda</Link>
                <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors text-sm">İletişim</Link>
                <Link href="/gizlilik" className="text-gray-400 hover:text-white transition-colors text-sm">Gizlilik</Link>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 flex flex-col items-center gap-3 text-sm text-gray-400">
            <p>© 2026 HaberSon. Tüm hakları saklıdır.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
              <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik</Link>
              <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors">Reklam Ver</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
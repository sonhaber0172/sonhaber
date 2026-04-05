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

  const haberUrl = `https://sonhaber-rouge.vercel.app/haber/${encodeURIComponent(id)}`
  const haberBaslik = haber?.title || ''
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(haberBaslik)}&url=${encodeURIComponent(haberUrl)}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(haberBaslik + ' ' + haberUrl)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(haberUrl)}`

  if (!haber) {
    return (
      <div style={{background: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
        <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 40px rgba(0,0,0,0.15)'}}>
          <header className="bg-white border-b border-gray-100">
            <div className="px-6 py-4">
              <Link href="/">
                <div style={{borderLeft: '5px solid #c0392b', paddingLeft: '12px', cursor: 'pointer', display: 'inline-block'}}>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '24px', fontWeight: '900', color: '#c0392b'}}>SON</span>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '24px', fontWeight: '900', color: '#111'}}>HABER</span>
                </div>
              </Link>
            </div>
          </header>
          <div className="px-4 py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Haber bulunamadı</h2>
            <Link href="/" className="text-red-600 mt-4 block">Ana sayfaya dön</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{background: '#f8f8f8', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 30px rgba(0,0,0,0.08)'}}>

        {/* HEADER */}
        <header className="bg-white border-b border-gray-100">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <div style={{borderLeft: '5px solid #c0392b', paddingLeft: '12px', cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '24px', fontWeight: '900', color: '#c0392b'}}>SON</span>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '24px', fontWeight: '900', color: '#111'}}>HABER</span>
                </div>
                <span style={{fontSize: '9px', color: '#999', letterSpacing: '3px', fontWeight: '600'}}>TÜRKİYE'NİN SESİ</span>
              </div>
            </Link>
            <nav className="flex gap-4 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-red-600 transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="hover:text-red-600 transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="hover:text-red-600 transition-colors">İletişim</Link>
            </nav>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row">

          {/* Sol - Ana Haber */}
          <div className="lg:w-3/5 py-6 px-6 border-r border-gray-100">
            {haber.image_url && (
              <img src={haber.image_url} alt={haber.title} className="w-full h-48 md:h-64 object-cover mb-4 rounded-xl" />
            )}
            <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">{haber.category}</span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 mb-2 leading-tight">{haber.title}</h1>
            <p className="text-gray-400 text-xs mb-4 border-b border-gray-100 pb-3">
              {new Date(haber.created_at).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="text-gray-700 leading-relaxed text-base"
              dangerouslySetInnerHTML={{__html: haber.content}} />

            {/* PAYLAŞIM BUTONLARI */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Bu haberi paylaş</p>
              <div className="flex gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Link href="/" className="text-red-600 hover:text-red-700 font-medium text-sm">
                ← Ana sayfaya dön
              </Link>
              {haber.source_url && !haber.is_custom && (
                <a href={haber.source_url} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 text-sm">
                  Kaynak habere git
                </a>
              )}
            </div>

            {/* Bunları da Okuyun */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Bunları da Okuyun</h2>
              <div className="grid grid-cols-2 gap-3">
                {altHaberler.map((h, i) => (
                  <Link key={i} href={`/haber/${encodeURIComponent(h.id)}`}>
                    <div className="group cursor-pointer">
                      <div className="overflow-hidden rounded-lg">
                        {h.image_url ? (
                          <img src={h.image_url} alt={h.title} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-300 font-black">SH</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{h.category}</span>
                        <p className="text-xs font-semibold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-red-600 transition-colors">{h.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ - Diğer Haberler */}
          <div className="lg:w-2/5 px-4 py-6 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Diğer Haberler</h2>
            <div className="grid grid-cols-2 gap-3">
              {sagHaberler.map((h, i) => (
                <Link key={i} href={`/haber/${encodeURIComponent(h.id)}`}>
                  <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-lg">
                      {h.image_url ? (
                        <img src={h.image_url} alt={h.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-300 font-black">SH</span>
                        </div>
                      )}
                    </div>
                    <div className="pt-2">
                      <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">{h.category}</span>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-red-600 transition-colors">{h.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-4 text-sm">
          <p className="font-bold text-white text-lg mb-1">SONHABER</p>
          <p>© 2025 SonHaber. Tüm hakları saklıdır.</p>
          <Link href="/iletisim" className="text-red-400 hover:text-red-300 mt-2 block font-medium">İletişim için tıklayın</Link>
        </footer>
      </main>
    </div>
  )
}
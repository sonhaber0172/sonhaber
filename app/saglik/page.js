import { fetchRSSNews } from '../../lib/rss'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'
import Arama from '../components/Arama'
import SosyalMediaBar from '../components/SosyalMediaBar'

export const revalidate = 300

export async function generateMetadata() {
  return {
    title: 'Sağlık Haberleri | SonHaber - Son Dakika Sağlık',
    description: 'Son dakika sağlık haberleri SonHaber\'de. Sağlık, tıp ve yaşam haberleri.',
    alternates: { canonical: 'https://sonhaber-rouge.vercel.app/saglik' }
  }
}

export default async function SaglikPage() {
  const kategori = 'Sağlık'
  const rssNews = await fetchRSSNews()
  const { data: customNews } = await supabase.from('articles').select('*').eq('is_custom', true).order('priority_score', { ascending: false })
  let allNews = [...(customNews || []), ...rssNews].filter(n => n.category === kategori)

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
          </div>
          <div className="px-6 py-2 border-t border-gray-100">
            <Arama haberler={allNews} />
          </div>
        </header>
        <SosyalMediaBar />
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <span style={{display:'inline-block', width:'5px', height:'28px', background:'#c0392b', borderRadius:'3px'}}></span>
          <h1 className="text-2xl font-black text-gray-900">Sağlık Haberleri</h1>
          <span className="text-gray-400 text-sm font-medium ml-2">{allNews.length} haber</span>
        </div>
        <div className="px-6 py-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allNews.map((news, index) => (
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
        </div>
        <footer className="bg-gray-900 text-white mt-4 px-8 py-6 flex items-center justify-between text-sm text-gray-400">
          <p>© 2026 SonHaber. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link>
            <Link href="/iletisim" className="hover:text-white">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-white">Gizlilik</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
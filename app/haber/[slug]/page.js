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

  if (!haber) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="bg-red-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Link href="/"><h1 className="text-3xl font-bold text-white cursor-pointer">SONHABER</h1></Link>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Haber bulunamadi</h2>
          <Link href="/" className="text-red-600 mt-4 block">Ana sayfaya don</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/"><h1 className="text-2xl md:text-3xl font-black cursor-pointer">SONHABER</h1></Link>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/iletisim" className="hover:text-red-200">Iletisim</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {haber.image_url && (
            <img src={haber.image_url} alt={haber.title} className="w-full h-64 md:h-96 object-cover" />
          )}
          <div className="p-6 md:p-8">
            <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded">{haber.category}</span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mt-4 mb-3 leading-tight">{haber.title}</h1>
            <p className="text-gray-400 text-sm mb-6 border-b border-gray-100 pb-4">
              {new Date(haber.created_at).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="text-gray-700 leading-relaxed text-lg prose max-w-none"
              dangerouslySetInnerHTML={{__html: haber.content}} />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Link href="/" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
            ← Ana sayfaya don
          </Link>
          {haber.source_url && !haber.is_custom && (
            <a href={haber.source_url} target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 text-sm">
              Kaynak habere git
            </a>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
        <p>2025 SonHaber. Tum haklari saklidir.</p>
      </footer>
    </main>
  )
}
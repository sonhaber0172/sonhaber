import { fetchRSSNews } from '../../../lib/rss'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'

export default async function HaberDetay({ params }) {
  const slug = decodeURIComponent(params.slug)
  
  const rssNews = await fetchRSSNews()
  const { data: customNews } = await supabase
    .from('articles')
    .select('*')
    .eq('is_custom', true)

  const allNews = [...(customNews || []), ...rssNews]
  
  const haber = allNews.find(h => {
    try {
      return encodeURIComponent(h.title) === slug || 
             h.title === slug ||
             encodeURIComponent(h.title).substring(0, 100) === slug.substring(0, 100)
    } catch(e) {
      return false
    }
  })

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
    <main className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/"><h1 className="text-3xl font-bold cursor-pointer">SONHABER</h1></Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/paketler" className="hover:text-red-200">Reklam Paketleri</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">{haber.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-4 leading-tight">{haber.title}</h1>
          <p className="text-gray-400 text-sm mb-6">
            {new Date(haber.created_at).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {haber.image_url && (
            <img src={haber.image_url} alt={haber.title} className="w-full h-96 object-cover rounded-lg mb-6" />
          )}
          <div className="text-gray-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{__html: haber.content}} />
          {haber.source_url && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <a href={haber.source_url} target="_blank" rel="noopener noreferrer" 
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 inline-block">
                Haberin devamini oku
              </a>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Link href="/" className="text-red-600 hover:text-red-700 font-medium">Ana sayfaya don</Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
        <p>2025 SonHaber. Tum haklari saklidir.</p>
      </footer>
    </main>
  )
}
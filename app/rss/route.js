import { fetchRSSNews } from '../../lib/rss'
import { supabase } from '../../lib/supabase'

export const revalidate = 300

export async function GET() {
  const [rssNews, customNewsResult] = await Promise.all([
    fetchRSSNews(),
    supabase.from('articles').select('*').eq('is_custom', true).order('priority_score', { ascending: false }).limit(50)
  ])

  const tumHaberler = [...(customNewsResult.data || []), ...rssNews].slice(0, 50)

  const items = tumHaberler.map(haber => {
    const url = `https://HaberSon-rouge.vercel.app/haber/${encodeURIComponent(haber.id)}`
    const tarih = new Date(haber.created_at).toUTCString()
    const icerik = haber.content?.replace(/<[^>]*>/g, '').substring(0, 300) || ''
    return `
    <item>
      <title><![CDATA[${haber.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${tarih}</pubDate>
      <category><![CDATA[${haber.category || 'Gündem'}]]></category>
      <description><![CDATA[${icerik}]]></description>
      ${haber.image_url ? `<enclosure url="${haber.image_url}" type="image/jpeg" />` : ''}
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HaberSon - Son Dakika Haberleri</title>
    <link>https://HaberSon-rouge.vercel.app</link>
    <description>Son dakika haberleri, gündem, spor, ekonomi ve daha fazlası HaberSon'de.</description>
    <language>tr</language>
    <atom:link href="https://HaberSon-rouge.vercel.app/rss" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
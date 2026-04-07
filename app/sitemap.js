import { fetchRSSNews } from '../lib/rss'
import { supabase } from '../lib/supabase'

export const revalidate = 300

export default async function sitemap() {
  const baseUrl = 'https://sonhaber-rouge.vercel.app'

  const [rssNews, customNewsResult] = await Promise.all([
    fetchRSSNews(),
    supabase.from('articles').select('id, created_at').eq('is_custom', true)
  ])

  const tumHaberler = [...(customNewsResult.data || []), ...rssNews]

  const haberUrls = tumHaberler.map(haber => ({
    url: `${baseUrl}/haber/${encodeURIComponent(haber.id)}`,
    lastModified: new Date(haber.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...haberUrls,
  ]
}
let rssCache = null
let rssCacheTime = 0
const CACHE_SURE = 5 * 60 * 1000

export async function fetchRSSNews() {
  const simdi = Date.now()
  
  if (rssCache && (simdi - rssCacheTime) < CACHE_SURE) {
    return rssCache
  }

  try {
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.trthaber.com%2Fsondakika.rss', {
      next: { revalidate: 300 }
    })
    const data = await res.json()
    if (data.items) {
      const haberler = data.items.map((item) => ({
        id: Buffer.from(item.link).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 50),
        title: item.title,
        content: item.description,
        image_url: item.thumbnail || '',
        source_url: item.link,
        category: 'Gundem',
        is_custom: false,
        created_at: item.pubDate,
      }))
      rssCache = haberler
      rssCacheTime = simdi
      return haberler
    }
  } catch (err) {
    console.error('RSS error:', err)
    if (rssCache) return rssCache
  }
  return []
}
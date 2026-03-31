export async function fetchRSSNews() {
  try {
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.trthaber.com%2Fsondakika.rss')
    const data = await res.json()
    if (data.items) {
      return data.items.map((item) => ({
        title: item.title,
        content: item.description,
        image_url: item.thumbnail || '',
        source_url: item.link,
        category: 'Gundem',
        is_custom: false,
        created_at: item.pubDate,
      }))
    }
  } catch (err) {
    console.error('RSS error:', err)
  }
  return []
}
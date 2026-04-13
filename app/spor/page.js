import { fetchRSSNews } from '../../lib/rss'
import { supabase } from '../../lib/supabase'
import KategoriSayfasi from '../components/KategoriSayfasi'

export const revalidate = 300

export async function generateMetadata() {
  return {
    title: 'Spor Haberleri | HaberSon - Son Dakika Spor',
    description: 'Son dakika spor haberleri HaberSon\'de. Futbol, basketbol ve daha fazlası.',
    alternates: { canonical: 'https://HaberSon-rouge.vercel.app/spor' }
  }
}

export default async function SporPage({ searchParams }) {
  const { sayfa } = await searchParams
  const sayfaNo = parseInt(sayfa) || 1
  const SAYFA_BASI = 28

  const rssNews = await fetchRSSNews()
  const { data: customNews } = await supabase.from('articles').select('*').eq('is_custom', true).order('priority_score', { ascending: false })
  const tumHaberler = [...(customNews || []), ...rssNews].filter(n => n.category === 'Spor')

  const toplamSayfa = Math.ceil(tumHaberler.length / SAYFA_BASI)
  const baslangic = (sayfaNo - 1) * SAYFA_BASI
  const haberler = tumHaberler.slice(baslangic, baslangic + SAYFA_BASI)

  const oncekiSayfa = sayfaNo > 1 ? `/spor?sayfa=${sayfaNo - 1}` : null
  const sonrakiSayfa = sayfaNo < toplamSayfa ? `/spor?sayfa=${sayfaNo + 1}` : null

  return <KategoriSayfasi haberler={haberler} kategoriAdi="Spor" sayfaNo={sayfaNo} toplamSayfa={toplamSayfa} oncekiSayfa={oncekiSayfa} sonrakiSayfa={sonrakiSayfa} />
}
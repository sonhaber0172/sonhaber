import { fetchRSSNews } from '../../lib/rss'
import { supabase } from '../../lib/supabase'
import KategoriSayfasi from '../components/KategoriSayfasi'

export const revalidate = 300

export async function generateMetadata() {
  return {
    title: 'Kültür Haberleri | SonHaber - Son Dakika Kültür Sanat',
    description: 'Son dakika kültür ve sanat haberleri SonHaber\'de. Sinema, müzik, tiyatro ve daha fazlası.',
    alternates: { canonical: 'https://sonhaber-rouge.vercel.app/kultur' }
  }
}

export default async function KulturPage({ searchParams }) {
  const { sayfa } = await searchParams
  const sayfaNo = parseInt(sayfa) || 1
  const SAYFA_BASI = 28
  const rssNews = await fetchRSSNews()
  const { data: customNews } = await supabase.from('articles').select('*').eq('is_custom', true).order('priority_score', { ascending: false })
  const tumHaberler = [...(customNews || []), ...rssNews].filter(n => n.category === 'Kültür')
  const toplamSayfa = Math.ceil(tumHaberler.length / SAYFA_BASI)
  const baslangic = (sayfaNo - 1) * SAYFA_BASI
  const haberler = tumHaberler.slice(baslangic, baslangic + SAYFA_BASI)
  const oncekiSayfa = sayfaNo > 1 ? `/kultur?sayfa=${sayfaNo - 1}` : null
  const sonrakiSayfa = sayfaNo < toplamSayfa ? `/kultur?sayfa=${sayfaNo + 1}` : null
  return <KategoriSayfasi haberler={haberler} kategoriAdi="Kültür" sayfaNo={sayfaNo} toplamSayfa={toplamSayfa} oncekiSayfa={oncekiSayfa} sonrakiSayfa={sonrakiSayfa} />
}
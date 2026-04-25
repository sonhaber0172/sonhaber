import { supabase } from '../../lib/supabase'
import KategoriSayfasi from '../components/KategoriSayfasi'

export const revalidate = 300

export async function generateMetadata() {
  return {
    title: 'Gündem Haberleri | HaberSon - Son Dakika Gündem',
    description: 'Son dakika gündem haberleri HaberSon\'de. Türkiye\'nin en güncel gündem haber kaynağı.',
    alternates: { canonical: 'https://sonhaber-rouge.vercel.app/gundem' }
  }
}

export default async function GundemPage({ searchParams }) {
  const { sayfa } = await searchParams
  const sayfaNo = parseInt(sayfa) || 1
  const SAYFA_BASI = 28
  const { data: customNews } = await supabase.from('articles').select('*').eq('is_custom', true).order('priority_score', { ascending: false })
  const tumHaberler = (customNews || []).filter(n => n.category === 'Gündem')
  const toplamSayfa = Math.ceil(tumHaberler.length / SAYFA_BASI)
  const baslangic = (sayfaNo - 1) * SAYFA_BASI
  const haberler = tumHaberler.slice(baslangic, baslangic + SAYFA_BASI)
  const oncekiSayfa = sayfaNo > 1 ? `/gundem?sayfa=${sayfaNo - 1}` : null
  const sonrakiSayfa = sayfaNo < toplamSayfa ? `/gundem?sayfa=${sayfaNo + 1}` : null
  return <KategoriSayfasi haberler={haberler} kategoriAdi="Gündem" sayfaNo={sayfaNo} toplamSayfa={toplamSayfa} oncekiSayfa={oncekiSayfa} sonrakiSayfa={sonrakiSayfa} />
}
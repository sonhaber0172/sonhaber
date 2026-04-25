import { supabase } from '../../lib/supabase'
import KategoriSayfasi from '../components/KategoriSayfasi'

export const revalidate = 300

export async function generateMetadata() {
  return {
    title: 'Teknoloji Haberleri | HaberSon - Son Dakika Teknoloji',
    description: 'Son dakika teknoloji haberleri HaberSon\'de. Yapay zeka, telefon, bilgisayar ve daha fazlası.',
    alternates: { canonical: 'https://sonhaber-rouge.vercel.app/teknoloji' }
  }
}

export default async function TeknolojiPage({ searchParams }) {
  const { sayfa } = await searchParams
  const sayfaNo = parseInt(sayfa) || 1
  const SAYFA_BASI = 28
  const { data: customNews } = await supabase.from('articles').select('*').eq('is_custom', true).order('priority_score', { ascending: false })
  const tumHaberler = (customNews || []).filter(n => n.category === 'Teknoloji')
  const toplamSayfa = Math.ceil(tumHaberler.length / SAYFA_BASI)
  const baslangic = (sayfaNo - 1) * SAYFA_BASI
  const haberler = tumHaberler.slice(baslangic, baslangic + SAYFA_BASI)
  const oncekiSayfa = sayfaNo > 1 ? `/teknoloji?sayfa=${sayfaNo - 1}` : null
  const sonrakiSayfa = sayfaNo < toplamSayfa ? `/teknoloji?sayfa=${sayfaNo + 1}` : null
  return <KategoriSayfasi haberler={haberler} kategoriAdi="Teknoloji" sayfaNo={sayfaNo} toplamSayfa={toplamSayfa} oncekiSayfa={oncekiSayfa} sonrakiSayfa={sonrakiSayfa} />
}
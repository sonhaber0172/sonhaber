import Link from 'next/link'

const paketler = [
  {
    isim: 'Baslangic Paketi',
    fiyat: '1.500',
    sure: '1 Hafta',
    ozellikler: ['1 adet haber yayini','Ana sayfada 1 gun one cikarma','Sosyal medya paylasimi','Haber arsivde kalir'],
    renk: 'border-blue-400',
    butonRenk: 'bg-blue-600 hover:bg-blue-700',
    mesaj: 'Merhaba, Baslangic Paketi icin reklamdan geliyorum.',
  },
  {
    isim: 'Profesyonel Paket',
    fiyat: '6.000',
    sure: '1 Ay',
    ozellikler: ['4 adet haber yayini','Ana sayfada 1 hafta one cikarma','Sosyal medya paylasimi','SEO optimizasyonu','Haber arsivde kalir','Istatistik raporu'],
    renk: 'border-red-500',
    butonRenk: 'bg-red-600 hover:bg-red-700',
    mesaj: 'Merhaba, Profesyonel Paket icin reklamdan geliyorum.',
    populer: true,
  },
  {
    isim: 'Kurumsal Paket',
    fiyat: '10.000',
    sure: '3 Ay',
    ozellikler: ['Sinırsiz haber yayini','Surekli ana sayfa one cikarma','Sosyal medya yonetimi','SEO optimizasyonu','Ozel haber kategorisi','Aylik detayli rapor','Oncelikli destek'],
    renk: 'border-yellow-500',
    butonRenk: 'bg-yellow-600 hover:bg-yellow-700',
    mesaj: 'Merhaba, Kurumsal Paket icin reklamdan geliyorum.',
  },
]

export default function PaketlerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SONHABER</h1>
            <p className="text-red-200 text-sm">Turkiye'nin Haber Merkezi</p>
          </div>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
            <Link href="/paketler" className="hover:text-red-200">Reklam Paketleri</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Reklam Paketleri</h2>
          <p className="text-gray-500 mt-3 text-lg">Markanizi milyonlara duyurun.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paketler.map((paket, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-lg border-t-4 ${paket.renk} p-8 relative`}>
              {paket.populer && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">EN POPULER</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">{paket.isim}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{paket.fiyat}</span>
                <span className="text-gray-500"> TL / {paket.sure}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {paket.ozellikler.map((ozellik, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500 font-bold">v</span>
                    {ozellik}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/05419123828?text=${encodeURIComponent(paket.mesaj)}`} target="_blank" rel="noopener noreferrer"
                className={`block w-full text-center text-white font-bold py-3 px-6 rounded-xl ${paket.butonRenk}`}>
                WhatsApp ile Iletisime Gec
              </a>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
        <p>2025 SonHaber. Tum haklari saklidir.</p>
      </footer>
    </main>
  )
}
import Link from 'next/link'

export default function HakkimizdaPage() {
  return (
    <div style={{background: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 40px rgba(0,0,0,0.15)'}}>
        
        <header className="bg-red-700 text-white shadow-lg">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <div style={{background: 'white', borderRadius: '8px', padding: '8px 16px', borderLeft: '8px solid #a93226', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '30px', fontWeight: '900', color: '#c0392b'}}>SON</span>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '30px', fontWeight: '900', color: '#1a1a1a'}}>HABER</span>
                </div>
                <span style={{fontSize: '10px', color: '#c0392b', letterSpacing: '3px', fontWeight: '600'}}>TÜRKİYE'NİN SESİ</span>
              </div>
            </Link>
            <nav className="hidden md:flex gap-8 text-base font-medium">
              <Link href="/" className="hover:text-red-200 transition-colors">Ana Sayfa</Link>
              <Link href="/iletisim" className="bg-white text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">İletişim</Link>
            </nav>
            <nav className="flex md:hidden gap-3 text-sm font-medium">
              <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
              <Link href="/iletisim" className="hover:text-red-200">İletişim</Link>
            </nav>
          </div>
        </header>

        <div className="px-6 md:px-16 py-12">
          
          {/* Üst Banner */}
          <div className="bg-red-700 rounded-2xl p-10 mb-12 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-4">HaberSon Hakkında</h1>
            <p className="text-red-200 text-lg md:text-xl max-w-2xl mx-auto">
              Türkiye'nin en hızlı ve en güvenilir haber kaynağı olma yolunda kararlı adımlarla ilerliyoruz.
            </p>
          </div>

          {/* Kim Biz */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl font-black text-gray-900">BİZ KİMİZ?</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              HaberSon, 2026 yılında Adana'dan yola çıkarak Türkiye'nin dijital haber dünyasına güçlü bir giriş yapan bağımsız bir haber platformudur. Amacımız tek: Doğru haberi, doğru zamanda, doğrudan sizinle buluşturmak.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Gündem, spor, ekonomi, teknoloji, dünya ve daha pek çok alanda sunduğumuz içeriklerle okuyucularımızı her an bilgili ve bilinçli tutmayı hedefliyoruz. Sansasyondan uzak, gerçeğe yakın habercilik anlayışımızla fark yaratıyoruz.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              HaberSon, büyük medya kuruluşlarının gölgesinde kalmayı reddeden, cesur ve bağımsız bir ses olmayı seçmiştir. Türkiye'nin dört bir yanından okurlara ulaşan platformumuz, her geçen gün büyümeye ve güçlenmeye devam ediyor.
            </p>
          </div>

          {/* Kurucumuz */}
          <div className="mb-12 bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl font-black text-gray-900">KURUCUMUZ</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white text-3xl font-black">SK</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Soner Kaçuk</h3>
                <p className="text-red-600 font-bold mb-3">Kurucu & Genel Yayın Yönetmeni — Adana</p>
                <p className="text-gray-700 leading-relaxed">
                  Dijital medyaya olan tutkusu ve Türkiye'de bağımsız haberciliğe duyduğu inanç ile HaberSon'i hayata geçiren Soner Kaçuk, platformun tüm editoryal ve yönetimsel süreçlerini bizzat yürütmektedir. Kaliteli, hızlı ve tarafsız habercilik onun için bir hedef değil, bir yaşam biçimidir.
                </p>
              </div>
            </div>
          </div>

          {/* Misyonumuz */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl font-black text-gray-900">MİSYONUMUZ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">Hız</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Gelişmeleri anında takip eder, okuyucularımıza en hızlı şekilde ulaştırırız.</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">Doğruluk</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Her haberi titizlikle doğrular, yanlış bilginin yayılmasına izin vermeyiz.</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">🔓</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">Bağımsızlık</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Hiçbir siyasi ya da ticari baskıya boyun eğmeden tarafsız habercilik yaparız.</p>
              </div>
            </div>
          </div>

          {/* İletişim CTA */}
          <div className="bg-gray-900 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-black mb-3">Bizimle İletişime Geçin</h3>
            <p className="text-gray-400 mb-6">Reklam, haber yayını veya iş birliği için bize ulaşın.</p>
            <Link href="/iletisim"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-black px-8 py-3 rounded-xl transition-colors text-lg">
              İletişime Geç
            </Link>
          </div>

        </div>

        <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10 text-sm">
          <p className="font-bold text-white text-lg mb-1">HaberSon</p>
          <p>© 2026 HaberSon. Tüm hakları saklıdır.</p>
          <Link href="/iletisim" className="text-red-400 hover:text-red-300 mt-2 block font-medium">İletişim için tıklayın</Link>
        </footer>
      </main>
    </div>
  )
}
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{background: '#f8f8f8', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 30px rgba(0,0,0,0.08)'}}>
        
        <header className="bg-white border-b border-gray-100">
          <div className="px-6 py-5">
            <Link href="/">
              <div style={{borderLeft: '5px solid #c0392b', paddingLeft: '12px', cursor: 'pointer', display: 'inline-block'}}>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '32px', fontWeight: '900', color: '#c0392b'}}>SON</span>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '32px', fontWeight: '900', color: '#111'}}>HABER</span>
                </div>
                <span style={{fontSize: '11px', color: '#999', letterSpacing: '3px', fontWeight: '700'}}>TÜRKİYE'NİN SESİ</span>
              </div>
            </Link>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
          <div style={{fontSize: '120px', fontWeight: '900', color: '#c0392b', lineHeight: '1'}}>404</div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Sayfa Bulunamadı</h1>
          <p className="text-gray-500 text-base mb-8 max-w-md">Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.</p>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors">
              Ana Sayfaya Dön
            </Link>
            <Link href="/gundem" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-lg transition-colors">
              Gündem Haberleri
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Gündem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dünya', 'Sağlık', 'Kültür', 'Yaşam'].map((k, i) => (
              <Link key={i} href={`/${k === 'Gündem' ? 'gundem' : k === 'Dünya' ? 'dunya' : k === 'Sağlık' ? 'saglik' : k === 'Kültür' ? 'kultur' : k === 'Yaşam' ? 'yasam' : k.toLowerCase()}`}
                className="bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-600 font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                {k}
              </Link>
            ))}
          </div>
        </div>

        <footer className="bg-gray-900 text-white px-8 py-6 text-center text-sm text-gray-400">
          <p>© 2026 SonHaber. Tüm hakları saklıdır.</p>
        </footer>
      </main>
    </div>
  )
}
import Link from 'next/link'

export default function GizlilikPage() {
  return (
    <div style={{background: '#f8f8f8', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 30px rgba(0,0,0,0.08)'}}>
        
        <header className="bg-white border-b border-gray-100">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <div style={{borderLeft: '5px solid #c0392b', paddingLeft: '12px', cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '28px', fontWeight: '900', color: '#c0392b'}}>SON</span>
                  <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '28px', fontWeight: '900', color: '#111'}}>HABER</span>
                </div>
                <span style={{fontSize: '9px', color: '#999', letterSpacing: '3px', fontWeight: '600'}}>TÜRKİYE'NİN SESİ</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-red-600 transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="hover:text-red-600 transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">İletişim</Link>
            </nav>
            <nav className="flex md:hidden gap-4 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-red-600">Ana Sayfa</Link>
              <Link href="/iletisim" className="hover:text-red-600">İletişim</Link>
            </nav>
          </div>
        </header>

        <div className="px-6 md:px-16 py-12 max-w-4xl mx-auto">
          
          <h1 className="text-3xl font-black text-gray-900 mb-2">Gizlilik Politikası</h1>
          <p className="text-gray-400 text-sm mb-8">Son güncelleme: Nisan 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">1. Genel Bilgi</h2>
              <p>HaberSon olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, <strong>HaberSon.com.tr</strong> adresinde yayın yapan HaberSon platformunun hangi verileri topladığını, bu verileri nasıl kullandığını ve koruduğunu açıklamaktadır. Sitemizi kullanarak bu politikayı kabul etmiş sayılırsınız.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">2. Toplanan Veriler</h2>
              <p className="mb-2">Sitemizi ziyaret ettiğinizde aşağıdaki veriler otomatik olarak toplanabilir:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP adresi ve tarayıcı bilgileri</li>
                <li>Hangi sayfaları ziyaret ettiğiniz ve ne kadar süre kaldığınız</li>
                <li>Sitemize hangi kaynaktan geldiğiniz</li>
                <li>Kullandığınız cihaz ve işletim sistemi bilgileri</li>
              </ul>
              <p className="mt-2">İletişim formunu doldurduğunuzda ise ad, soyad, telefon numarası ve e-posta adresiniz toplanmaktadır.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">3. Verilerin Kullanım Amacı</h2>
              <p className="mb-2">Topladığımız veriler yalnızca şu amaçlarla kullanılmaktadır:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Siteyi daha iyi hale getirmek ve kullanıcı deneyimini iyileştirmek</li>
                <li>İletişim formunu dolduran kullanıcılarla iletişime geçmek</li>
                <li>Site trafiğini analiz etmek</li>
                <li>Teknik sorunları tespit edip çözmek</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">4. Çerezler (Cookies)</h2>
              <p>Sitemiz, Google Analytics gibi analiz araçları aracılığıyla çerez kullanmaktadır. Bu çerezler, ziyaretçi davranışlarını anlamamıza yardımcı olur. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda sitenin bazı özellikleri düzgün çalışmayabilir.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">5. Google Analytics</h2>
              <p>Sitemizde Google Analytics kullanılmaktadır. Google Analytics, kullanıcıların siteyi nasıl kullandığını analiz etmek amacıyla çerezler aracılığıyla veri toplar. Bu veriler Google'ın sunucularında saklanır. Google'ın gizlilik politikası hakkında daha fazla bilgi için <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Google Gizlilik Politikası</a> sayfasını inceleyebilirsiniz.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">6. Üçüncü Taraflarla Veri Paylaşımı</h2>
              <p>Kişisel verileriniz hiçbir koşulda üçüncü taraflarla satılmaz veya kiralanmaz. Verileriniz yalnızca yasal zorunluluk bulunması halinde resmi makamlarla paylaşılabilir.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">7. Veri Güvenliği</h2>
              <p>Kullanıcı verilerinin güvenliğini sağlamak için gerekli teknik ve idari önlemleri almaktayız. Ancak internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olmadığını belirtmek isteriz.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">8. Haklarınız</h2>
              <p className="mb-2">6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerinizin düzeltilmesini talep etme</li>
              </ul>
              <p className="mt-2">Bu haklarınızı kullanmak için <a href="mailto:HaberSon0165@gmail.com" className="text-red-600 hover:underline">HaberSon0165@gmail.com</a> adresine e-posta gönderebilirsiniz.</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">9. İletişim</h2>
              <p>Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:</p>
              <div className="mt-3 bg-gray-50 rounded-xl p-4">
                <p><strong>HaberSon</strong></p>
                <p>E-posta: <a href="mailto:HaberSon0165@gmail.com" className="text-red-600 hover:underline">HaberSon0165@gmail.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/905419123828" className="text-red-600 hover:underline">+90 541 912 38 28</a></p>
                <p>Adres: Adana, Türkiye</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">10. Politika Değişiklikleri</h2>
              <p>Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayınlanacaktır. Sitemizi kullanmaya devam etmeniz, güncellenmiş politikayı kabul ettiğiniz anlamına gelir.</p>
            </div>

          </div>
        </div>

        <footer className="bg-gray-900 text-white mt-4">
          <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-800">
            <div>
              <div style={{borderLeft: '4px solid #c0392b', paddingLeft: '10px', marginBottom: '12px'}}>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '20px', fontWeight: '900', color: '#fff'}}>SON</span>
                <span style={{fontFamily: 'Arial Black, sans-serif', fontSize: '20px', fontWeight: '900', color: '#c0392b'}}>HABER</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Türkiye'nin güvenilir ve hızlı haber kaynağı.</p>
              <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                <span>💬</span> WhatsApp
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Kategoriler</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Gündem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dünya', 'Sağlık', 'Kültür', 'Yaşam'].map(k => (
                  <Link key={k} href={`/?kategori=${k}`} className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                    {k}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Bağlantılar</h4>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Ana Sayfa</Link>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors text-sm">Hakkımızda</Link>
                <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors text-sm">İletişim</Link>
                <Link href="/gizlilik" className="text-gray-400 hover:text-white transition-colors text-sm">Gizlilik Politikası</Link>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 HaberSon. Tüm hakları saklıdır.</p>
            <div className="flex gap-5">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik</Link>
              <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
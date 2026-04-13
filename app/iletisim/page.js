'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function IletisimPage() {
  const [form, setForm] = useState({ isim: '', telefon: '', email: '', mesaj: '' })
  const [gonderildi, setGonderildi] = useState(false)

  const handleGonder = () => {
    if (!form.isim || !form.telefon) {
      alert('İsim ve telefon numarası zorunludur!')
      return
    }
    const whatsappMesaj = `Merhaba, HaberSon iletişim formundan ulaşıyorum.%0A%0AAd Soyad: ${form.isim}%0ATelefon: ${form.telefon}%0AE-posta: ${form.email}%0AMesaj: ${form.mesaj}`
    window.open(`https://wa.me/905419123828?text=${whatsappMesaj}`, '_blank')
    setGonderildi(true)
  }

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
              <Link href="/hakkimizda" className="hover:text-red-600">Hakkımızda</Link>
              <Link href="/iletisim" className="hover:text-red-600">İletişim</Link>
            </nav>
          </div>
        </header>

        <div className="px-6 py-12">
          <div className="max-w-2xl mx-auto">

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 flex items-start gap-4">
              <div className="text-3xl shrink-0">🔒</div>
              <div>
                <h4 className="font-black text-blue-900 mb-1">Güvenli İletişim</h4>
                <p className="text-blue-700 text-sm leading-relaxed">Bilgileriniz yalnızca sizinle iletişime geçmek amacıyla kullanılır. Hiçbir şekilde üçüncü şahıslarla paylaşılmaz. HaberSon olarak gizliliğinize saygı duyuyoruz.</p>
              </div>
            </div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Bizimle İletişime Geçin</h2>
              <p className="text-gray-500 text-lg">Reklam vermek veya haber yayınlatmak için formu doldurun, en kısa sürede size dönelim.</p>
            </div>

            {gonderildi ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-black text-green-700 mb-2">Mesajınız Başarıyla İletildi!</h3>
                <p className="text-green-600 mb-2">WhatsApp uygulamanız açıldı. Mesajınızı göndermek için WhatsApp'taki gönder butonuna basmanız yeterli.</p>
                <p className="text-green-500 text-sm mb-6">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-block">
                  Ana Sayfaya Dön
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Adınız Soyadınız <span className="text-red-500">*</span></label>
                    <input placeholder="Adınızı ve soyadınızı girin" value={form.isim} 
                      onChange={e => setForm({...form, isim: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors text-gray-900" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Telefon Numaranız <span className="text-red-500">*</span></label>
                    <input placeholder="05XX XXX XX XX" value={form.telefon}
                      onChange={e => setForm({...form, telefon: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors text-gray-900" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">E-posta Adresiniz <span className="text-gray-400 font-normal">(opsiyonel)</span></label>
                    <input placeholder="ornek@email.com" value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors text-gray-900" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Mesajınız <span className="text-gray-400 font-normal">(opsiyonel)</span></label>
                    <textarea placeholder="Reklam paketi, haber yayını veya diğer taleplerinizi kısaca belirtin..." 
                      value={form.mesaj} onChange={e => setForm({...form, mesaj: e.target.value})}
                      rows={5} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors text-gray-900" />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 flex items-start gap-3">
                    <span className="text-xl shrink-0">ℹ️</span>
                    <p>Butona tıkladığınızda WhatsApp uygulamanız açılacak ve bilgileriniz otomatik olarak doldurulacaktır. Gönder butonuna basarak mesajınızı iletebilirsiniz.</p>
                  </div>

                  <button onClick={handleGonder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl transition-colors text-lg">
                    WhatsApp ile İletişime Geç
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-black text-gray-900 mb-1">WhatsApp</h4>
                <p className="text-gray-500 text-sm mb-2">7/24 ulaşabilirsiniz</p>
                <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
                  className="text-green-600 font-bold text-sm hover:text-green-700">
                  +90 541 912 38 28
                </a>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">✉️</div>
                <h4 className="font-black text-gray-900 mb-1">E-posta</h4>
                <p className="text-gray-500 text-sm mb-2">Yazılı iletişim için</p>
                <a href="mailto:HaberSon0165@gmail.com"
                  className="text-red-600 font-bold text-sm hover:text-red-700">
                  HaberSon0165@gmail.com
                </a>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📢</div>
                <h4 className="font-black text-gray-900 mb-1">Reklam</h4>
                <p className="text-gray-500 text-sm">Markanızı geniş kitlelere tanıtın</p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-3xl shrink-0">⭐</div>
              <div>
                <h4 className="font-black text-yellow-900 mb-1">Neden HaberSon?</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>✓ Her geçen gün büyüyen okuyucu kitlesi</li>
                  <li>✓ Türkiye genelinde geniş erişim</li>
                  <li>✓ Hızlı ve güvenilir yayın</li>
                  <li>✓ Uygun fiyatlı reklam paketleri</li>
                  <li>✓ 7/24 müşteri desteği</li>
                </ul>
              </div>
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
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Takip Edin</h4>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com/HaberSon0165" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <defs><linearGradient id="ig3" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig3)"/>
                    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://twitter.com/HaberSon263775" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="black"/><path d="M17.5 3h3l-6.5 7.5L21 21h-5.5L11 14.5 5.5 21H2.5l7-8L3 3h5.5l4 6L17.5 3z" fill="white"/></svg>
                  Twitter / X
                </a>
                <a href="https://www.facebook.com/share/1AeXFntFTx/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1877F2"/><path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.8.4-1.5 1.5-1.5H17V4.5s-1.1-.2-2.2-.2c-2.3 0-3.8 1.4-3.8 3.9V10.5H8.5v3H11V21h2.5z" fill="white"/></svg>
                  Facebook
                </a>
                <a href="https://www.tiktok.com/@HaberSon4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#010101"/><path d="M16.5 5.5c.7 1 1.8 1.7 3 1.8v2.5c-1 0-2-.3-2.8-.8v5.5c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.2 0 .5 0 .7.1v2.6c-.2-.1-.5-.1-.7-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V5.5h2.3z" fill="white"/></svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 HaberSon. Tüm hakları saklıdır.</p>
            <div className="flex gap-5">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
              <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors">Reklam Ver</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
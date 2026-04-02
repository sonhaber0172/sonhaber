'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function IletisimPage() {
  const [form, setForm] = useState({ isim: '', telefon: '', email: '', mesaj: '' })
  const [gonderildi, setGonderildi] = useState(false)

  const handleGonder = () => {
    if (!form.isim || !form.telefon) {
      alert('Isim ve telefon zorunludur!')
      return
    }
    const whatsappMesaj = `Merhaba, SonHaber'den iletisim formu dolduran ${form.isim} adlı kişiyim.%0ATelefon: ${form.telefon}%0AE-posta: ${form.email}%0AMesaj: ${form.mesaj}`
    window.open(`https://wa.me/905419123828?text=${whatsappMesaj}`, '_blank')
    setGonderildi(true)
  }

  return (
    <div style={{background: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1200px', background: '#ffffff', boxShadow: '0 0 40px rgba(0,0,0,0.15)'}}>
        
        <header className="bg-red-700 text-white shadow-lg">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">SONHABER</h1>
              <p className="text-red-200 text-sm md:text-base mt-1">Turkiyenin Haber Merkezi</p>
            </div>
            <nav className="hidden md:flex gap-8 text-base font-medium">
              <Link href="/" className="hover:text-red-200 transition-colors">Ana Sayfa</Link>
              <Link href="/iletisim" className="bg-white text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">Reklam Ver</Link>
            </nav>
            <nav className="flex md:hidden gap-3 text-sm font-medium">
              <Link href="/" className="hover:text-red-200">Ana Sayfa</Link>
              <Link href="/iletisim" className="hover:text-red-200">Reklam</Link>
            </nav>
          </div>
        </header>

        <div className="px-6 py-12">
          <div className="max-w-2xl mx-auto">
            
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Bizimle İletişime Geçin</h2>
              <p className="text-gray-500 text-lg">Reklam vermek veya haber yayınlatmak için formu doldurun, sizi arayalım.</p>
            </div>

            {gonderildi ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-black text-green-700 mb-2">Mesajınız İletildi!</h3>
                <p className="text-green-600 mb-6">En kısa sürede WhatsApp üzerinden sizinle iletişime geçeceğiz.</p>
                <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-block">
                  Ana Sayfaya Don
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Adınız Soyadınız *</label>
                    <input placeholder="Adınızı ve soyadınızı girin" value={form.isim} 
                      onChange={e => setForm({...form, isim: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Telefon Numaranız *</label>
                    <input placeholder="05XX XXX XX XX" value={form.telefon}
                      onChange={e => setForm({...form, telefon: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">E-posta Adresiniz</label>
                    <input placeholder="ornek@email.com" value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Mesajınız</label>
                    <textarea placeholder="Reklam paketi, haber yayını veya diğer taleplerinizi yazın..." 
                      value={form.mesaj} onChange={e => setForm({...form, mesaj: e.target.value})}
                      rows={5} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-base transition-colors" />
                  </div>
                  <button onClick={handleGonder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-3">
                    WhatsApp ile Gönder
                  </button>
                  <p className="text-center text-gray-400 text-sm">Formunuz WhatsApp üzerinden tarafımıza iletilecektir.</p>
                </div>
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-black text-gray-900 mb-1">WhatsApp</h4>
                <p className="text-gray-500 text-sm">7/24 ulaşabilirsiniz</p>
                <a href="https://wa.me/905419123828" target="_blank" rel="noopener noreferrer"
                  className="text-green-600 font-bold text-sm mt-2 block hover:text-green-700">
                  +90 541 912 38 28
                </a>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📰</div>
                <h4 className="font-black text-gray-900 mb-1">Haber Yayını</h4>
                <p className="text-gray-500 text-sm">Kurumsal haberlerinizi yayınlayın</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📢</div>
                <h4 className="font-black text-gray-900 mb-1">Reklam</h4>
                <p className="text-gray-500 text-sm">Markanızı geniş kitlelere duyurun</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-8 text-sm md:text-base">
          <p className="font-bold text-white text-lg mb-1">SONHABER</p>
          <p>2025 SonHaber. Tum haklari saklidir.</p>
          <Link href="/iletisim" className="text-red-400 hover:text-red-300 mt-2 block font-medium">Reklam vermek icin tiklayin</Link>
        </footer>
      </main>
    </div>
  )
}
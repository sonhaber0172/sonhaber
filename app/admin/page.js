'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const kategoriler = ['Gündem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dünya', 'Sağlık', 'Kültür', 'Yaşam']

export default function AdminPage() {
  const [sifre, setSifre] = useState('')
  const [giris, setGiris] = useState(false)
  const [aktifSekme, setAktifSekme] = useState('ekle')
  const [form, setForm] = useState({ title: '', content: '', image_url: '', category: 'Gündem', priority_score: 0 })
  const [mesaj, setMesaj] = useState('')
  const [haberler, setHaberler] = useState([])
  const [onizleme, setOnizleme] = useState(false)

  const handleGiris = () => {
    if (sifre === 'sonhaber2025') setGiris(true)
    else alert('Hatalı şifre!')
  }

  const haberleriGetir = async () => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('is_custom', true)
      .order('created_at', { ascending: false })
    setHaberler(data || [])
  }

  useEffect(() => {
    if (giris) haberleriGetir()
  }, [giris])

  const handleEkle = async () => {
    if (!form.title || !form.content) {
      setMesaj('Başlık ve içerik zorunludur!')
      return
    }
    const { error } = await supabase.from('articles').insert([{ ...form, is_custom: true }])
    if (error) setMesaj('Hata: ' + error.message)
    else { 
      setMesaj('Haber başarıyla eklendi!')
      setForm({ title: '', content: '', image_url: '', category: 'Gündem', priority_score: 0 })
      haberleriGetir()
    }
  }

  const handleSil = async (id) => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) alert('Silme hatası: ' + error.message)
    else haberleriGetir()
  }

  if (!giris) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">SONHABER</h1>
        <p className="text-center text-gray-400 text-sm mb-6">Admin Paneli</p>
        <input type="password" placeholder="Şifre" value={sifre} onChange={e => setSifre(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGiris()}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" />
        <button onClick={handleGiris} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
          Giriş Yap
        </button>
      </div>
    </div>
  )

  return (
    <div style={{background: '#f1f5f9', minHeight: '100vh', display: 'flex', justifyContent: 'center'}}>
      <main style={{width: '100%', maxWidth: '1000px', background: '#f1f5f9'}}>
        <div className="bg-red-700 text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black">SONHABER Admin Paneli</h1>
          <a href="/" className="text-red-200 hover:text-white text-sm">Siteye Dön</a>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setAktifSekme('ekle')}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${aktifSekme === 'ekle' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              Haber Ekle
            </button>
            <button onClick={() => { setAktifSekme('haberler'); haberleriGetir() }}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${aktifSekme === 'haberler' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              Haberlerim ({haberler.length})
            </button>
          </div>

          {aktifSekme === 'ekle' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Yeni Haber Ekle</h2>
              {mesaj && (
                <div className={`px-4 py-3 rounded-lg mb-4 ${mesaj.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {mesaj}
                </div>
              )}
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Haber Başlığı *</label>
                  <input placeholder="Haberin başlığını yazın" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-base" />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Resim URL</label>
                  <input placeholder="https://ornek.com/resim.jpg" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  {form.image_url && (
                    <img src={form.image_url} alt="onizleme" className="mt-2 w-full h-48 object-cover rounded-lg" onError={e => e.target.style.display='none'} />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Kategori</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500">
                      {kategoriler.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Öne Çıkarma (0-100)</label>
                    <input type="number" min="0" max="100" placeholder="0" value={form.priority_score} 
                      onChange={e => setForm({...form, priority_score: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-gray-700">Haber İçeriği *</label>
                    <button onClick={() => setOnizleme(!onizleme)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium">
                      {onizleme ? 'Düzenle' : 'Önizle'}
                    </button>
                  </div>
                  {onizleme ? (
                    <div className="border border-gray-300 rounded-lg p-4 min-h-48 prose max-w-none"
                      dangerouslySetInnerHTML={{__html: form.content}} />
                  ) : (
                    <textarea placeholder="Haberin detaylı içeriğini buraya yazın. Ne kadar detaylı yazarsanız o kadar iyi. Paragraflar arasında boşluk bırakın." 
                      value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                      rows={14} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-base leading-relaxed" />
                  )}
                  <p className="text-xs text-gray-400 mt-1">{form.content.length} karakter</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleEkle} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors text-base">
                    Haberi Yayınla
                  </button>
                  <button onClick={() => setForm({ title: '', content: '', image_url: '', category: 'Gündem', priority_score: 0 })}
                    className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition-colors">
                    Temizle
                  </button>
                </div>
              </div>
            </div>
          )}

          {aktifSekme === 'haberler' && (
            <div className="space-y-4">
              {haberler.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-400">
                  Henüz haber eklenmemiş.
                </div>
              ) : (
                haberler.map(h => (
                  <div key={h.id} className="bg-white rounded-xl shadow p-4 flex gap-4 items-start">
                    {h.image_url ? (
                      <img src={h.image_url} alt={h.title} className="w-24 h-20 object-cover rounded-lg shrink-0" />
                    ) : (
                      <div className="w-24 h-20 bg-red-100 rounded-lg shrink-0 flex items-center justify-center">
                        <span className="text-red-600 font-black">SH</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-red-600 font-bold">{h.category}</span>
                      <h3 className="font-bold text-gray-900 text-sm mt-1 line-clamp-2">{h.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{new Date(h.created_at).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a href={`/haber/${encodeURIComponent(h.id)}`} target="_blank"
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200">
                        Gör
                      </a>
                      <button onClick={() => handleSil(h.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200">
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
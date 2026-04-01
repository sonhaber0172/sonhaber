'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const kategoriler = ['Gundem', 'Spor', 'Ekonomi', 'Teknoloji', 'Dunya', 'Saglik', 'Kultur', 'Yasam']

export default function AdminPage() {
  const [sifre, setSifre] = useState('')
  const [giris, setGiris] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', image_url: '', category: 'Gundem', priority_score: 0 })
  const [mesaj, setMesaj] = useState('')

  const handleGiris = () => {
    if (sifre === 'sonhaber2025') setGiris(true)
    else alert('Hatali sifre!')
  }

  const handleEkle = async () => {
    if (!form.title || !form.content) {
      setMesaj('Baslik ve icerik zorunludur!')
      return
    }
    const { error } = await supabase.from('articles').insert([{ ...form, is_custom: true }])
    if (error) setMesaj('Hata: ' + error.message)
    else { 
      setMesaj('Haber basariyla eklendi!')
      setForm({ title: '', content: '', image_url: '', category: 'Gundem', priority_score: 0 }) 
    }
  }

  if (!giris) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Girisi</h1>
        <input type="password" placeholder="Sifre" value={sifre} onChange={e => setSifre(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGiris()}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4" />
        <button onClick={handleGiris} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg">
          Giris Yap
        </button>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Haber Ekle</h1>
            <span className="text-xs text-gray-400">SONHABER Admin</span>
          </div>
          {mesaj && (
            <div className={`px-4 py-3 rounded-lg mb-4 ${mesaj.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {mesaj}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Haber Basligi *</label>
              <input placeholder="Haberin basligini yazin" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Haber Icerigi *</label>
              <textarea placeholder="Haberin icerigini yazin" value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                rows={8} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Resim URL (opsiyonel)</label>
              <input placeholder="https://..." value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Kategori</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500">
                {kategoriler.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">One Cikarma Skoru (0-100)</label>
              <input type="number" min="0" max="100" placeholder="0" value={form.priority_score} 
                onChange={e => setForm({...form, priority_score: parseInt(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
              <p className="text-xs text-gray-400 mt-1">100 = en uste cıkar, 0 = normal sıra</p>
            </div>
            <button onClick={handleEkle} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
              Haberi Yayinla
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
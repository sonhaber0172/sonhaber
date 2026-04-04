const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://gnoqenkksfxejqgmwpvs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdub3Flbmtrc2Z4ZWpxZ213cHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjIxMjksImV4cCI6MjA5MDUzODEyOX0.AVGKf92BneC6a9RqldkmNBt7zEO_CZP1gquVO-5YoZA'
)

const kategoriDuzelt = {
  'Gundem': 'Gündem',
  'Dunya': 'Dünya',
  'Saglik': 'Sağlık',
  'Kultur': 'Kültür',
  'Yasam': 'Yaşam'
}

async function fixKategoriler() {
  for (const [eski, yeni] of Object.entries(kategoriDuzelt)) {
    const { data, error } = await supabase
      .from('articles')
      .update({ category: yeni })
      .eq('category', eski)
    
    if (error) {
      console.log(`Hata (${eski}):`, error.message)
    } else {
      console.log(`${eski} → ${yeni} düzeltildi!`)
    }
  }
  console.log('Tüm kategoriler düzeltildi!')
}

fixKategoriler()
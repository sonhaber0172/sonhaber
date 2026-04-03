'use client'

export default function SosyalMediaBar() {
  return (
    <div style={{background: '#1a1a2e'}} className="py-4 px-6">
      <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
        <span className="text-gray-400 text-sm font-bold hidden md:block">Bizi Takip Edin:</span>
        
        <a href="https://instagram.com/sonhaber0165" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-pink-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f09433"/>
                <stop offset="25%" stopColor="#e6683c"/>
                <stop offset="50%" stopColor="#dc2743"/>
                <stop offset="75%" stopColor="#cc2366"/>
                <stop offset="100%" stopColor="#bc1888"/>
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig)"/>
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
            <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
          </svg>
          <span className="text-white font-bold text-sm">Instagram</span>
        </a>

        <a href="https://twitter.com/sonhaber263775" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-gray-800">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="5" fill="black"/>
            <path d="M17.5 3h3l-6.5 7.5L21 21h-5.5L11 14.5 5.5 21H2.5l7-8L3 3h5.5l4 6L17.5 3z" fill="white"/>
          </svg>
          <span className="text-white font-bold text-sm">Twitter / X</span>
        </a>

        <a href="https://www.facebook.com/share/1AeXFntFTx/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-blue-900">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="5" fill="#1877F2"/>
            <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.8.4-1.5 1.5-1.5H17V4.5s-1.1-.2-2.2-.2c-2.3 0-3.8 1.4-3.8 3.9V10.5H8.5v3H11V21h2.5z" fill="white"/>
          </svg>
          <span className="text-white font-bold text-sm">Facebook</span>
        </a>

        <a href="https://www.tiktok.com/@sonhaber4" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-red-900">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="5" fill="#010101"/>
            <path d="M16.5 5.5c.7 1 1.8 1.7 3 1.8v2.5c-1 0-2-.3-2.8-.8v5.5c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.2 0 .5 0 .7.1v2.6c-.2-.1-.5-.1-.7-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V5.5h2.3z" fill="white"/>
          </svg>
          <span className="text-white font-bold text-sm">TikTok</span>
        </a>
      </div>
    </div>
  )
}
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return (
    new Response(
      `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#c0392b"/>
        <text x="16" y="22" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="15" font-weight="700" fill="#ffffff">SH</text>
      </svg>`,
      { headers: { 'Content-Type': 'image/svg+xml' } }
    )
  )
}
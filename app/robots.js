export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sonhaber-rouge.vercel.app/sitemap.xml',
  }
}
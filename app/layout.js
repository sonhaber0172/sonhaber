import "./globals.css";

export const metadata = {
  title: {
    default: "SonHaber - Son Dakika Haberleri, Gundem, Spor, Ekonomi",
    template: "%s | SonHaber"
  },
  description: "Son dakika haberleri, gundem, spor, ekonomi, teknoloji ve daha fazlasi SonHaber'de. Turkiye'nin en guncel haber kaynagi.",
  keywords: ["son dakika", "haberler", "gundem", "spor haberleri", "ekonomi haberleri", "turkiye haberleri", "sonhaber"],
  authors: [{ name: "SonHaber" }],
  creator: "SonHaber",
  publisher: "SonHaber",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sonhaber-rouge.vercel.app",
    siteName: "SonHaber",
    title: "SonHaber - Son Dakika Haberleri",
    description: "Son dakika haberleri, gundem, spor, ekonomi ve daha fazlasi SonHaber'de.",
    images: [
      {
        url: "https://sonhaber-rouge.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SonHaber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SonHaber - Son Dakika Haberleri",
    description: "Son dakika haberleri, gundem, spor, ekonomi ve daha fazlasi SonHaber'de.",
    images: ["https://sonhaber-rouge.vercel.app/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sonhaber-rouge.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#b91c1c" />
        <link rel="canonical" href="https://sonhaber-rouge.vercel.app" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
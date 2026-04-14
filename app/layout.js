import "./globals.css";
import Script from "next/script";
import WhatsappButon from "./components/WhatsappButon";
import YukariCik from "./components/YukariCik";
import KaranlikMod from './components/KaranlikMod'

export const metadata = {
  title: {
    default: "HaberSon - Son Dakika Haberleri, Gündem, Spor, Ekonomi",
    template: "%s | HaberSon"
  },
  description: "Son dakika haberleri, gündem, spor, ekonomi, teknoloji ve daha fazlası HaberSon'de. Türkiye'nin en güncel haber kaynağı.",
  keywords: ["son dakika", "haberler", "gündem", "spor haberleri", "ekonomi haberleri", "türkiye haberleri", "haberson", "son dakika haberleri"],
  authors: [{ name: "HaberSon" }],
  creator: "HaberSon",
  publisher: "HaberSon",
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
    siteName: "HaberSon",
    title: "HaberSon - Son Dakika Haberleri",
    description: "Son dakika haberleri, gündem, spor, ekonomi ve daha fazlası HaberSon'de.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HaberSon - Son Dakika Haberleri",
    description: "Son dakika haberleri, gündem, spor, ekonomi ve daha fazlası HaberSon'de.",
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
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://trthaberstatic.cdn.wp.trt.com.tr" />
        <link rel="dns-prefetch" href="https://gnoqenkksfxejqgmwpvs.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsappButon />
        <KaranlikMod />
        <YukariCik />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VTWF4S968M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VTWF4S968M');
          `}
        </Script>
      </body>
    </html>
  );
}
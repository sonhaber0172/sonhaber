import "./globals.css";
import Script from "next/script";
import WhatsappButon from "./components/WhatsappButon";
import YukariCik from "./components/YukariCik";

export const metadata = {
  title: {
    default: "SonHaber - Son Dakika Haberleri, Gündem, Spor, Ekonomi",
    template: "%s | SonHaber"
  },
  description: "Son dakika haberleri, gündem, spor, ekonomi, teknoloji ve daha fazlası SonHaber'de. Türkiye'nin en güncel haber kaynağı.",
  keywords: ["son dakika", "haberler", "gündem", "spor haberleri", "ekonomi haberleri", "türkiye haberleri", "sonhaber", "son dakika haberleri"],
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
    description: "Son dakika haberleri, gündem, spor, ekonomi ve daha fazlası SonHaber'de.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SonHaber - Son Dakika Haberleri",
    description: "Son dakika haberleri, gündem, spor, ekonomi ve daha fazlası SonHaber'de.",
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
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsappButon />
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
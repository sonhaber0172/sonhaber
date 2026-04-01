import "./globals.css";

export const metadata = {
  title: "SonHaber - Turkiyenin Haber Merkezi",
  description: "Son dakika haberleri, gundem, spor, ekonomi ve daha fazlasi SonHaber'de.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
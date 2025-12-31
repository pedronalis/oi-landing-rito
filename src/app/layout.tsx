import type { Metadata } from 'next';
import { Bricolage_Grotesque, Ubuntu } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Optimized font loading with next/font
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Rito de Passagem - Ordem Inédita',
  description:
    'Transforme seu caos criativo em um ecossistema que gera lucro, identidade e paz mental.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${ubuntu.variable}`}>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.utmify.com.br" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
        
        {/* UTMify Scripts - loaded lazily after page load */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="lazyOnload"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
        />
        <Script
          id="utmify-pixel"
          strategy="lazyOnload"
        >
          {`
            window.pixelId = "68658c047045505c2329a626";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
      </body>
    </html>
  );
}

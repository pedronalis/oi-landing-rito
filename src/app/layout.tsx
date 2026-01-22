import type { Metadata } from 'next';
import { Bricolage_Grotesque, Ubuntu } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Optimized font loading - reduced weights for faster load
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700', '800'], // Reduzido: apenas bold weights usados
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '700'], // Reduzido: apenas regular e bold
});

export const metadata: Metadata = {
  title: 'Rito de Passagem - OI',
  description:
    'Transforme seu caos criativo em um ecossistema que gera lucro, identidade e paz mental.',
  icons: {
    icon: '/uploads/logo.webp',
    shortcut: '/uploads/logo.webp',
    apple: '/uploads/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${ubuntu.variable}`} suppressHydrationWarning>
      <head>
        {/* Previne Safari iOS de converter números em links (causa hydration errors) */}
        <meta name="format-detection" content="telephone=no" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NM2HXNZW');`,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NM2HXNZW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}

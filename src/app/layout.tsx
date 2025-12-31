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
  title: 'Rito de Passagem - OI',
  description:
    'Transforme seu caos criativo em um ecossistema que gera lucro, identidade e paz mental.',
  icons: {
    icon: '/uploads/logo.webp',
    shortcut: '/uploads/logo.webp',
    apple: '/uploads/logo.webp',
  },
};

// Facebook Pixel ID
const FB_PIXEL_ID = '24359496436974079';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${ubuntu.variable}`}>
      <head>
        {/* Facebook Pixel - noscript fallback */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased">
        {children}
        
        {/* Facebook Pixel Base Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}


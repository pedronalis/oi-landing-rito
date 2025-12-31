import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="pt-BR">
      <head>
        {/* UTMify UTMs Script - No head para aparecer no HTML inicial */}
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          async
          defer
        />
        {/* UTMify Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "68658c047045505c2329a626";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

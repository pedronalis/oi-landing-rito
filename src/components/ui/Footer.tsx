'use client';

import Image from 'next/image';
import { ScrollReveal } from './ScrollReveal';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative z-10 py-12 md:py-16 px-4"
      aria-label="Informações legais e direitos reservados"
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal delay={0.2}>
          {/* Separador sutil no topo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div
              className="w-32 md:w-48 h-px bg-linear-to-r from-transparent via-cream-500/10 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Conteúdo minimalista */}
          <div className="text-center space-y-2 md:space-y-3">
            {/* Logo discreto */}
            <div className="relative w-24 h-24 md:w-32 md:h-24 mx-auto opacity-50 brightness-90 mb-2">
              <Image
                src="/uploads/logo.webp"
                alt="Ordem Inédita"
                fill
                className="object-contain"
                priority={false}
                unoptimized
              />
            </div>

            {/* Copyright */}
            <p className="font-display text-xs md:text-sm text-cream-500">
              Ordem Inédita © {currentYear}
            </p>
            <p className="font-body text-xs text-cream-600">
              Todos os direitos reservados.
            </p>

            {/* Empresa */}
            <p className="font-body text-xs text-cream-600 pt-2">
              MAIS QUE UM QUADRADO NEGOCIOS LTDA
            </p>
            <p className="font-body text-xs text-cream-600 font-mono tracking-wider">
              CNPJ: 42.287.026/0001-03
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

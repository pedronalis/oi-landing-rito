'use client';

import { cn } from '@/lib/utils';
import type { Pricing } from '@/content/types';
import Image from 'next/image';


interface PricingSectionProps {
  title: string;
  description: string;
  pricing: Pricing;
}

export function PricingSection({ title, description, pricing }: PricingSectionProps) {

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-cream-100" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
            {title}
          </h2>
          {description && (
            <p className="text-cream-400 text-lg">{description}</p>
          )}
        </div>

        {/* Cards Container - mais estreito */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
          {pricing.plans.map((plan) => {
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.name}
                className="relative flex flex-col"
              >
                {/* Card */}
                <div
                  className={cn(
                    'rounded-2xl p-8 flex flex-col h-full',
                    'bg-[#1a1a1a] border',
                    isHighlighted
                      ? 'border-brand-500/50'
                      : 'border-[#2a2a2a]',
                    isHighlighted && 'shadow-[0_0_60px_-15px_rgba(110,255,91,0.2)]'
                  )}
                >
                  {/* Tier Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-24 h-24 md:w-20 md:h-20">
                      <Image
                        src={isHighlighted ? '/uploads/tier_guerreiro.webp' : '/uploads/tier_iniciado.webp'}
                        alt={plan.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Plan Name - Ubuntu font */}
                  <h3
                    className={cn(
                      'text-2xl md:text-xl font-bold text-center mb-2 md:mb-1.5',
                      isHighlighted ? 'text-brand-400' : 'text-cream-100'
                    )}
                    style={{ fontFamily: 'Ubuntu, sans-serif' }}
                  >
                    {plan.name}
                  </h3>

                  {/* Description - altura fixa e padding para simetria */}
                  <p className="text-cream-300 md:text-cream-400 text-center text-base md:text-xs text-balance px-2 mb-8 md:mb-6 md:min-h-[48px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features List - Centralizado mas alinhado à esquerda, texto maior */}
                  <ul className="space-y-4 md:space-y-2.5 mb-auto max-w-[240px] md:max-w-[200px] mx-auto">
                    {plan.features.map((feature, idx) => {
                      const isIncluded = feature.startsWith('✅');
                      const featureText = feature.replace(/^[✅❌]\s*/, '');

                      return (
                        <li
                          key={idx}
                          className={cn(
                            'flex items-center gap-3 md:gap-2.5 text-base md:text-sm',
                            isIncluded ? 'text-cream-300' : 'text-cream-500/50'
                          )}
                        >
                          <span className="shrink-0 pt-0.5">
                            {isIncluded ? (
                              <svg className="w-5 h-5 md:w-4 md:h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 md:w-4 md:h-4 text-cream-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </span>
                          <span>{featureText}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Price Section */}
                  <div className="border-t border-white/10 pt-8 md:pt-6 mt-8 md:mt-6">
                    {plan.priceNote && (
                      <p className="text-cream-400 md:text-cream-500 text-xs md:text-[10px] uppercase text-center mb-4 md:mb-3 tracking-wide font-medium md:font-normal">
                        {plan.priceNote}
                      </p>
                    )}

                    {/* Preço com período ao lado */}
                    {(() => {
                      // Parse: "R$ 99,90 / mês" → valor="R$ 99,90", periodo="mês"
                      const parts = plan.price.split(' / ');
                      // Remove R$ para separar simbolo
                      const fullValue = parts[0];
                      const numericValue = fullValue.replace('R$', '').trim();
                      const hasSymbol = fullValue.includes('R$');
                      const periodo = parts[1] || '';

                      return (
                        <div className="flex flex-col items-center justify-center mb-2">
                          <div className="flex items-baseline gap-1.5 md:gap-1">
                            {hasSymbol && (
                              <span className={cn(
                                'text-lg md:text-2xl font-bold self-start mt-2 md:mt-1',
                                isHighlighted ? 'text-brand-400' : 'text-cream-100'
                              )}>
                                R$
                              </span>
                            )}
                            <p
                              className={cn(
                                'text-5xl md:text-3xl font-bold leading-none',
                                isHighlighted ? 'text-brand-400' : 'text-cream-100'
                              )}
                            >
                              {numericValue}
                            </p>
                            {periodo && (
                              <span className={cn(
                                'text-sm md:text-[10px] uppercase tracking-wider md:leading-none opacity-80 ml-1',
                                isHighlighted ? 'text-brand-400/70' : 'text-cream-400/70'
                              )}>
                                /{periodo}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Texto complementar abaixo/subnote */}
                    {plan.priceSubnote && (
                      <p className="text-cream-400 md:text-cream-500 text-xs md:text-[10px] text-center mb-6 md:mb-5 tracking-wide px-4 text-balance">
                        {plan.priceSubnote}
                      </p>
                    )}

                    {/* CTA Button - Link direto para checkout com UTM já embutido */}
                    <a
                      href={plan.checkoutUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'relative block w-full py-4 rounded-xl text-center font-bold text-base md:text-sm uppercase tracking-wide transition-all duration-200 overflow-hidden',
                        isHighlighted
                          ? 'bg-brand-500/20 backdrop-blur-md border border-brand-400/40 text-brand-400 hover:bg-brand-500/30 hover:border-brand-400/60 hover:text-brand-300 shadow-lg shadow-brand-500/10 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:pointer-events-none'
                          : 'bg-white/5 backdrop-blur-md border border-white/20 text-cream-200 hover:bg-white/10 hover:border-white/30'
                      )}
                      style={{ fontFamily: 'Ubuntu, sans-serif' }}
                    >
                      <span className="relative z-10">{plan.ctaLabel}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

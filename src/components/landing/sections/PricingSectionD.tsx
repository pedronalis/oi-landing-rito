'use client';
// Force HMR update

import { cn } from '@/lib/utils';
import type { Pricing } from '@/content/types';
import Image from 'next/image';
import { useAdUtmParams } from '@/hooks/useAdUtmParams';
import { TrialBanner } from '../components/TrialBanner';

interface PricingSectionDProps {
    title: string;
    description: string;
    pricing: Pricing;
}

export function PricingSectionD({ title, description, pricing }: PricingSectionDProps) {
    const { appendUtmsToUrl } = useAdUtmParams();

    return (
        <section className="relative py-16 sm:py-20 md:py-24 px-5 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-xl mx-auto mb-10">
                    <TrialBanner />
                </div>

                {/* Header - Landing C: título MAIOR, description em ITÁLICO alinhado à DIREITA abaixo de "jogo" */}
                <div className="mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 text-center" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                        <span className="hidden md:inline">{title}</span>
                        <span className="md:hidden">
                            Escolha o teu<br />
                            nível no jogo
                        </span>
                    </h2>
                    {description && (
                        <div className="flex justify-center mt-2 ml-0 sm:ml-[380px]">
                            <p className="text-cream-400 text-base md:text-lg italic text-right" style={{ width: 'fit-content' }}>
                                {description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
                    {pricing.plans.map((plan) => {
                        const isHighlighted = plan.highlighted;
                        const isIniciado = plan.name === 'Iniciado';

                        return (
                            <div key={plan.name} className="relative flex flex-col">
                                <div
                                    className={cn(
                                        'rounded-2xl p-8 flex flex-col h-full',
                                        'bg-[#1a1a1a] border',
                                        isHighlighted ? 'border-brand-500/50' : 'border-[#2a2a2a]',
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

                                    {/* Plan Name */}
                                    <h3
                                        className={cn(
                                            'text-2xl md:text-xl font-bold text-center mb-2 md:mb-1.5',
                                            isHighlighted ? 'text-brand-400' : 'text-cream-100'
                                        )}
                                        style={{ fontFamily: 'Ubuntu, sans-serif' }}
                                    >
                                        {plan.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-cream-300 md:text-cream-400 text-center text-base md:text-xs text-balance px-2 mb-8 md:mb-6 md:min-h-[48px] leading-relaxed">
                                        {plan.description}
                                    </p>

                                    {/* Features List */}
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

                                        {isIniciado ? (
                                            <>
                                                <div className="flex flex-col items-center justify-center mb-2 text-center">
                                                    <p className="text-2xl sm:text-3xl font-bold leading-none text-brand-400">
                                                        15 DIAS GRÁTIS
                                                    </p>
                                                </div>
                                                <p className="text-cream-400 md:text-cream-500 text-xs md:text-[10px] text-center mb-6 md:mb-5 tracking-wide px-4 text-balance">
                                                    depois R$ 99,90 / mês no cartão
                                                </p>
                                            </>
                                        ) : (
                                            (() => {
                                                const parts = plan.price.split(' / ');
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
                                                            <p className={cn(
                                                                'text-5xl md:text-3xl font-bold leading-none',
                                                                isHighlighted ? 'text-brand-400' : 'text-cream-100'
                                                            )}>
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
                                            })()
                                        )}

                                        {plan.priceSubnote && !isIniciado && (
                                            <p className="text-cream-400 md:text-cream-500 text-xs md:text-[10px] text-center mb-6 md:mb-5 tracking-wide px-4 text-balance">
                                                {plan.priceSubnote}
                                            </p>
                                        )}
                                        {/* CTA Button - Link com UTMs concatenados */}
                                        <a
                                            href={appendUtmsToUrl(plan.checkoutUrl || '#')}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                'relative block w-full py-4 rounded-xl text-center font-bold text-base md:text-sm uppercase tracking-wide transition-all duration-200 overflow-hidden',
                                                isHighlighted
                                                    ? 'bg-brand-500/20 backdrop-blur-md border border-brand-400/40 text-brand-400 hover:bg-brand-500/30 hover:border-brand-400/60 hover:text-brand-300 shadow-lg shadow-brand-500/10'
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

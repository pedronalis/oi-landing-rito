'use client';

import { Clock, HelpCircle, Key } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { landingDContent } from '@/content/landingD';
import { CTAButton } from '@/components/ui/CTAButton';
import { CTAHintBadges } from '@/components/ui/CTAHint';
import { GradientOrbs } from '@/components/ui/GradientOrbs';
import { VimeoEmbed } from '@/components/ui/VimeoEmbed';
import { Prose } from '@/components/ui/Prose';
import { FAQCard } from '@/components/ui/FAQCard';
import { Footer } from '@/components/ui/Footer';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { ExperienceCard } from './sections/ExperienceCard';
import { PremiumIcon } from '@/components/ui/PremiumIcon';
import { cn } from '@/lib/utils';

// Dynamic imports for heavy components
const ExtraversoBlackHole = dynamic(() => import('./3d/ExtraversoBlackHole'), {
    ssr: false,
    loading: () => <div className="w-full h-64 bg-dark-50 animate-pulse rounded-lg" />,
});

const PricingSection = dynamic(
    () => import('./sections/PricingSection').then((mod) => ({ default: mod.PricingSection })),
    { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const TestimonialsSection = dynamic(
    () => import('./sections/TestimonialsSection').then((mod) => ({ default: mod.TestimonialsSection })),
    { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const GuaranteeSectionD = dynamic(
    () => import('./sections/GuaranteeSectionD').then((mod) => ({ default: mod.GuaranteeSectionD })),
    { loading: () => <div className="min-h-64 bg-dark-50/50 animate-pulse" /> }
);

// Dynamic imports para seções below-the-fold
const PlatformJourneyC = dynamic(
    () => import('./sections/PlatformJourneyC').then((mod) => ({ default: mod.PlatformJourneyC })),
    { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const TreasureMapArsenalC = dynamic(
    () => import('./sections/TreasureMapArsenalC').then((mod) => ({ default: mod.TreasureMapArsenalC })),
    { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const HowWeDefeatSectionD = dynamic(
    () => import('./sections/HowWeDefeatSectionD').then((mod) => ({ default: mod.HowWeDefeatSectionD })),
    { loading: () => <div className="min-h-64 bg-dark-50/50 animate-pulse" /> }
);

const PricingSectionD = dynamic(
    () => import('./sections/PricingSectionD').then((mod) => ({ default: mod.PricingSectionD })),
    { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const TrialBanner = dynamic(
    () => import('./components/TrialBanner').then((mod) => ({ default: mod.TrialBanner })),
    { loading: () => <div className="h-16 bg-dark-50/50 animate-pulse rounded-lg" /> }
);

export function LandingD() {
    const { hero, sections, pricing } = landingDContent;

    const scrollToPricing = () => {
        const pricingSection = document.getElementById('pricing-section');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#121212' }}>
            <GradientOrbs enhanced />

            {/* Navigation */}
            <nav className="relative z-10 pt-4 pb-0 md:pt-10 md:pb-0 lg:pt-12 lg:pb-0 px-5 sm:px-6">
                <div className="max-w-7xl mx-auto flex justify-center">
                    <div className="relative w-72 h-24 sm:w-80 sm:h-28 md:w-[28rem] md:h-40 lg:w-[36rem] lg:h-48">
                        <Image
                            src="/uploads/logo.webp"
                            alt="Ordem Inédita"
                            fill
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </div>
                </div>
            </nav>

            {/* Hero Section - Landing C */}
            <section className="relative z-10 pt-2 pb-6 md:pt-4 md:pb-12 lg:pt-6 lg:pb-20 px-5 sm:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <StaggerContainer staggerDelay={0.15} className="space-y-8">
                        {/* Main Title - IGUAL à Landing A */}
                        <StaggerItem>
                            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-cream-200 leading-tight">
                                Uma nova forma de{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-brand-300">SER</span>
                                <br className="md:hidden" />
                                {' '}e{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-400 to-accent-300">CRIAR</span>
                                {' '}no Digital
                            </h1>
                        </StaggerItem>

                        {/* Subtitle - MESMA FONTE da headline (display), maior */}
                        <StaggerItem>
                            {/* Ajuste o valor dentro de text-[...] para mudar o tamanho no mobile */}
                            <p className="font-display text-2xl sm:text[2.5rem] md:text-[2.5rem] lg:text-[2.4rem] text-cream-200 max-w-[28rem] sm:max-w-[59rem] mx-auto font-bold tracking-tight leading-tight">
                                {hero.subtitle}
                            </p>
                        </StaggerItem>

                        {/* Video */}
                        <StaggerItem className="pt-4">
                            <VimeoEmbed videoId="1152211678" title="ordem-pv1" />
                        </StaggerItem>

                        {/* CTA */}
                        <StaggerItem className="pt-4">
                            <div className="space-y-5">
                                <CTAButton
                                    withGlow
                                    withPulse
                                    variant="primary"
                                    className="text-lg md:text-xl px-10 py-5"
                                    onClick={scrollToPricing}
                                >
                                    {hero.primaryCtaLabel}
                                </CTAButton>
                                <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />
                            </div>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Platform Section - Custom C version */}
            {sections.find((s) => s.type === 'platform') && (() => {
                const section = sections.find((s) => s.type === 'platform') as Extract<
                    typeof sections[number],
                    { type: 'platform' }
                >;
                return (
                    <PlatformJourneyC
                        title={section.title}
                        description={section.description}
                        features={section.features}
                    />
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Extraverso Section - Landing C: textos maiores e quase brancos */}
            {sections.find((s) => s.type === 'extraverso') && (() => {
                const section = sections.find((s) => s.type === 'extraverso') as Extract<
                    typeof sections[number],
                    { type: 'extraverso' }
                >;
                return (
                    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <ExtraversoBlackHole />
                        </div>
                        <div className="max-w-4xl mx-auto relative z-10">
                            <ScrollReveal withScale>
                                {/* Description - MAIOR */}
                                <div className="text-center mb-8">
                                    <p className="text-brand-400 text-lg md:text-xl font-medium tracking-wide">
                                        {section.description}
                                    </p>
                                </div>

                                {/* Title - MAIOR e QUASE BRANCO - Quebras específicas desktop */}
                                <h2 className="mb-6 text-center px-4 sm:px-8 md:px-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cream-100">
                                    <span className="hidden md:inline">
                                        No <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 via-brand-300 to-accent-400 font-extrabold">EXTRAVERSO</span> você<br />
                                        aprende a criar, organizar<br />
                                        e vender a parada toda
                                    </span>
                                    <span className="md:hidden">
                                        No <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 via-brand-300 to-accent-400 font-extrabold">EXTRAVERSO</span> você aprende a criar, organizar e vender a parada toda
                                    </span>
                                </h2>

                                {section.subtitle && (
                                    <p className="text-center text-[#b388ff] text-sm md:text-base font-medium tracking-wide mb-10">
                                        {section.subtitle}
                                    </p>
                                )}
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <VimeoEmbed videoId="1152211813" title="ordem-pv2" className="mb-8" />
                            </ScrollReveal>

                            <ScrollReveal delay={0.25}>
                                <div className="max-w-2xl mx-auto mb-8">
                                    <TrialBanner />
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <div className="text-center space-y-5">
                                    <CTAButton
                                        withGlow
                                        withPulse
                                        variant="primary"
                                        className="text-lg md:text-xl px-10 py-5"
                                        onClick={scrollToPricing}
                                    >
                                        {section.ctaLabel}
                                    </CTAButton>
                                    <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Arsenal Section - Custom C version */}
            {sections.find((s) => s.type === 'arsenal') && (() => {
                const section = sections.find((s) => s.type === 'arsenal') as Extract<
                    typeof sections[number],
                    { type: 'arsenal' }
                >;
                return (
                    <TreasureMapArsenalC
                        title={section.title}
                        description={section.description}
                        items={section.items}
                        note={section.note}
                    />
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Comparison Section - same as Landing A */}
            {sections.find((s) => s.type === 'comparison') && (() => {
                const section = sections.find((s) => s.type === 'comparison') as Extract<
                    typeof sections[number],
                    { type: 'comparison' }
                >;
                return (
                    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
                        <div className="max-w-6xl mx-auto">
                            {section.title && (
                                <ScrollReveal withScale>
                                    <h2 className="text-center mb-12 md:mb-16">{section.title}</h2>
                                </ScrollReveal>
                            )}

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-10 items-stretch">
                                {/* Without Card */}
                                <ScrollReveal>
                                    <div
                                        className={cn(
                                            'relative h-full p-6 md:p-8 rounded-2xl',
                                            'backdrop-blur-xl',
                                            'bg-linear-to-br from-[#1a1212]/90 via-[#171414]/80 to-[#141111]/70',
                                            'border border-red-500/20',
                                            'shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]',
                                            'shadow-lg shadow-black/30',
                                            'transition-all duration-500 ease-out',
                                            'hover:border-red-500/30 hover:shadow-red-900/20 hover:-translate-y-1'
                                        )}
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                                        <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 text-cream-300">
                                            <span className="relative flex items-center justify-center">
                                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                                <span className="absolute w-3 h-3 rounded-full bg-red-500/50 animate-ping" />
                                            </span>
                                            <span>{section.without.title.replace('🔴 ', '')}</span>
                                        </h3>
                                        <StaggerContainer staggerDelay={0.1} className="relative z-10">
                                            {section.without.items.map((item, index) => (
                                                <StaggerItem key={index}>
                                                    <div className="flex items-start gap-3 mb-4 group">
                                                        <div className="shrink-0 mt-1 p-1 rounded-md bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                                                            <PremiumIcon type="x" size="sm" color="red" />
                                                        </div>
                                                        <span className="text-cream-400/80 text-base md:text-lg leading-relaxed">
                                                            {item.replace('❌ ', '')}
                                                        </span>
                                                    </div>
                                                </StaggerItem>
                                            ))}
                                        </StaggerContainer>
                                    </div>
                                </ScrollReveal>

                                {/* With Card */}
                                <ScrollReveal delay={0.15}>
                                    <div
                                        className={cn(
                                            'relative h-full rounded-2xl',
                                            'p-[2px] bg-linear-to-br from-brand-400/60 via-brand-500/40 to-accent-400/30',
                                            'animate-border-glow',
                                            'transition-all duration-500 ease-out',
                                            'hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(110,255,91,0.15)]'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'relative h-full p-6 md:p-8 rounded-[14px]',
                                                'backdrop-blur-xl',
                                                'bg-linear-to-br from-[#111814]/95 via-[#101612]/90 to-[#0f1410]/85',
                                                'shadow-[inset_0_1px_0_rgba(110,255,91,0.05)]'
                                            )}
                                        >
                                            <div className="absolute top-0 left-0 w-40 h-40 bg-brand-400/8 rounded-full blur-3xl pointer-events-none" />
                                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
                                            <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-[#051a0d]/85 border border-brand-400/40 backdrop-blur-md">
                                                <span className="text-xs md:text-sm font-bold text-brand-400 tracking-wide uppercase">VOCÊ SE TORNA INÉDITO!</span>
                                            </div>
                                            <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-8 flex items-center gap-3 text-cream-200 pt-2">
                                                <span className="relative flex items-center justify-center">
                                                    <span className="w-3 h-3 rounded-full bg-brand-400" />
                                                    <span className="absolute w-3 h-3 rounded-full bg-brand-400/50 animate-ping" />
                                                </span>
                                                <span>{section.with.title.replace('🟢 ', '')}</span>
                                            </h3>
                                            <StaggerContainer staggerDelay={0.12} className="relative z-10">
                                                {section.with.items.map((item, index) => (
                                                    <StaggerItem key={index}>
                                                        <div className="flex items-start gap-3 mb-4 group">
                                                            <div className="shrink-0 mt-1 p-1 rounded-md bg-brand-500/15 group-hover:bg-brand-500/25 transition-colors">
                                                                <PremiumIcon type="check" size="sm" color="brand" />
                                                            </div>
                                                            <span className="text-cream-300 text-base md:text-lg leading-relaxed">
                                                                {item.replace('✅ ', '')}
                                                            </span>
                                                        </div>
                                                    </StaggerItem>
                                                ))}
                                            </StaggerContainer>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </section>
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* How We Defeat Section - Custom C version */}
            {sections.find((s) => s.type === 'how-we-defeat') && (() => {
                const section = sections.find((s) => s.type === 'how-we-defeat') as Extract<
                    typeof sections[number],
                    { type: 'how-we-defeat' }
                >;
                return (
                    <HowWeDefeatSectionD
                        title={section.title}
                        description={section.description}
                        videoLabel={section.videoLabel}
                        ctaLabel={section.ctaLabel}
                        onCtaClick={scrollToPricing}
                    />
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Experiences Section - same as Landing A */}
            {sections.find((s) => s.type === 'experiences') && (() => {
                const section = sections.find((s) => s.type === 'experiences') as Extract<
                    typeof sections[number],
                    { type: 'experiences' }
                >;
                const experienceConfig = [
                    { image: '/uploads/focusblocus_card.webp', colorVariant: 'brand' as const },
                    { image: '/uploads/slowflow_card.webp', colorVariant: 'accent' as const },
                    { image: '/uploads/oraculo_card.webp', colorVariant: 'brand' as const },
                    { image: '/uploads/quests_card.webp', colorVariant: 'accent' as const },
                ];
                return (
                    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-36 px-5 sm:px-6">
                        <div className="relative z-10 max-w-6xl mx-auto">
                            <ScrollReveal withScale>
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="mb-4 text-center">{section.title}</h2>
                                    <p className="text-cream-400 mb-10 text-lg md:text-xl text-center max-w-3xl mx-auto">
                                        {section.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
                                {section.experiences.map((exp, index) => {
                                    const config = experienceConfig[index] || experienceConfig[0];
                                    return (
                                        <ExperienceCard
                                            key={exp.name}
                                            name={exp.name}
                                            description={exp.description}
                                            imageSrc={config.image}
                                            index={index}
                                            colorVariant={config.colorVariant}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Manifesto Section - same as Landing A */}
            {sections.find((s) => s.type === 'manifesto') && (() => {
                const section = sections.find((s) => s.type === 'manifesto') as Extract<
                    typeof sections[number],
                    { type: 'manifesto' }
                >;
                return (
                    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
                        <div className="max-w-5xl mx-auto">
                            <ScrollReveal withScale>
                                <div className="mb-8 pb-12 md:pb-16 lg:pb-14">
                                    <h2 className="text-center">{section.title}</h2>
                                </div>
                                {section.description && (
                                    <Prose content={section.description} className="mb-12 text-center" />
                                )}
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
                                {/* Market Card */}
                                <ScrollReveal>
                                    <div
                                        className={cn(
                                            'relative h-full p-6 md:p-8 rounded-2xl',
                                            'backdrop-blur-xl',
                                            'bg-linear-to-br from-[#1a1212]/90 via-[#171414]/80 to-[#141111]/70',
                                            'border border-cream-500/10',
                                            'shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]',
                                            'shadow-lg shadow-black/30',
                                            'transition-all duration-500 ease-out',
                                            'hover:border-cream-500/20 hover:-translate-y-1'
                                        )}
                                    >
                                        <h3 className="text-lg md:text-xl font-semibold mb-6 text-cream-400 flex items-center gap-2">
                                            <span className="text-cream-500">O mercado grita:</span>
                                        </h3>
                                        <ul className="space-y-4">
                                            {section.market.map((item, index) => (
                                                <li key={index} className="text-cream-400/90 flex items-start gap-4 text-base md:text-lg group">
                                                    <span
                                                        className={cn(
                                                            'shrink-0 w-8 h-8 flex items-center justify-center rounded-lg',
                                                            'bg-linear-to-br from-cream-500/10 to-transparent',
                                                            'backdrop-blur-sm border border-cream-500/10',
                                                            'group-hover:border-cream-500/20 group-hover:from-cream-500/15',
                                                            'transition-all duration-300',
                                                            'text-lg'
                                                        )}
                                                    >
                                                        {item.emoji}
                                                    </span>
                                                    <span className="leading-relaxed">{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </ScrollReveal>

                                {/* Ordem Card */}
                                <ScrollReveal delay={0.2}>
                                    <div
                                        className={cn(
                                            'relative h-full rounded-2xl',
                                            'p-[2px] bg-linear-to-br from-brand-400/60 via-brand-500/40 to-accent-400/30',
                                            'animate-border-glow',
                                            'transition-all duration-500 ease-out',
                                            'hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(110,255,91,0.15)]'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'relative h-full p-6 md:p-8 rounded-[14px]',
                                                'backdrop-blur-xl',
                                                'bg-linear-to-br from-[#111814]/95 via-[#101612]/90 to-[#0f1410]/85',
                                                'shadow-[inset_0_1px_0_rgba(110,255,91,0.05)]'
                                            )}
                                        >
                                            <div className="absolute top-0 left-0 w-40 h-40 bg-brand-400/8 rounded-full blur-3xl pointer-events-none" />
                                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
                                            <h3 className="relative z-10 text-lg md:text-xl font-semibold mb-6 text-brand-400 flex items-center gap-2">
                                                <span>A Ordem Inédita sussurra:</span>
                                            </h3>
                                            <ul className="relative z-10 space-y-4">
                                                {section.ordem.map((item, index) => (
                                                    <li key={index} className="text-cream-300 flex items-start gap-4 text-base md:text-lg group">
                                                        <span
                                                            className={cn(
                                                                'shrink-0 w-8 h-8 flex items-center justify-center rounded-lg',
                                                                'bg-linear-to-br from-brand-500/20 to-brand-400/5',
                                                                'backdrop-blur-sm border border-brand-400/20',
                                                                'group-hover:border-brand-400/40 group-hover:from-brand-500/30',
                                                                'group-hover:shadow-[0_0_12px_rgba(110,255,91,0.2)]',
                                                                'transition-all duration-300',
                                                                'text-lg'
                                                            )}
                                                        >
                                                            {item.emoji}
                                                        </span>
                                                        <span className="leading-relaxed">{item.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Quote */}
                            {section.quote && (
                                <ScrollReveal delay={0.3}>
                                    <div
                                        className={cn(
                                            'relative rounded-2xl overflow-hidden',
                                            'p-[2px] bg-linear-to-r from-brand-400/50 via-accent-400/40 to-brand-400/50',
                                            'animate-gradient-border'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'relative px-5 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12 md:px-10 md:pt-10 md:pb-16 rounded-[14px]',
                                                'backdrop-blur-xl',
                                                'bg-linear-to-br from-[#0f1410]/95 via-[#101212]/90 to-[#0f100f]/85',
                                                'flex flex-col items-center justify-center gap-5'
                                            )}
                                        >
                                            <div className="absolute inset-0 bg-linear-to-r from-brand-400/5 via-transparent to-accent-400/5 pointer-events-none" />
                                            <div
                                                className={cn(
                                                    'relative z-10 w-14 h-14 flex items-center justify-center rounded-2xl',
                                                    'bg-linear-to-br from-brand-500/25 to-accent-400/15',
                                                    'border border-brand-400/30',
                                                    'shadow-[0_0_24px_rgba(110,255,91,0.2)]'
                                                )}
                                            >
                                                <Key className="w-7 h-7 text-brand-400" strokeWidth={1.5} />
                                            </div>
                                            <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-center font-medium leading-relaxed">
                                                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 via-cream-200 to-brand-400">
                                                    {section.quote}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>
                    </section>
                );
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Testimonials */}
            {sections.find((s) => s.type === 'testimonials') && (() => {
                const section = sections.find((s) => s.type === 'testimonials') as Extract<
                    typeof sections[number],
                    { type: 'testimonials' }
                >;
                return <TestimonialsSection title={section.title} />;
            })()}

            <div className="section-separator max-w-4xl mx-auto" />

            {/* Pricing Section - Custom C version */}
            {sections.find((s) => s.type === 'pricing') && (() => {
                const section = sections.find((s) => s.type === 'pricing') as Extract<
                    typeof sections[number],
                    { type: 'pricing' }
                >;
                return (
                    <div id="pricing-section" className="scroll-mt-20">
                        <PricingSectionD
                            title={section.title}
                            description={section.description}
                            pricing={pricing}
                        />
                    </div>
                );
            })()}



            <div className="section-separator max-w-4xl mx-auto" />

            {/* FAQ Section */}
            {sections.find((s) => s.type === 'faq') && (() => {
                const section = sections.find((s) => s.type === 'faq') as Extract<
                    typeof sections[number],
                    { type: 'faq' }
                >;
                const finalCtaSection = sections.find((s) => s.type === 'finalCta') as Extract<
                    typeof sections[number],
                    { type: 'finalCta' }
                > | undefined;

                const faqSchema = {
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: section.questions.map((faq) => ({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: faq.answer.replace(/\n\n/g, ' ').trim(),
                        },
                    })),
                };

                return (
                    <>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                        />
                        <section
                            className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6"
                            aria-labelledby="faq-heading"
                        >
                            <h2
                                id="faq-heading"
                                className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                                style={{ clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)' }}
                            >
                                Perguntas Frequentes
                            </h2>
                            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                                {section.questions.map((faq, index) => {
                                    const isFirstQuestion = index === 0;
                                    return (
                                        <ScrollReveal key={index} delay={index * 0.1} withScale>
                                            <FAQCard
                                                question={faq.question}
                                                answer={faq.answer}
                                                index={index}
                                                id={`faq-${index}`}
                                                icon={isFirstQuestion ? Clock : HelpCircle}
                                                variant={isFirstQuestion ? 'neutral' : 'highlight'}
                                                badge={!isFirstQuestion ? '💡 TESTE AGORA' : undefined}
                                            />
                                        </ScrollReveal>
                                    );
                                })}

                                <div className="flex justify-center py-4">
                                    <div className="w-24 h-px bg-linear-to-r from-transparent via-brand-400/30 to-transparent" />
                                </div>

                                {finalCtaSection && (
                                    <ScrollReveal delay={0.2} withScale>
                                        <div className="pt-4 md:pt-8">
                                            <div className="flex flex-col items-center space-y-6 md:space-y-7">
                                                <CTAButton
                                                    withGlow
                                                    withPulse
                                                    variant="primary"
                                                    className="text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 w-full sm:w-auto min-w-[280px] sm:min-w-[300px] md:min-w-[320px]"
                                                    aria-label={`${finalCtaSection.ctaLabel}. Multiplicar ROI, Ganhar Tempo, Saúde Mental`}
                                                    onClick={scrollToPricing}
                                                >
                                                    {finalCtaSection.ctaLabel}
                                                </CTAButton>

                                                <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />

                                                {finalCtaSection.note && (
                                                    <p
                                                        className="text-sm md:text-base lg:text-lg text-cream-500 italic pt-2 md:pt-4 text-center max-w-2xl leading-relaxed mx-auto"
                                                        style={{ fontFamily: 'var(--font-body), "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
                                                    >
                                                        {finalCtaSection.note}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}
                            </div>
                        </section>
                    </>
                );
            })()}

            <Footer />
        </div>
    );
}

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { VimeoEmbed } from '@/components/ui/VimeoEmbed';
import { Prose } from '@/components/ui/Prose';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CTAButton } from '@/components/ui/CTAButton';
import { CTAHintBadges } from '@/components/ui/CTAHint';
import { TrialBanner } from '../components/TrialBanner';

interface HowWeDefeatSectionDProps {
    title: string;
    description: string;
    videoLabel: string;
    ctaLabel: string;
    onCtaClick?: () => void;
}

export function HowWeDefeatSectionD({
    title,
    description,
    videoLabel,
    ctaLabel,
    onCtaClick,
}: HowWeDefeatSectionDProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6 overflow-hidden"
        >
            {/* Animated orbs - com animação de movimento */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Bola 1 - Verde (Brand) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(110, 255, 91, 0.15) 0%, rgba(110, 255, 91, 0.05) 40%, transparent 70%)',
                        filter: 'blur(120px)',
                    }}
                >
                    <motion.div
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -40, 20, 0],
                            scale: [1, 1.25, 0.85, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(110, 255, 91, 0.2) 0%, transparent 60%)',
                            filter: 'blur(90px)',
                        }}
                    />
                </motion.div>

                {/* Bola 2 - Roxo (Accent) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="absolute bottom-[5%] right-1/4 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(179, 136, 255, 0.15) 0%, rgba(179, 136, 255, 0.05) 40%, transparent 70%)',
                        filter: 'blur(120px)',
                    }}
                >
                    <motion.div
                        animate={{
                            x: [0, -25, 35, 0],
                            y: [0, 30, -25, 0],
                            scale: [1, 0.8, 1.3, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(179, 136, 255, 0.2) 0%, transparent 60%)',
                            filter: 'blur(90px)',
                        }}
                    />
                </motion.div>
            </div>

            <div className="relative max-w-4xl mx-auto z-10">
                {/* Brain Icon - same as original */}
                <div className="relative mb-6 flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ opacity: { duration: 0.8, delay: 0.2 }, scale: { duration: 0.8, delay: 0.2, ease: 'easeOut' } }}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={isInView ? { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] } : {}}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                background: 'radial-gradient(circle, rgba(179, 136, 255, 0.2) 0%, transparent 70%)',
                                filter: 'blur(8px)',
                            }}
                        />
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
                            <defs>
                                <radialGradient id="brain-gradient-c" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="rgba(110, 255, 91, 0.25)" />
                                    <stop offset="40%" stopColor="rgba(179, 136, 255, 0.15)" />
                                    <stop offset="100%" stopColor="rgba(179, 136, 255, 0.05)" />
                                </radialGradient>
                                <linearGradient id="sulcus-gradient-c" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(110, 255, 91, 0.4)" />
                                    <stop offset="50%" stopColor="rgba(179, 136, 255, 0.6)" />
                                    <stop offset="100%" stopColor="rgba(179, 136, 255, 0.4)" />
                                </linearGradient>
                                <filter id="glow-brain-c" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <motion.path
                                d="M50 15 C35 15, 25 22, 22 32 C18 28, 12 32, 12 40 C8 42, 6 50, 10 56 C6 60, 8 70, 16 74 C14 80, 20 88, 30 88 C35 92, 45 92, 50 88 C55 92, 65 92, 70 88 C80 88, 86 80, 84 74 C92 70, 94 60, 90 56 C94 50, 92 42, 88 40 C88 32, 82 28, 78 32 C75 22, 65 15, 50 15Z"
                                fill="url(#brain-gradient-c)"
                                stroke="url(#sulcus-gradient-c)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow-brain-c)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ pathLength: { duration: 2, delay: 0.2, ease: 'easeInOut' }, opacity: { duration: 0.5, delay: 0.2 } }}
                            />
                            <motion.path
                                d="M50 20 L50 82"
                                fill="none"
                                stroke="rgba(179, 136, 255, 0.45)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="4 3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ pathLength: { duration: 1.5, delay: 0.6 }, opacity: { duration: 0.5, delay: 0.6 } }}
                            />
                        </svg>
                    </motion.div>

                    {/* Partículas brancas flutuando ao redor do cérebro */}
                    {[...Array(6)].map((_, i) => {
                        const initialAngle = (i * 360) / 6;
                        const radius = 50;
                        const duration = 8 + i * 1.5;
                        const direction = i % 2 === 0 ? 1 : -1;

                        return (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    width: '4px',
                                    height: '4px',
                                    transformOrigin: 'center',
                                }}
                                initial={{ opacity: 0, scale: 0, rotate: initialAngle }}
                                animate={
                                    isInView
                                        ? {
                                            rotate: initialAngle + (direction === 1 ? 360 : -360),
                                            opacity: [0.6, 0.9, 0.6],
                                            scale: [0.8, 1.1, 0.8],
                                        }
                                        : {}
                                }
                                transition={{
                                    rotate: {
                                        duration: duration,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    },
                                    opacity: {
                                        duration: 2 + i * 0.3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                    scale: {
                                        duration: 2.5 + i * 0.2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                    delay: 1 + i * 0.15,
                                }}
                            >
                                <div
                                    className="absolute w-full h-full rounded-full bg-white"
                                    style={{
                                        boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)',
                                        transform: `translate(-50%, -50%) translateX(${radius}px)`,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                <ScrollReveal withScale>
                    {/* Title - LEVEMENTE MAIOR */}
                    <h2 className="mb-4 text-center md:text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
                    {/* Description - MAIOR (de ~12 para ~18-20) */}
                    <p className="text-lg md:text-xl text-cream-400 mb-10 text-center md:text-left leading-relaxed">
                        {description === 'Porque quem ganha dinheiro surtando… continua sendo surtado.' ? (
                            <>
                                Porque quem ganha dinheiro surtando…
                                <br className="md:hidden" />
                                continua sendo surtado.
                            </>
                        ) : (
                            description
                        )}
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <VimeoEmbed videoId="1152211534" title="ordem-pv3" className="mb-8" />
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
                            onClick={onCtaClick}
                        >
                            {ctaLabel}
                        </CTAButton>
                        <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

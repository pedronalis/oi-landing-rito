'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PremiumIcon } from '@/components/ui/PremiumIcon';
import { cn } from '@/lib/utils';

interface Feature {
    number: string;
    title: string;
    description: string;
    icon: string;
}

interface PlatformJourneyCProps {
    title: string | string[];
    description: string;
    features: Feature[];
}

function JourneyCard({ feature, index }: { feature: Feature; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative group h-full"
        >
            <motion.div
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={cn(
                    'h-full rounded-2xl transition-all duration-500 border',
                    isLeft
                        ? 'border-brand-500/30 group-hover:border-brand-500/60 bg-transparent'
                        : 'border-[#b388ff]/30 group-hover:border-[#b388ff]/60 bg-transparent'
                )}
            >
                <div
                    className={cn(
                        'h-full flex flex-col rounded-2xl overflow-hidden',
                        'bg-[#151515]/80 backdrop-blur-xl',
                        'group-hover:shadow-2xl transition-shadow duration-500',
                        isLeft ? 'group-hover:shadow-brand-500/10' : 'group-hover:shadow-[#b388ff]/10'
                    )}
                >
                    <div className="relative z-10 flex items-start gap-4 sm:gap-5 p-5 sm:p-6 md:p-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                            className={cn(
                                'relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center',
                                'border transition-all duration-500',
                                isLeft
                                    ? 'bg-brand-500/5 border-brand-500/20 group-hover:border-brand-500/50'
                                    : 'bg-[#b388ff]/5 border-[#b388ff]/20 group-hover:border-[#b388ff]/50'
                            )}
                        >
                            <PremiumIcon
                                type={feature.icon as any}
                                size="lg"
                                className={cn(
                                    'transition-all duration-300 group-hover:scale-110',
                                    isLeft ? 'text-brand-400' : 'text-accent-400'
                                )}
                            />
                        </motion.div>

                        <div className="flex-1 min-w-0 pt-1">
                            <h3 className="text-lg md:text-xl font-bold leading-tight mb-3 transition-colors duration-300 text-cream-100 group-hover:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-cream-400 text-sm md:text-base leading-relaxed group-hover:text-cream-300 transition-colors duration-300">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function PlatformJourneyC({ title, description, features }: PlatformJourneyCProps) {
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

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-12 md:mb-20"
                >
                    {/* Description - MAIOR - Quebra específica mobile */}
                    <p className="text-brand-400 text-lg md:text-xl font-medium mb-6 tracking-wide">
                        <span className="hidden md:inline">{description}</span>
                        <span className="md:hidden">
                            Não é curso. Não é mentoria.<br />
                            Nem grupo de apoio.
                        </span>
                    </p>
                    {/* Title - QUASE BRANCO (text-cream-100) - Quebras específicas desktop */}
                    <h2 className="max-w-4xl mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-cream-100">
                        {Array.isArray(title)
                            ? (
                                <>
                                    <span className="hidden md:inline">
                                        É uma plataforma insana com inteligência,<br />
                                        recursos incomuns e um leve grau de loucura<br />
                                        — Que te transforma num exército de 1 pessoa<br />
                                        só (mas com saúde mental)
                                    </span>
                                    <span className="md:hidden">
                                        É uma plataforma insana com
                                        inteligência, recursos incomuns e
                                        um leve grau de loucura — Que
                                        te transforma num exército de 1
                                        pessoa só (mas com saúde mental)
                                    </span>
                                </>
                            )
                            : title}
                    </h2>
                </motion.div>

                <div className="relative grid md:grid-cols-2 gap-6 lg:gap-8 [--gap:1.5rem] lg:[--gap:2rem]">
                    {/* Square U-Pattern Connector (Desktop) - Trilha decorativa */}
                    <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
                        {/* The U-Path Line with animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="absolute left-[calc(25%-(var(--gap)/4))] right-[calc(25%-(var(--gap)/4))] top-[22%] bottom-[22%] rounded-r-[50px] border-[6px] border-l-0 border-transparent animate-[rotateBorder_4s_linear_infinite]"
                            style={{
                                background: 'linear-gradient(90deg, #6eff5b, #b388ff, #6eff5b) border-box',
                                backgroundSize: '200% 200%',
                                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                filter: 'drop-shadow(0 0 4px rgba(110, 255, 91, 0.5)) drop-shadow(0 0 8px rgba(179, 136, 255, 0.4))'
                            }}
                        />
                    </div>

                    {features.map((feature, index) => (
                        <JourneyCard key={feature.number} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

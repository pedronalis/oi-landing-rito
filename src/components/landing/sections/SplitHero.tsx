'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { VimeoEmbed } from '@/components/ui/VimeoEmbed';
import { CTAButton } from '@/components/ui/CTAButton';
import { CTAHintBadges } from '@/components/ui/CTAHint';

interface SplitHeroProps {
  logoSrc: string;
  headline: React.ReactNode;
  subtitle: string;
  videoLabel: string;
  ctaLabel?: string;
  onCtaClick: () => void;
}

/**
 * SplitHero - Landing B Hero with side-by-side layout
 * Text on left, Video on right
 */
export function SplitHero({
  logoSrc,
  headline,
  subtitle,
  videoLabel,
  ctaLabel,
  onCtaClick,
}: SplitHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.2 : 0.6, ease: 'easeOut' as const },
  };

  return (
    <section className="relative z-10 pt-4 pb-12 md:pt-8 md:pb-20 lg:pt-12 lg:pb-28 px-5 sm:px-6">
      {/* Logo centered at top */}
      <motion.div
        className="max-w-7xl mx-auto flex justify-center mb-8 md:mb-12"
        {...fadeIn}
      >
        <div className="relative w-64 h-20 sm:w-72 sm:h-24 md:w-80 md:h-28">
          <Image
            src={logoSrc}
            alt="Ordem Inédita"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </motion.div>

      {/* Split layout container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, delay: 0.2 }}
          >
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-cream-200 leading-tight mb-6">
              {headline}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base lg:text-lg text-cream-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* CTA Button + Badges */}
            {ctaLabel && (
              <div className="flex flex-col items-center lg:items-start space-y-4">
                <CTAButton
                  withGlow
                  withPulse
                  variant="primary"
                  className="text-lg md:text-xl px-10 py-5"
                  onClick={onCtaClick}
                >
                  {ctaLabel}
                </CTAButton>

                {/* Premium badges - below the button */}
                <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />
              </div>
            )}
          </motion.div>

          {/* Right side - Video */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, delay: 0.3 }}
          >
            <VimeoEmbed videoId="1152211678" title="ordem-pv1" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

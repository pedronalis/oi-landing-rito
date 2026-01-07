'use client';

import { Brain } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VimeoEmbed } from '@/components/ui/VimeoEmbed';
import { Prose } from '@/components/ui/Prose';
import { CTAButton } from '@/components/ui/CTAButton';
import { CTAHintBadges } from '@/components/ui/CTAHint';

interface HowWeDefeatSectionBProps {
  title: string;
  description: string;
  videoLabel: string;
  ctaLabel: string;
  onCtaClick?: () => void;
}

/**
 * HowWeDefeatSectionB - Landing B version with simple Lucide Brain icon
 * Premium minimalist - no complex SVG animations
 */
export function HowWeDefeatSectionB({
  title,
  description,
  videoLabel,
  ctaLabel,
  onCtaClick,
}: HowWeDefeatSectionBProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Premium Brain Icon - Clean glassmorphism without banding */}
        <motion.div
          className="relative mb-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
        >
          {/* Icon container - clean glassmorphism with visible glow */}
          <div
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl"
            style={{
              background: 'rgba(139, 92, 246, 0.18)',
              backdropFilter: 'blur(24px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              boxShadow: `
                inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                0 0 0 1px rgba(139, 92, 246, 0.15),
                0 8px 32px rgba(139, 92, 246, 0.25)
              `,
            }}
          >
            {/* Icon - light violet */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Brain
                className="w-12 h-12 md:w-16 md:h-16 text-violet-300"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.1 }}
        >
          <h2 className="mb-4 text-center">{title}</h2>
          <Prose content={description} className="mb-10 text-center" />
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.2 }}
        >
          <VimeoEmbed videoId="1152211534" title="ordem-pv3" className="mb-10" />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.3 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}

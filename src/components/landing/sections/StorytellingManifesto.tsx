'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Key, Theater, TrendingDown, Megaphone, Frown, Target, User, Sprout, Volume2, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ManifestoItem {
  emoji: string;
  text: string;
}

interface StorytellingManifestoProps {
  title: string;
  description?: string;
  market: ManifestoItem[];
  ordem: ManifestoItem[];
  quote?: string;
}

// Icon mappings
const marketIcons: LucideIcon[] = [Theater, TrendingDown, Megaphone, Frown, Target];
const ordemIcons: LucideIcon[] = [User, Sprout, Volume2, Sprout, Sparkles];

/**
 * StorytellingManifesto - Landing B Manifesto section
 * Narrative-style layout with alternating sides
 */
export function StorytellingManifesto({
  title,
  description,
  market,
  ordem,
  quote,
}: StorytellingManifestoProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cream-200">
            {title}
          </h2>
        </motion.div>

        {/* Market section - "O mercado grita" */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-cream-500 mb-8 text-center uppercase tracking-wider">
            O mercado grita:
          </h3>

          <div className="space-y-4">
            {market.map((item, index) => {
              const Icon = marketIcons[index] || Target;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={cn(
                    'flex items-center gap-4',
                    'p-4 md:p-5 rounded-xl',
                    'bg-dark-50/50 border border-dark-100',
                    isEven ? 'mr-8 md:mr-16 lg:mr-24' : 'ml-8 md:ml-16 lg:ml-24'
                  )}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <Icon className="w-5 h-5 text-cream-500 shrink-0" />
                  <span className="text-cream-400 text-base md:text-lg">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Visual separator */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-brand-500/30" />
          <div className="w-2 h-2 rounded-full bg-brand-500/50" />
          <div className="h-px w-16 bg-linear-to-l from-transparent to-brand-500/30" />
        </div>

        {/* Ordem section - "A Ordem Inédita sussurra" */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-brand-400 mb-8 text-center uppercase tracking-wider">
            A Ordem Inédita sussurra:
          </h3>

          <div className="space-y-4">
            {ordem.map((item, index) => {
              const Icon = ordemIcons[index] || Sparkles;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={cn(
                    'flex items-center gap-4',
                    'p-4 md:p-5 rounded-xl',
                    'bg-brand-500/5 border border-brand-500/20',
                    isEven ? 'ml-8 md:ml-16 lg:ml-24' : 'mr-8 md:mr-16 lg:mr-24'
                  )}
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <Icon className="w-5 h-5 text-brand-400 shrink-0" />
                  <span className="text-cream-200 text-base md:text-lg">
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quote - Premium with decorative quotes */}
        {quote && (
          <motion.div
            className="relative p-8 md:p-12 lg:p-16 rounded-2xl text-center bg-linear-to-b from-brand-500/10 to-transparent border border-brand-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: 0.2 }}
          >
            {/* Decorative opening quote */}
            <span className="absolute top-4 left-6 text-6xl md:text-8xl font-serif text-brand-500/20 select-none leading-none">
              &ldquo;
            </span>

            {/* Key icon */}
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(110,255,91,0.1)]">
                <Key className="w-7 h-7 text-brand-400" strokeWidth={1.5} />
              </div>
            </div>

            {/* Quote text */}
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-cream-100 leading-relaxed max-w-2xl mx-auto">
              {quote}
            </p>

            {/* Decorative closing quote */}
            <span className="absolute bottom-4 right-6 text-6xl md:text-8xl font-serif text-brand-500/20 select-none leading-none">
              &rdquo;
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

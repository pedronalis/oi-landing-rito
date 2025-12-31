'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ComparisonSliderProps {
  withoutTitle: string;
  withoutItems: string[];
  withTitle: string;
  withItems: string[];
}

/**
 * ComparisonSlider - Landing B Comparison section
 * Toggle slider between "without" and "with" states
 */
export function ComparisonSlider({
  withoutTitle,
  withoutItems,
  withTitle,
  withItems,
}: ComparisonSliderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [showWith, setShowWith] = useState(true);

  const currentTitle = showWith ? withTitle.replace('🟢 ', '') : withoutTitle.replace('🔴 ', '');
  const currentItems = showWith ? withItems : withoutItems;
  const Icon = showWith ? Check : X;
  const iconColor = showWith ? 'text-brand-400' : 'text-red-500';
  const borderColor = showWith ? 'border-brand-500/50' : 'border-red-500/30';
  const bgColor = showWith ? 'bg-brand-500/5' : 'bg-red-500/5';

  return (
    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Toggle header */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
        >
          <button
            onClick={() => setShowWith(false)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
              'text-sm md:text-base font-medium',
              'text-red-400', // Always red text
              !showWith
                ? 'bg-red-500/20 border-2 border-red-500/50'
                : 'border-2 border-transparent hover:bg-red-500/10'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>SEM ORDEM</span>
          </button>

          {/* Visual toggle */}
          <div
            className="relative w-16 h-8 rounded-full bg-dark-50 border border-dark-100 cursor-pointer"
            onClick={() => setShowWith(!showWith)}
          >
            <motion.div
              className={cn(
                'absolute top-1 w-6 h-6 rounded-full',
                showWith ? 'bg-brand-500' : 'bg-red-500'
              )}
              animate={{ left: showWith ? '2rem' : '0.25rem' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>

          <button
            onClick={() => setShowWith(true)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
              'text-sm md:text-base font-medium',
              'text-brand-400', // Always green text
              showWith
                ? 'bg-brand-500/20 border-2 border-brand-500/50'
                : 'border-2 border-transparent hover:bg-brand-500/10'
            )}
          >
            <span>COM ORDEM</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showWith ? 'with' : 'without'}
            className={cn(
              'p-6 md:p-8 rounded-2xl',
              'bg-dark-50',
              'border-2',
              borderColor,
              bgColor
            )}
            initial={{ opacity: 0, x: showWith ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: showWith ? -30 : 30 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35 }}
          >
            {/* Badge for "with" state */}
            {showWith && (
              <div className="flex justify-center mb-6">
                <span className="px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs md:text-sm font-bold tracking-wide uppercase">
                  VOCÊ SE TORNA INÉDITO!
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center justify-center gap-3 text-cream-200">
              <Icon className={cn('w-6 h-6', iconColor)} />
              <span>{currentTitle}</span>
            </h3>

            {/* Items */}
            <ul className="space-y-4">
              {currentItems.map((item, index) => (
                <motion.li
                  key={`${showWith}-${index}`}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: showWith ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.1 : 0.3,
                    delay: index * 0.05,
                  }}
                >
                  <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', iconColor)} />
                  <span className={cn(
                    'text-base md:text-lg leading-relaxed',
                    showWith ? 'text-brand-400' : 'text-red-400'
                  )}>
                    {item.replace(/^[✅❌]\s*/, '')}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

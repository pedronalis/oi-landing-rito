'use client';

import { cn } from '@/lib/utils';
import { Prose } from './Prose';
import type { LucideIcon } from 'lucide-react';

interface FAQCardProps {
  question: string;
  answer: string;
  index: number;
  icon?: LucideIcon;
  /** Visual variant: 'neutral' for reflective style, 'highlight' for brand-premium style */
  variant?: 'neutral' | 'highlight';
  /** Optional badge text displayed at top right corner */
  badge?: string;
  id?: string;
}

export function FAQCard({
  question,
  answer,
  index,
  icon: Icon,
  variant = 'neutral',
  badge,
  id,
}: FAQCardProps) {
  const faqId = id || `faq-${index}`;
  const questionId = `${faqId}-question`;
  const answerId = `${faqId}-answer`;

  const isHighlight = variant === 'highlight';

  // Card interior content
  const cardContent = (
    <div
      className={cn(
        'relative p-5 sm:p-6 md:p-10 lg:p-12',
        isHighlight
          ? // Premium glass background for highlight variant
            cn(
              'backdrop-blur-xl rounded-[14px]',
              'bg-linear-to-br from-[#111814]/95 via-[#101612]/90 to-[#0f1410]/85',
              'shadow-[inset_0_1px_0_rgba(110,255,91,0.05)]'
            )
          : // Neutral glass background
            cn(
              'backdrop-blur-xl rounded-xl',
              'bg-linear-to-br from-[#1a1717]/90 via-[#181515]/80 to-[#151212]/70',
              'border border-cream-500/15',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]',
              'shadow-lg shadow-black/30',
              'transition-all duration-500 ease-out',
              'hover:border-cream-500/25 hover:-translate-y-1'
            )
      )}
    >
      {/* Glow effects for highlight variant */}
      {isHighlight && (
        <>
          <div className="absolute top-0 left-0 w-40 h-40 bg-brand-400/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Badge for highlight variant */}
      {badge && isHighlight && (
        <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-[#051a0d]/85 border border-brand-400/40 backdrop-blur-md">
          <span className="text-xs md:text-sm font-bold text-brand-400 tracking-wide uppercase">
            {badge}
          </span>
        </div>
      )}

      {/* Header with Question */}
      <header className={cn('mb-6 md:mb-8', badge && isHighlight && 'pt-2')}>
        <h3
          id={questionId}
          className={cn(
            'text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 md:mb-6',
            'leading-tight',
            'flex items-center gap-3 sm:gap-4 md:gap-5',
            isHighlight ? 'text-brand-400' : 'text-cream-200'
          )}
        >
          {Icon && (
            <span
              className={cn(
                'shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl',
                isHighlight
                  ? cn(
                      'bg-linear-to-br from-brand-500/20 to-brand-400/5',
                      'backdrop-blur-sm border border-brand-400/20',
                      'shadow-[0_0_12px_rgba(110,255,91,0.15)]'
                    )
                  : cn(
                      'bg-linear-to-br from-cream-500/10 to-transparent',
                      'backdrop-blur-sm border border-cream-500/10'
                    )
              )}
              aria-hidden="true"
            >
              <Icon
                className={cn(
                  'w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5',
                  isHighlight ? 'text-brand-400' : 'text-cream-400',
                  'transition-colors duration-300'
                )}
                strokeWidth={2}
              />
            </span>
          )}
          <span className="relative z-10 flex-1 break-words">{question}</span>
        </h3>
      </header>

      {/* Answer Content */}
      <section id={answerId} className="relative z-10">
        <div className="prose prose-invert max-w-none">
          <Prose
            content={answer}
            highlightWord={isHighlight ? 'TESTE!' : undefined}
          />
        </div>
      </section>
    </div>
  );

  // Wrapper for highlight variant with animated border
  if (isHighlight) {
    return (
      <article
        id={faqId}
        className="w-full"
        aria-labelledby={questionId}
        aria-describedby={answerId}
      >
        <div
          className={cn(
            'relative rounded-2xl',
            // Animated gradient border wrapper
            'p-[2px] bg-linear-to-br from-brand-400/60 via-brand-500/40 to-accent-400/30',
            'animate-border-glow',
            // Transition
            'transition-all duration-500 ease-out',
            'hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(110,255,91,0.15)]'
          )}
        >
          {cardContent}
        </div>
      </article>
    );
  }

  // Regular wrapper for neutral variant
  return (
    <article
      id={faqId}
      className="w-full"
      aria-labelledby={questionId}
      aria-describedby={answerId}
    >
      {cardContent}
    </article>
  );
}

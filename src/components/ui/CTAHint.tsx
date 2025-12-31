'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Cores para cada badge
const badgeColors = [
  { bg: 'bg-brand-500/15', border: 'border-brand-500/30', text: 'text-brand-400' },     // Verde
  { bg: 'bg-violet-500/20', border: 'border-violet-500/40', text: 'text-violet-300' },  // Roxo mais visível
  { bg: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-400' },     // Âmbar
];

/**
 * Badges premium multicoloridas para abaixo do CTA
 */
export function CTAHintBadges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
      {items.map((item, index) => {
        const color = badgeColors[index % badgeColors.length];
        return (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.08, duration: 0.3 }}
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium tracking-wide',
              color.bg,
              color.border,
              color.text,
              'border backdrop-blur-sm'
            )}
          >
            {item}
          </motion.span>
        );
      })}
    </div>
  );
}

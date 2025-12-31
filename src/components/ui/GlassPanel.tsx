'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** Enable hover lift effect */
  hover?: boolean;
  /** Highlighted state with brand border glow */
  highlighted?: boolean;
  /** Animate border glow (for pricing cards) */
  animatedBorder?: boolean;
}

export function GlassPanel({
  children,
  className,
  hover = false,
  highlighted = false,
  animatedBorder = false,
}: GlassPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseClasses = cn(
    // Premium glass effect
    'backdrop-blur-xl bg-linear-to-br from-[#171717]/80 to-[#171717]/60',
    'border rounded-xl',
    // Inner shadow for depth
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
    // Outer shadow
    'shadow-lg shadow-black/20',
    // Border styling
    highlighted
      ? 'border-brand-500/40'
      : 'border-[#2f3131]/60',
    // Animated border for highlighted cards
    animatedBorder && highlighted && 'animate-border-glow',
    className
  );

  // Motion variants for hover
  const hoverVariants = {
    rest: {
      y: 0,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
    },
    hover: {
      y: -4,
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(110, 255, 91, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    },
  };

  if (hover && !shouldReduceMotion) {
    return (
      <motion.div
        className={baseClasses}
        initial="rest"
        whileHover="hover"
        variants={hoverVariants}
        transition={{
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1], // spring-like easing
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Static fallback with CSS hover
  return (
    <div
      className={cn(
        baseClasses,
        hover && 'transition-all duration-300 hover:bg-[#1f2121]/80 hover:-translate-y-1'
      )}
    >
      {children}
    </div>
  );
}

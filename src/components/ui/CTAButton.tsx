'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  withGlow?: boolean;
  withPulse?: boolean;
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export function CTAButton({
  children,
  onClick,
  href,
  variant = 'primary',
  withGlow = true,
  withPulse = false,
  className,
  disabled = false,
  target,
  rel,
}: CTAButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, amount: 0.5 });

  const baseClasses = cn(
    'font-display font-bold rounded-xl',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50',
    'relative overflow-hidden',
    'tracking-wide uppercase',
    'min-h-[44px]' // Mobile touch target
  );

  const variantClasses = {
    // Glassmorphism primary button
    primary: cn(
      // Glass background with brand tint
      'bg-brand-500/20 backdrop-blur-md',
      // Subtle gradient overlay
      'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl',
      // Border with glow
      'border border-brand-400/40',
      // Text
      'text-brand-400',
      // Hover - disabled visual hover change on mobile
      isMobile ? '' : 'hover:bg-brand-500/30 hover:border-brand-400/60 hover:text-brand-300',
      // Shadow
      'shadow-lg shadow-brand-500/10'
    ),
    secondary: cn(
      'bg-accent-500/20 backdrop-blur-md',
      'border border-accent-400/40',
      'text-accent-400',
      isMobile ? '' : 'hover:bg-accent-500/30 hover:border-accent-400/60'
    ),
    outline: cn(
      'bg-white/5 backdrop-blur-md',
      'border border-white/20',
      'text-cream-200',
      isMobile ? '' : 'hover:bg-white/10 hover:border-white/30'
    ),
  };

  const glowClasses = withGlow && variant === 'primary' && !isMobile
    ? 'shadow-[0_0_12px_rgba(110,255,91,0.08),0_0_24px_rgba(110,255,91,0.03)]'
    : '';

  const pulseClasses = withPulse && isInView && !shouldReduceMotion && !isMobile
    ? 'animate-pulse-glow'
    : '';

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    glowClasses,
    pulseClasses,
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const motionProps = {
    whileHover: (shouldReduceMotion || isMobile) ? {} : { scale: 1.02, y: -1 },
    whileTap: (shouldReduceMotion || isMobile) ? {} : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        className={classes}
        aria-disabled={disabled}
        {...motionProps}
      >
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={disabled ? undefined : onClick}
      className={classes}
      disabled={disabled}
      {...motionProps}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

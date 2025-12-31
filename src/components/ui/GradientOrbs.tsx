'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface GradientOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'brand' | 'accent' | 'gold' | 'mixed';
  reverse?: boolean;
  /** Parallax speed multiplier (0-1) */
  parallaxSpeed?: number;
}

function GradientOrb({
  className,
  size = 'md',
  color = 'brand',
  reverse = false,
  parallaxSpeed = 0.5,
}: GradientOrbProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Parallax transformation based on scroll
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, reverse ? 200 * parallaxSpeed : -200 * parallaxSpeed]
  );

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-80 h-80',
    lg: 'w-[28rem] h-[28rem]',
    xl: 'w-[36rem] h-[36rem]',
  };

  const colorClasses = {
    brand: 'from-brand-500/25 via-brand-400/15 to-transparent',
    accent: 'from-accent-500/25 via-accent-400/15 to-transparent',
    gold: 'from-gold-500/20 via-gold-400/10 to-transparent',
    mixed: 'from-brand-500/20 via-accent-500/15 to-transparent',
  };

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      className={cn(
        'absolute rounded-full blur-[100px] opacity-60',
        'bg-gradient-radial',
        sizeClasses[size],
        colorClasses[color],
        reverse ? 'float-slow-reverse' : 'float-slow',
        className
      )}
      aria-hidden="true"
    />
  );
}

interface GradientOrbsProps {
  className?: string;
  /** Number of extra orbs to add for more atmosphere */
  enhanced?: boolean;
}

export function GradientOrbs({ className, enhanced = true }: GradientOrbsProps) {
  // Premium configuration with more orbs and strategic positioning
  const orbs = enhanced
    ? [
        // Main hero orbs
        { size: 'xl' as const, color: 'brand' as const, position: '-top-32 left-1/4', speed: 0.3 },
        { size: 'lg' as const, color: 'accent' as const, position: 'top-1/3 -right-20', speed: 0.5, reverse: true },
        { size: 'md' as const, color: 'mixed' as const, position: 'top-2/3 left-10', speed: 0.4 },
        // Mid-page orbs
        { size: 'lg' as const, color: 'brand' as const, position: 'top-[60%] right-1/4', speed: 0.6, reverse: true },
        { size: 'md' as const, color: 'accent' as const, position: 'top-[80%] left-1/3', speed: 0.35 },
        // Bottom orbs
        { size: 'xl' as const, color: 'mixed' as const, position: 'bottom-32 right-10', speed: 0.45, reverse: true },
        { size: 'sm' as const, color: 'gold' as const, position: 'bottom-1/4 left-20', speed: 0.55 },
      ]
    : [
        { size: 'lg' as const, color: 'brand' as const, position: 'top-0 left-1/4', speed: 0.3 },
        { size: 'md' as const, color: 'accent' as const, position: 'top-1/2 right-0', speed: 0.5, reverse: true },
        { size: 'sm' as const, color: 'gold' as const, position: 'bottom-0 left-0', speed: 0.4 },
      ];

  return (
    <div className={cn('fixed inset-0 overflow-hidden pointer-events-none z-0', className)}>
      {orbs.map((orb, i) => (
        <GradientOrb
          key={i}
          size={orb.size}
          color={orb.color}
          reverse={orb.reverse}
          parallaxSpeed={orb.speed}
          className={orb.position}
        />
      ))}
    </div>
  );
}

export { GradientOrb };

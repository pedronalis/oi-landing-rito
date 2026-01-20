'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface GradientOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'brand' | 'accent' | 'gold' | 'mixed';
  reverse?: boolean;
  /** Parallax speed multiplier (0-1) */
  parallaxSpeed?: number;
  /** Use simplified version for mobile */
  simplified?: boolean;
}

function GradientOrb({
  className,
  size = 'md',
  color = 'brand',
  reverse = false,
  parallaxSpeed = 0.5,
  simplified = false,
}: GradientOrbProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Parallax transformation based on scroll - disabled on mobile/simplified
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    (shouldReduceMotion || simplified) ? [0, 0] : [0, reverse ? 200 * parallaxSpeed : -200 * parallaxSpeed]
  );

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-80 h-80',
    lg: 'w-[28rem] h-[28rem]',
    xl: 'w-[36rem] h-[36rem]',
  };

  // Mobile: blur menor para melhor performance
  const blurClass = simplified ? 'blur-[50px]' : 'blur-[100px]';

  const colorClasses = {
    brand: 'from-brand-500/25 via-brand-400/15 to-transparent',
    accent: 'from-accent-500/25 via-accent-400/15 to-transparent',
    gold: 'from-gold-500/20 via-gold-400/10 to-transparent',
    mixed: 'from-brand-500/20 via-accent-500/15 to-transparent',
  };

  // Em modo simplificado, usa div estático sem animação
  if (simplified || shouldReduceMotion) {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute rounded-full opacity-40', // Opacidade reduzida
          blurClass,
          'bg-gradient-radial',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      className={cn(
        'absolute rounded-full opacity-60',
        blurClass,
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

/**
 * Detecta se deve usar versão simplificada
 */
function useSimplifiedMode(): boolean {
  const [simplified, setSimplified] = useState(true); // Assume simplificado por padrão (SSR safe)
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Verifica se é mobile
    const isMobile = window.innerWidth < 768;

    // Verifica cores do CPU
    const cores = navigator.hardwareConcurrency || 2;
    const isLowEnd = cores <= 4;

    // Verifica memória (se disponível)
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const isLowMemory = deviceMemory && deviceMemory < 4;

    setSimplified(isMobile || isLowEnd || isLowMemory || !!shouldReduceMotion);
  }, [shouldReduceMotion]);

  return simplified;
}

export function GradientOrbs({ className, enhanced = true }: GradientOrbsProps) {
  const simplified = useSimplifiedMode();

  // Configuração de orbs - MUITO reduzida para mobile
  const mobileOrbs: Array<{
    size: 'sm' | 'md' | 'lg' | 'xl';
    color: 'brand' | 'accent' | 'gold' | 'mixed';
    position: string;
    speed: number;
    reverse?: boolean;
  }> = [
      { size: 'lg', color: 'brand', position: 'top-0 left-1/4', speed: 0 },
      { size: 'md', color: 'accent', position: 'bottom-1/3 right-0', speed: 0 },
    ];

  // Desktop: configuração completa
  const desktopOrbs = enhanced
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

  const orbs = simplified ? mobileOrbs : desktopOrbs;

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
          simplified={simplified}
        />
      ))}
    </div>
  );
}

export { GradientOrb };

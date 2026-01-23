'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Enable scale animation (0.95 -> 1) */
  withScale?: boolean;
  /** Enable parallax effect on scroll */
  parallax?: boolean;
  /** Parallax intensity (0-1, default 0.1) */
  parallaxIntensity?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  withScale = false,
  parallax = false,
  parallaxIntensity = 0.1,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  // Parallax scroll effect - DISABLED on mobile
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    (parallax && !shouldReduceMotion && !isMobile) ? [50 * parallaxIntensity, -50 * parallaxIntensity] : [0, 0]
  );

  // Animações simplificadas para melhor performance
  const variants = {
    hidden: {
      opacity: isMobile ? 1 : 0, // Mobile starts visible
      y: (shouldReduceMotion || isMobile) ? 0 : (direction === 'up' ? 20 : direction === 'down' ? -20 : 0),
      x: (shouldReduceMotion || isMobile) ? 0 : (direction === 'left' ? 20 : direction === 'right' ? -20 : 0),
      scale: (withScale && !shouldReduceMotion && !isMobile) ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? "visible" : "hidden"} // Force visible on mobile
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: (shouldReduceMotion || isMobile) ? 0 : 0.4, // Instant on mobile
        delay: (isMobile) ? 0 : Math.min(delay, 0.2), // No delay on mobile
        ease: 'easeOut',
      }}
      variants={variants}
      style={(parallax && !shouldReduceMotion && !isMobile) ? { y: parallaxY } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container for sequential child animations
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  /** Delay before starting the stagger sequence */
  initialDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.05, // Reduzido de 0.1
  initialDelay = 0,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: isMobile ? 0 : Math.min(initialDelay, 0.1),
        staggerChildren: (shouldReduceMotion || isMobile) ? 0 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial={isMobile ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item - use inside StaggerContainer
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  withScale?: boolean;
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  withScale = false, // Mudado para false por padrão
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const itemVariants = {
    hidden: {
      opacity: isMobile ? 1 : 0,
      y: (shouldReduceMotion || isMobile) ? 0 : (direction === 'up' ? 15 : direction === 'down' ? -15 : 0),
      x: (shouldReduceMotion || isMobile) ? 0 : (direction === 'left' ? 15 : direction === 'right' ? -15 : 0),
      scale: (withScale && !shouldReduceMotion && !isMobile) ? 0.98 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: (shouldReduceMotion || isMobile) ? 0 : 0.3, // Instant
        ease: [0.25, 0.1, 0.25, 1] as const, // cubic-bezier easeOut
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}

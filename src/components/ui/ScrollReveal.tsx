'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && !shouldReduceMotion ? [50 * parallaxIntensity, -50 * parallaxIntensity] : [0, 0]
  );

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: withScale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  const reducedMotionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // ease-out-expo
      }}
      variants={shouldReduceMotion ? reducedMotionVariants : variants}
      style={parallax ? { y: parallaxY } : undefined}
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
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
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
  withScale = true,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
      scale: withScale ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}

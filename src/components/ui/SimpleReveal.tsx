'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SimpleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * SimpleReveal - Minimalist fade-in animation
 * Used in Landing B as a simpler alternative to ScrollReveal
 */
export function SimpleReveal({
  children,
  className,
  delay = 0,
}: SimpleRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.4,
        delay,
        ease: 'easeOut',
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SimpleContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * SimpleContainer - Minimalist stagger container
 * Only fades children in sequence, no transforms
 */
export function SimpleContainer({
  children,
  className,
  staggerDelay = 0.08,
}: SimpleContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SimpleItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * SimpleItem - Use inside SimpleContainer
 */
export function SimpleItem({ children, className }: SimpleItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

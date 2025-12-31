'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GradientNumberProps {
  number: string;
  className?: string;
  delay?: number;
}

export function GradientNumber({ number, className, delay = 0 }: GradientNumberProps) {
  return (
    <motion.div 
      className={cn("relative inline-block font-display leading-none", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      viewport={{ once: true }}
    >
      {/* Background blur/glow for depth */}
      <span className="absolute -inset-2 bg-brand-500/10 blur-xl rounded-full opacity-50" />
      
      {/* Main gradient text */}
      <span className="relative z-10 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-brand-400 via-brand-500 to-accent-500 number-glow select-none">
        {number}
      </span>
      
      {/* Overlay to enhance gradient on hover - handled by parent group */}
      <span className="absolute inset-0 z-20 text-transparent bg-clip-text bg-linear-to-br from-accent-400 via-accent-500 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
        {number}
      </span>
    </motion.div>
  );
}

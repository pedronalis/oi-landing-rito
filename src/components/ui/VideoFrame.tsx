'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

interface VideoFrameProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function VideoFrame({ label, className, onClick }: VideoFrameProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('relative group', className)}>
      {/* Animated gradient border */}
      <div
        className={cn(
          'absolute -inset-[2px] rounded-2xl opacity-75',
          'animate-gradient-border',
          'group-hover:opacity-100 transition-opacity duration-500'
        )}
        aria-hidden="true"
      />

      {/* Main video container */}
      <motion.div
        className={cn(
          'relative w-full aspect-video rounded-xl overflow-hidden',
          'bg-linear-to-br from-dark-50 to-[#0f0f0f]',
          'border border-[#2f3131]/50',
          'cursor-pointer',
          // Shimmer effect
          'before:absolute before:inset-0',
          'before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent',
          'before:animate-shimmer before:bg-[length:200%_100%]'
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={label || 'Reproduzir vídeo'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        // Removed scale hover effect to prevent border bug
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Play button - Glassmorphism Design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={cn(
              'relative z-10',
              'w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full',
              // Premium glassmorphism effect
              'backdrop-blur-xl',
              'bg-linear-to-br from-[#171717]/80 via-[#171717]/70 to-dark-deep/60',
              // Border with brand glow
              'border border-brand-400/30',
              // Inner shadow for depth
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
              // Outer shadow with brand glow
              'shadow-lg shadow-black/40',
              'shadow-[0_0_20px_rgba(110,255,91,0.15)]',
              'flex items-center justify-center',
              // Hover effects
              'group-hover:border-brand-400/50',
              'group-hover:shadow-[0_0_30px_rgba(110,255,91,0.25)]',
              'group-hover:bg-linear-to-br group-hover:from-[#171717]/90 group-hover:via-[#171717]/80 group-hover:to-dark-deep/70',
              'transition-all duration-300 ease-out'
            )}
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Subtle glow effect behind button */}
            <div
              className={cn(
                'absolute -inset-2 rounded-full',
                'bg-brand-400/10',
                'blur-xl',
                'opacity-60',
                'group-hover:opacity-100',
                'transition-opacity duration-500',
                'animate-pulse'
              )}
              style={{ animationDuration: '3s' }}
              aria-hidden="true"
            />
            
            {/* Pulse ring effect - Refined for glassmorphism */}
            <div
              className={cn(
                'absolute inset-0 rounded-full',
                'border border-brand-400/40',
                'animate-ping opacity-50'
              )}
              style={{ animationDuration: '2.5s' }}
              aria-hidden="true"
            />
            
            {/* Play icon - White/cream for better contrast on glass */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 text-cream-200 ml-0.5 sm:ml-1 relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Label - REMOVED per user request */}
      </motion.div>
    </div>
  );
}

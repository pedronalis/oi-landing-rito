'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  name: string;
  description: string;
  imageSrc: string;
  index: number;
  colorVariant?: 'brand' | 'accent';
}

export function ExperienceCard({
  name,
  description,
  imageSrc,
  index,
  colorVariant = 'brand',
}: ExperienceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const colorClasses = {
    brand: {
      title: 'text-brand-400',
      accent: 'bg-brand-400',
    },
    accent: {
      title: 'text-[#b388ff]',
      accent: 'bg-[#b388ff]',
    },
  };

  const colors = colorClasses[colorVariant];

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: shouldReduceMotion ? 0.3 : 0.6,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="h-full"
    >
      {/* Wrapper Externo - Gradiente Animado como Borda */}
      <motion.div
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -12,
                scale: 1.02,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
        }
        className={cn(
          'h-full rounded-2xl',
          'animate-premium-border',
          'group',
          'transition-all duration-500'
        )}
      >
        {/* Card Interno */}
        <div
          className={cn(
            'h-full flex flex-col rounded-[14px] overflow-hidden',
            'bg-dark-50'
          )}
        >
          {/* Imagem Section - Completa */}
          <div className="relative aspect-3/4 overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.08,
                      transition: { duration: 0.5, ease: 'easeOut' },
                    }
              }
            >
              <Image
                src={imageSrc}
                alt={name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 2}
              />
            </motion.div>

            {/* Linha de Accent no bottom da imagem */}
            <div
              className={cn(
                'absolute bottom-0 left-0 right-0 h-1',
                colors.accent,
                'opacity-60 group-hover:opacity-100 transition-opacity duration-300'
              )}
            />
          </div>

          {/* Texto Section - Abaixo da Imagem */}
          <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 bg-dark-50">
            {/* Title - Fonte Ubuntu */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1 + 0.2,
                        duration: 0.4,
                      },
                    }
                  : {}
              }
              className={cn(
                'text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2',
                'font-body',
                colors.title
              )}
            >
              {name}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1 + 0.3,
                        duration: 0.4,
                      },
                    }
                  : {}
              }
              className="text-cream-300 text-sm md:text-base leading-relaxed flex-1"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

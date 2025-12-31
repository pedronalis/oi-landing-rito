'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Experience {
  name: string;
  description: string;
}

interface ExperienceCarouselProps {
  title: string;
  description: string;
  experiences: Experience[];
}

// Image mapping for experiences
const experienceImages: Record<string, string> = {
  'Focus Blocusᵒⁱ': '/uploads/focusblocus_card.webp',
  'Slow Flowᵒⁱ': '/uploads/slowflow_card.webp',
  'Oráculoᵒⁱ': '/uploads/oraculo_card.webp',
  'Questsᵒⁱ': '/uploads/quests_card.webp',
};

/**
 * ExperienceCarousel - Landing B Experiences section
 * Autoscroll carousel showing 2 cards at a time with vertical layout (IMG + Title + Desc)
 */
export function ExperienceCarousel({
  title,
  description,
  experiences,
}: ExperienceCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        setCurrentIndex(0); // Reset when viewport changes
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Responsive items per page: 1 on mobile, 2 on desktop
  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(experiences.length / itemsPerPage);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Autoscroll effect
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      goNext();
    }, 5000); // 5 seconds between slides

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, goNext]);

  // Get current visible items
  const startIndex = currentIndex * itemsPerPage;
  const visibleItems = experiences.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-36 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cream-200 mb-4">
            {title}
          </h2>
          <p className="text-cream-400 text-lg md:text-xl">{description}</p>
        </motion.div>

        {/* Carousel container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 md:w-12 md:h-12 rounded-full',
              'bg-dark-50 border border-dark-100',
              'flex items-center justify-center',
              'text-cream-400 hover:text-cream-200 hover:border-brand-500/30',
              'transition-all duration-300',
              '-translate-x-2 md:-translate-x-6'
            )}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goNext}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 md:w-12 md:h-12 rounded-full',
              'bg-dark-50 border border-dark-100',
              'flex items-center justify-center',
              'text-cream-400 hover:text-cream-200 hover:border-brand-500/30',
              'transition-all duration-300',
              'translate-x-2 md:translate-x-6'
            )}
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards grid - 2 columns */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 md:mx-16"
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.98 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: shouldReduceMotion ? 0.15 : 0.4,
              }}
            >
              {visibleItems.map((exp, index) => {
                const imageSrc = experienceImages[exp.name] || '/uploads/focusblocus_card.webp';
                const colorVariant = index % 2 === 0 ? 'brand' : 'accent';
                const borderColor = colorVariant === 'brand' ? 'border-brand-500/30' : 'border-accent-500/30';

                return (
                  <motion.div
                    key={exp.name}
                    className={cn(
                      'rounded-2xl overflow-hidden',
                      'bg-dark-50 border-2',
                      borderColor,
                      'transition-all duration-300',
                      'hover:shadow-lg hover:-translate-y-1'
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Image on top - full vertical */}
                    <div className="relative aspect-3/4 w-full">
                      <Image
                        src={imageSrc}
                        alt={exp.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Content below image */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-cream-100 mb-2">
                        {exp.name}
                      </h3>
                      <p className="text-cream-400 text-sm md:text-base leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Premium dot indicators */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'relative h-3 rounded-full transition-all duration-500',
                  'backdrop-blur-sm border',
                  index === currentIndex
                    ? 'w-10 bg-brand-500/30 border-brand-400/50 shadow-[0_0_12px_rgba(110,255,91,0.3)]'
                    : 'w-3 bg-dark-50/50 border-dark-100 hover:bg-dark-50 hover:border-cream-500/20'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Ir para página ${index + 1}`}
              >
                {/* Inner glow for active */}
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-brand-400/20"
                    layoutId="activeDot"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

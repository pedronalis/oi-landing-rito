'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Target, FolderOpen, Zap, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface VerticalTimelineProps {
  title: string | string[];
  description: string;
  features: Feature[];
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  target: Target,
  folder: FolderOpen,
  lightning: Zap,
  brain: Brain,
};

/**
 * VerticalTimeline - Landing B Platform section
 * Vertical timeline layout with connecting line
 */
export function VerticalTimeline({
  title,
  description,
  features,
}: VerticalTimelineProps) {
  const shouldReduceMotion = useReducedMotion();
  const titleArray = Array.isArray(title) ? title : [title];

  return (
    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
        >
          {/* Top description */}
          <p className="text-brand-400 text-sm md:text-base font-medium tracking-wide mb-6">
            {description}
          </p>

          {/* Title - Desktop (md+) */}
          <h2 className="hidden md:block text-3xl lg:text-4xl font-bold text-cream-200 leading-tight">
            {titleArray.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleArray.length - 1 && <br />}
              </span>
            ))}
          </h2>
          
          {/* Title - Mobile (< md) with custom breaks */}
          <h2 className="md:hidden text-2xl font-bold text-cream-200 leading-tight">
            É uma plataforma insana<br />
            com inteligência,<br />
            recursos incomuns e<br />
            um leve grau de loucura —<br />
            <br />
            Que te transforma num<br />
            exército de 1 pessoa só<br />
            (mas com saúde mental)
          </h2>
        </motion.div>

        {/* Timeline container - centered on page */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line - left side */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-linear-to-b from-brand-500/50 via-violet-400/30 to-transparent" />

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Target;

              return (
                <motion.div
                  key={feature.number}
                  className="relative flex gap-6 md:gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: index * 0.1,
                  }}
                >
                  {/* Number circle with glow */}
                  <div
                    className={cn(
                      'relative z-10 shrink-0 w-16 h-16 md:w-24 md:h-24',
                      'rounded-full flex items-center justify-center',
                      'bg-dark border-2 transition-shadow duration-300',
                      index % 2 === 0 
                        ? 'border-brand-500/50 shadow-[0_0_20px_rgba(110,255,91,0.15)]' 
                        : 'border-violet-400/50 shadow-[0_0_20px_rgba(167,139,250,0.15)]'
                    )}
                  >
                    <span
                      className={cn(
                        'text-2xl md:text-4xl font-bold',
                        index % 2 === 0 ? 'text-brand-400' : 'text-violet-400'
                      )}
                    >
                      {feature.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 md:pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon
                        className={cn(
                          'w-5 h-5',
                          index % 2 === 0 ? 'text-brand-400' : 'text-violet-400'
                        )}
                      />
                      <h3 className="text-lg md:text-xl font-bold text-cream-200">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-cream-400 text-sm md:text-base leading-relaxed max-w-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

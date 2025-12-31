'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Diamond, Feather, Sparkles, BookOpen, Compass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ArsenalItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface TabbedArsenalProps {
  title: string;
  description: string;
  items: ArsenalItem[];
  note: string;
}

// Category config
const categories = [
  { id: 'produto', label: 'Produto', icon: Diamond, color: 'brand' },
  { id: 'copy', label: 'Copy', icon: Feather, color: 'accent' },
  { id: 'conteudo', label: 'Conteúdo', icon: Sparkles, color: 'gold' },
  { id: 'estrutura', label: 'Estrutura', icon: BookOpen, color: 'cyan' },
  { id: 'oraculo', label: 'Oráculos', icon: Compass, color: 'rose' },
  { id: 'estrategia', label: 'Estratégia', icon: Compass, color: 'teal' },
];

const iconMap: Record<string, LucideIcon> = {
  diamond: Diamond,
  quill: Feather,
  sparkles: Sparkles,
  'book-open': BookOpen,
  'crystal-ball': Compass,
  compass: Compass,
};

/**
 * TabbedArsenal - Landing B Arsenal section
 * Tabs that filter items by category
 */
export function TabbedArsenal({
  title,
  description,
  items,
  note,
}: TabbedArsenalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('produto');

  // Filter items by active category
  const filteredItems = items.filter((item) => item.category === activeCategory);
  const activeConfig = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
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
          <p className="text-cream-500 text-sm md:text-base">{description}</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.1 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            const hasItems = items.some((item) => item.category === category.id);

            if (!hasItems) return null;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full',
                  'text-sm md:text-base font-medium',
                  'transition-all duration-300',
                  'border-2',
                  isActive
                    ? 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                    : 'bg-dark-50 border-dark-100 text-cream-400 hover:border-cream-500/30'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="text-xs opacity-60">
                  ({items.filter((i) => i.category === category.id).length})
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.3 }}
          >
            {filteredItems.map((item, index) => {
              const Icon = iconMap[item.icon] || Diamond;

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    'p-5 md:p-6 rounded-xl',
                    'bg-dark-50 border-2 border-dark-100',
                    'hover:border-brand-500/30 transition-colors duration-300'
                  )}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.1 : 0.3,
                    delay: index * 0.05,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-cream-200 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-cream-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Premium Note Section */}
        {note && (() => {
          // Split note into main text and emphasis
          const [mainText, emphasisText] = note.split('\n\n');
          
          return (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Decorative separator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-linear-to-r from-transparent to-brand-500/30" />
                <div className="w-2 h-2 rounded-full bg-brand-500/50" />
                <div className="h-px w-16 bg-linear-to-l from-transparent to-brand-500/30" />
              </div>

              {/* Premium card */}
              <div className="relative max-w-2xl mx-auto p-8 md:p-10 rounded-2xl bg-dark-50/80 backdrop-blur-sm border border-brand-500/20 shadow-[0_0_40px_rgba(110,255,91,0.05)]">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-brand-500/30 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-brand-500/30 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-brand-500/30 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-brand-500/30 rounded-br-2xl" />

                {/* Main text */}
                <p className="text-cream-200 text-lg md:text-xl font-medium text-center leading-relaxed mb-6">
                  {mainText}
                </p>

                {/* Emphasis text with highlight */}
                {emphasisText && (
                  <div className="text-center">
                    <p className="text-cream-300 text-base md:text-lg leading-relaxed">
                      {emphasisText.split('*What the fuck?*')[0]}
                      <span className="inline-block mt-4 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 font-bold text-sm md:text-base">
                        What the fuck? 🤯
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}

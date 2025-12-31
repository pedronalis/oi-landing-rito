'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { PremiumIcon } from '@/components/ui/PremiumIcon';
import { cn } from '@/lib/utils';
import type { ArsenalItem, ArsenalCategory, ArsenalIconType } from '@/content/types';

interface TreasureMapArsenalProps {
  title: string;
  description: string;
  items: ArsenalItem[];
  note?: string;
}

// Category color configurations
const categoryConfig: Record<ArsenalCategory, { 
  color: string; 
  bgColor: string; 
  borderColor: string;
  glowColor: string;
  label: string;
}> = {
  produto: {
    color: 'text-brand-400',
    bgColor: 'bg-brand-500/5',
    borderColor: 'border-brand-500/30',
    glowColor: 'group-hover:shadow-brand-500/20',
    label: 'Produto & Oferta',
  },
  copy: {
    color: 'text-[#b388ff]',
    bgColor: 'bg-[#b388ff]/5',
    borderColor: 'border-[#b388ff]/30',
    glowColor: 'group-hover:shadow-[#b388ff]/20',
    label: 'Copy & Vendas',
  },
  conteudo: {
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/30',
    glowColor: 'group-hover:shadow-amber-500/20',
    label: 'Conteúdo & Mídia',
  },
  estrutura: {
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/30',
    glowColor: 'group-hover:shadow-cyan-500/20',
    label: 'Estrutura & Ensino',
  },
  oraculo: {
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/5',
    borderColor: 'border-rose-500/30',
    glowColor: 'group-hover:shadow-rose-500/20',
    label: 'Oráculos',
  },
  estrategia: {
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/5',
    borderColor: 'border-teal-500/30',
    glowColor: 'group-hover:shadow-teal-500/20',
    label: 'Estratégia',
  },
};

function TreasureCard({ item, index }: { item: ArsenalItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const config = categoryConfig[item.category];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className={cn(
          'relative h-full rounded-xl overflow-hidden',
          'border transition-all duration-500',
          config.borderColor,
          'hover:border-opacity-100',
          'bg-[#151515]/60 backdrop-blur-sm',
          'group-hover:shadow-lg',
          config.glowColor
        )}
      >
        {/* Parchment texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjgiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')] bg-repeat" />
        
        {/* Color accent bar */}
        <div className={cn('absolute left-0 top-0 bottom-0 w-1', config.bgColor.replace('/5', '/40'))} />
        
        {/* Content */}
        <div className="relative z-10 p-3.5 pl-4 sm:p-4 sm:pl-5 flex items-start gap-2.5 sm:gap-3">
          {/* Icon container */}
          <div
            className={cn(
              'shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center',
              'border transition-all duration-300',
              config.bgColor,
              config.borderColor,
              'group-hover:scale-110'
            )}
          >
            <PremiumIcon
              type={item.icon as ArsenalIconType}
              size="md"
              className={cn(config.color, 'transition-transform duration-300')}
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-cream-100 font-semibold text-sm leading-tight mb-1 group-hover:text-white transition-colors">
              {item.title}
            </h4>
            <p className="text-cream-500 text-xs leading-relaxed group-hover:text-cream-400 transition-colors">
              {item.description}
            </p>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
            'bg-linear-to-br',
            item.category === 'produto' && 'from-brand-500/5 to-transparent',
            item.category === 'copy' && 'from-[#b388ff]/5 to-transparent',
            item.category === 'conteudo' && 'from-amber-500/5 to-transparent',
            item.category === 'estrutura' && 'from-cyan-500/5 to-transparent',
            item.category === 'oraculo' && 'from-rose-500/5 to-transparent',
            item.category === 'estrategia' && 'from-teal-500/5 to-transparent'
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// Compass Rose SVG Component with Animation
function CompassRose({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={cn('relative', className)}
    >
      <svg
        className="w-20 h-20 md:w-24 md:h-24"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Outer ring - animated rotation */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#compassGradient)"
          strokeWidth="1"
          strokeDasharray="6 4"
          opacity="0.6"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        />
        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="rgba(110, 255, 91, 0.25)"
          strokeWidth="0.5"
        />
        {/* Cardinal points markers */}
        <circle cx="50" cy="8" r="2" fill="rgba(110, 255, 91, 0.5)" />
        <circle cx="50" cy="92" r="2" fill="rgba(179, 136, 255, 0.5)" />
        <circle cx="8" cy="50" r="2" fill="rgba(179, 136, 255, 0.4)" />
        <circle cx="92" cy="50" r="2" fill="rgba(110, 255, 91, 0.4)" />
        {/* North pointer */}
        <path
          d="M50 15 L54 42 L50 38 L46 42 Z"
          fill="url(#compassGradient)"
        />
        {/* South pointer */}
        <path
          d="M50 85 L54 58 L50 62 L46 58 Z"
          fill="rgba(179, 136, 255, 0.6)"
        />
        {/* East pointer */}
        <path
          d="M85 50 L58 46 L62 50 L58 54 Z"
          fill="rgba(110, 255, 91, 0.4)"
        />
        {/* West pointer */}
        <path
          d="M15 50 L42 46 L38 50 L42 54 Z"
          fill="rgba(179, 136, 255, 0.4)"
        />
        {/* Center circle with animated glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="6"
          fill="url(#compassGradient)"
          animate={{ scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 50px' }}
        />
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="#1f2121"
        />
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6eff5b" />
            <stop offset="100%" stopColor="#b388ff" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// Floating Particles Component - premium treasure map effect
// Particles drift downward and converge toward the X marker at bottom center
function FloatingParticles() {
  // Generate particle configurations - stable between renders
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    // Random horizontal position (10% to 90% of container width)
    startX: 10 + (i * 3.2) % 80,
    // Random size between 4px and 8px
    size: 4 + (i % 5),
    // Alternate between brand colors
    color: i % 3 === 0 ? '#6eff5b' : i % 3 === 1 ? '#b388ff' : '#fbbf24',
    // Animation duration (slower = more elegant)
    duration: 10 + (i % 5) * 2,
    // Animation delay for staggered effect
    delay: (i % 12) * 1.2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((particle) => {
        // Calculate x movement: start position -> center (50%)
        const startXPercent = particle.startX;
        const endXPercent = 50; // Center where X marker is
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              top: 0,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={{ 
              left: [`${startXPercent}%`, `${endXPercent}%`],
              top: ['0%', '98%'],
              opacity: [0, 0.7, 0.7, 0.7, 0.6, 0],
              scale: [1, 1, 1, 0.9, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

// X Marks the Spot Component - simple, no flicker
function TreasureMarker({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 2.8 }}
      className={cn('relative mt-12 md:mt-16', className)}
    >
      <svg
        className="w-12 h-12 md:w-14 md:h-14"
        viewBox="0 0 50 50"
        fill="none"
      >
        {/* X mark - simple without animation */}
        <path
          d="M12 12 L38 38 M38 12 L12 38"
          stroke="url(#xGradientSimple)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Simple dashed circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="url(#xGradientSimple)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
          fill="none"
        />
        <defs>
          <linearGradient id="xGradientSimple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6eff5b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function TreasureMapArsenal({
  title,
  description,
  items,
  note,
}: TreasureMapArsenalProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6 overflow-hidden"
    >
      {/* Animated background orbs - REMOVED per user request */}

      <div className="relative max-w-6xl mx-auto">
        {/* Header with Compass Rose */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          {/* Compass decoration */}
          <div className="flex justify-center mb-6">
            <CompassRose />
          </div>

          {/* Title */}
          <h2 className="max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4">
            {title.split('produtos e conteúdos').map((part, index, array) => {
              if (index === array.length - 1) {
                return <span key={index}>{part}</span>;
              }
              return (
                <span key={index}>
                  {part}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-brand-300">
                    produtos
                  </span>
                  {' e '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-400 to-accent-300">
                    conteúdos
                  </span>
                </span>
              );
            })}
          </h2>
          <p className="text-brand-400 text-sm md:text-base font-medium">
            {description}
          </p>
        </motion.div>

        {/* Treasure Map Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Floating Particles effect */}
          <div>
            <FloatingParticles />
          </div>

          {/* Items Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 md:gap-4">
            {items.map((item, index) => (
              <TreasureCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Treasure Marker at bottom */}
          <div className="flex flex-col items-center mt-8">
            <TreasureMarker />
            {/* Minimalist arrow pointing to note box */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 3.2 }}
              className="mt-4"
            >
              <motion.svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M2 2L10 10L18 2"
                  stroke="url(#arrowGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6eff5b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Note section - Premium Treasure Box */}
        {note && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 md:mt-16 max-w-3xl mx-auto"
          >
            <div className="group relative p-5 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-linear-to-br from-gold-500/10 via-gold-400/5 to-transparent backdrop-blur-sm border border-gold-400/30 hover:border-gold-400/50 transition-all duration-500 shadow-lg shadow-gold-500/10 hover:shadow-lg hover:shadow-gold-500/15 hover:scale-[1.01]">
              {/* Decorative corner accents - mais descoladas da borda */}
              <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-gold-400/20 rounded-tl-2xl" />
              <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-gold-400/20 rounded-tr-2xl" />
              <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-gold-400/20 rounded-bl-2xl" />
              <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-gold-400/20 rounded-br-2xl" />

              {/* Sparkle icon - brilhinho da biblioteca */}
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="relative"
                >
                  <Sparkles
                    className="w-8 h-8 md:w-10 md:h-10 text-gold-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.2)]"
                    strokeWidth={1}
                  />
                </motion.div>
              </div>

              {/* Text content - texto corrido para quebra automática */}
              <div className="space-y-6 text-center px-2 md:px-4">
                {/* First paragraph */}
                <p className="text-cream-200 text-base md:text-lg leading-relaxed font-medium">
                  Tudo engenhado para você criar um negócio digital inédito enquanto o resto continua preso no &quot;mais do mesmo&quot;.
                </p>

                {/* Second paragraph */}
                <p className="text-cream-200 text-base md:text-lg leading-relaxed font-medium">
                  Vai vender tanto, mas <span className="font-bold text-gold-400">TANTO</span>, que até você vai começar a duvidar dos próprios números.{' '}
                  <span className="italic text-cream-300">What the fuck?</span>
                </p>
              </div>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl bg-linear-to-br from-gold-400/5 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

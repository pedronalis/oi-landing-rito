import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { PremiumIcon } from '@/components/ui/PremiumIcon';
import { Prose } from '@/components/ui/Prose';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { GuaranteeSection as GuaranteeSectionType } from '@/content/types';

interface GuaranteeSectionProps {
  section: GuaranteeSectionType;
}

export function GuaranteeSection({ section }: GuaranteeSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-16 sm:py-20 md:py-32 lg:py-40 px-5 sm:px-6 overflow-hidden"
    >
      {/* Background Orbs - Premium Pattern (Reduzido) */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Bola Brand - Verde */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(110, 255, 91, 0.06) 0%, rgba(110, 255, 91, 0.02) 40%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                    x: [0, 30, -20, 0],
                    y: [0, -40, 20, 0],
                    scale: [1, 1.25, 0.85, 1],
                  }
              }
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(110, 255, 91, 0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
              }}
            />
          </motion.div>

          {/* Bola Accent - Roxo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute bottom-[5%] right-1/4 w-64 h-64 md:w-80 md:h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(179, 136, 255, 0.06) 0%, rgba(179, 136, 255, 0.02) 40%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                    x: [0, -25, 35, 0],
                    y: [0, 30, -25, 0],
                    scale: [1, 0.8, 1.3, 1],
                  }
              }
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(179, 136, 255, 0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
              }}
            />
          </motion.div>
        </div>
      )}

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Container interno centralizado */}
        <div className="flex flex-col items-center">
          {/* Flex: Selo + Título/Descrição */}
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-10 items-center justify-center w-full mb-6 sm:mb-8 md:mb-10">
            {/* Selo de Garantia */}
            <ScrollReveal withScale delay={0}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                      scale: 1.05,
                      transition: {
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative shrink-0 group"
              >
                {/* Glow Effect do Selo - Mais Suave com Hover */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                        scale: [1, 1.02, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1.05, 1.08, 1.05],
                      }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-brand-500/15 rounded-full blur-xl -z-10"
                  aria-hidden="true"
                />

                {/* Selo Premium */}
                <div className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                  {/* Border Animado com Gradiente Rotativo - Mais Sutil com Hover */}
                  <div className="absolute inset-0 rounded-full p-[2px] animate-premium-border opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full rounded-full bg-linear-to-br from-dark-50 to-dark-100/70 backdrop-blur-xl border border-brand-500/20" />
                  </div>

                  {/* Conteúdo do Selo */}
                  <div className="absolute inset-[2px] flex flex-col items-center justify-center rounded-full">
                    {/* Número "7" Grande */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="text-5xl md:text-6xl lg:text-6xl font-extrabold bg-linear-to-br from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent"
                    >
                      7
                    </motion.div>

                    {/* Texto "DIAS DE" */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="text-xs md:text-sm font-semibold text-brand-400/90 mt-1 tracking-wider"
                    >
                      DIAS DE
                    </motion.div>

                    {/* Texto "GARANTIA" */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="text-[10px] md:text-xs font-medium text-cream-400/80 mt-0.5 tracking-wide"
                    >
                      GARANTIA
                    </motion.div>
                  </div>

                  {/* Decoração - Check Mark Sutil com Hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute -top-1.5 -right-1.5"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-500/15 backdrop-blur-sm border border-brand-400/30 flex items-center justify-center group-hover:bg-brand-500/25 group-hover:border-brand-400/50 transition-all duration-300">
                      <PremiumIcon
                        type="check"
                        size="sm"
                        color="brand"
                        className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Título/Descrição - Largura limitada */}
            <div className="max-w-md md:max-w-lg text-center md:text-left">
              {/* Título com Gradiente Premium - Mais Suave */}
              <ScrollReveal withScale delay={0.1}>
                <h2 className="mb-6 md:mb-8 text-balance">
                  <span className="bg-linear-to-r from-brand-400 via-brand-300 to-accent-400 bg-clip-text text-transparent">
                    {section.title}
                  </span>
                </h2>
              </ScrollReveal>

              {/* Descrição */}
              <ScrollReveal delay={0.2}>
                <Prose
                  content={section.description}
                  className="leading-[1.75]"
                  customComponents={{
                    p: ({ children }) => {
                      const text = String(children);
                      // Prevenir quebra de linha entre "plataforma de" e "IA"
                      const parts = text.split(/(plataforma de IA)/i);
                      return (
                        <p className="leading-relaxed text-cream-300 mb-4">
                          {parts.map((part, i) => {
                            if (part.toLowerCase() === 'plataforma de ia') {
                              return (
                                <span key={i} className="whitespace-nowrap">
                                  {part}
                                </span>
                              );
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </p>
                      );
                    },
                  }}
                />
              </ScrollReveal>
            </div>
          </div>

          {/* Card - Centralizado e com largura limitada */}
          <div className="w-full max-w-2xl mx-auto">
            <ScrollReveal delay={0.2} parallax parallaxIntensity={0.05}>
              <div className="relative">
                {/* Glow Effect Contextual - Mais Suave */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -inset-4 bg-brand-500/5 rounded-2xl blur-2xl -z-10"
                  aria-hidden="true"
                />

                {/* Border Gradient Animado Wrapper */}
                <div className="animate-premium-border rounded-2xl p-[2px]">
                  <GlassPanel
                    highlighted
                    hover
                    className="p-8 md:p-10 lg:p-12 bg-linear-to-br from-dark-50 to-dark-100/50"
                  >
                    {/* Lista com Staggered Animation */}
                    <StaggerContainer staggerDelay={0.1} initialDelay={0.2}>
                      <ul className="space-y-4 md:space-y-5">
                        {section.items.map((item, index) => (
                          <StaggerItem key={index} withScale direction="up">
                            <motion.li
                              className="text-cream-200 flex items-center gap-3 text-base md:text-lg leading-[1.6] tracking-wide"
                              whileHover={
                                shouldReduceMotion
                                  ? {}
                                  : {
                                    x: 4,
                                    transition: { duration: 0.2 },
                                  }
                              }
                            >
                              {/* Check Icon com Background Circular */}
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={
                                  isInView
                                    ? { scale: 1, rotate: 0 }
                                    : { scale: 0, rotate: -180 }
                                }
                                transition={{
                                  duration: 0.5,
                                  delay: 0.3 + index * 0.1,
                                  ease: [0.34, 1.56, 0.64, 1],
                                }}
                                className="relative shrink-0"
                              >
                                <div className="absolute inset-0 bg-brand-400/10 rounded-full blur-sm" />
                                <PremiumIcon
                                  type="check"
                                  size="md"
                                  color="brand"
                                  className="relative opacity-90"
                                />
                              </motion.div>
                              <span>{item}</span>
                            </motion.li>
                          </StaggerItem>
                        ))}
                      </ul>
                    </StaggerContainer>
                  </GlassPanel>
                </div>

                {/* Discrete cancel notice - bottom right corner */}
                <p className="text-brand-400 text-sm md:text-base text-right mt-4 mr-2 opacity-80 italic">
                  Se não curtir… é só cancelar!
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TestimonialsSectionProps {
  title: string;
}

interface Testimonial {
  id: number;
  src: string;
  alt: string;
}

// Array de depoimentos - Estrutura simplificada
const testimonials: Testimonial[] = [
  { id: 1, src: '/uploads/depoiments/Depo 1.webp', alt: 'Depoimento 1' },
  { id: 2, src: '/uploads/depoiments/Depo 2.webp', alt: 'Depoimento 2' },
  { id: 3, src: '/uploads/depoiments/Depo 3.webp', alt: 'Depoimento 3' },
  { id: 4, src: '/uploads/depoiments/Depo 4.webp', alt: 'Depoimento 4' },
  { id: 5, src: '/uploads/depoiments/Depo 5.webp', alt: 'Depoimento 5' },
  { id: 6, src: '/uploads/depoiments/Depo 6.webp', alt: 'Depoimento 6' },
  { id: 7, src: '/uploads/depoiments/Depo 7.webp', alt: 'Depoimento 7' },
  { id: 8, src: '/uploads/depoiments/Depo 8.webp', alt: 'Depoimento 8' },
  { id: 9, src: '/uploads/depoiments/Depo 9.webp', alt: 'Depoimento 9' },
  { id: 10, src: '/uploads/depoiments/Depo 10.webp', alt: 'Depoimento 10' },
  { id: 11, src: '/uploads/depoiments/Depo 11.webp', alt: 'Depoimento 11' },
];

interface TestimonialsModalProps {
  open: boolean;
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
  items: Testimonial[];
}

function TestimonialsModal({
  open,
  index,
  setIndex,
  onClose,
  items,
}: TestimonialsModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const goPrev = () => setIndex(index === 0 ? items.length - 1 : index - 1);
  const goNext = () => setIndex(index === items.length - 1 ? 0 : index + 1);

  // Touch handlers (swipe)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
  };

  // Fechar modal com ESC + travar scroll
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose, index]); // Adicionado index dependency para arrow keys atualizadas

  // Preload imagens ao abrir o modal para evitar "reload" ao navegar
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;

    for (const t of items) {
      const img = new window.Image();
      img.decoding = 'async';
      img.src = t.src;
    }
  }, [open, items]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-100 flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none">
            {/* Botão Fechar - Fora da imagem, topo direito */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={cn(
                'absolute top-4 right-4 md:top-8 md:right-8 z-30 pointer-events-auto',
                'p-2 rounded-lg',
                'bg-black/20 backdrop-blur-sm border border-cream-400/10',
                'text-cream-400/70 hover:text-cream-300',
                'transition-all duration-200',
                'hover:bg-black/30 hover:border-cream-400/20',
                'focus:outline-none focus:ring-1 focus:ring-cream-400/30'
              )}
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Container da Imagem - Centralizado, maior */}
            <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.3,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Imagem */}
                <div className="relative w-[96vw] h-[88vh] md:w-[92vw] md:h-[86vh] max-w-[1280px]">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0.15 : 0.2,
                        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={items[index].src}
                        alt={items[index].alt}
                        fill
                        sizes="(max-width: 768px) 96vw, (max-width: 1024px) 92vw, 1280px"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Navegação e Contador - Mobile: Barra Inferior / Desktop: Laterais + Contador Isolado */}
              <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-4 px-4 pointer-events-none md:contents">
                
                {/* Botão Anterior */}
                {items.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className={cn(
                      'pointer-events-auto p-3 rounded-lg',
                      'bg-black/20 backdrop-blur-sm border border-cream-400/10',
                      'text-cream-400/70 hover:text-cream-300',
                      'transition-all duration-200',
                      'hover:bg-black/30 hover:border-cream-400/20 active:scale-95',
                      'focus:outline-none focus:ring-1 focus:ring-cream-400/30',
                      // Desktop Positioning
                      'md:absolute md:left-8 md:top-1/2 md:-translate-y-1/2 md:z-30'
                    )}
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Contador */}
                <div className="pointer-events-none">
                  <div className={cn(
                    "px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm border border-cream-400/10",
                    // Desktop Positioning
                    "md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:z-20"
                  )}>
                    <span className="text-sm text-cream-400/80 font-medium">
                      {index + 1} / {items.length}
                    </span>
                  </div>
                </div>

                {/* Botão Próximo */}
                {items.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className={cn(
                      'pointer-events-auto p-3 rounded-lg',
                      'bg-black/20 backdrop-blur-sm border border-cream-400/10',
                      'text-cream-400/70 hover:text-cream-300',
                      'transition-all duration-200',
                      'hover:bg-black/30 hover:border-cream-400/20 active:scale-95',
                      'focus:outline-none focus:ring-1 focus:ring-cream-400/30',
                      // Desktop Positioning
                      'md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2 md:z-30'
                    )}
                    aria-label="Próximo depoimento"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function TestimonialsSection({ title }: TestimonialsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  
  // Estado para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Abrir modal ao clicar na imagem
  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Componente de Card de Depoimento - Layout Masonry
  const TestimonialCard = ({ 
    testimonial, 
    index, 
    isMobile = false 
  }: { 
    testimonial: Testimonial; 
    index: number;
    isMobile?: boolean;
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={cardInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
            scale: 0.96,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: shouldReduceMotion ? 0.3 : 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
          },
        }}
          className={cn(
          'w-full',
          !isMobile && 'break-inside-avoid mb-6',
          isMobile && 'shrink-0'
        )}
        style={!isMobile ? {
          breakInside: 'avoid',
          pageBreakInside: 'avoid',
        } : {}}
      >
        {/* Wrapper com Borda Gradiente Animada */}
        <motion.div
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  scale: 1.01,
                  transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
          }
          className={cn(
            'w-full rounded-xl',
            'animate-premium-border',
            'group',
            'cursor-pointer'
          )}
          onClick={(e) => {
            e.stopPropagation();
            openModal(index);
          }}
        >
          {/* Card Interno - Ajusta ao tamanho natural da imagem */}
          <div className="relative rounded-[10px] overflow-hidden bg-dark-50/30 w-full">
            {/* Imagem - Tamanho aumentado para melhor legibilidade */}
            <div className="relative w-full">
              <Image
                src={testimonial.src}
                alt={testimonial.alt}
                width={1200}
                height={1600}
                className="object-contain w-full h-auto"
                style={{ 
                  maxWidth: isMobile ? '85vw' : '100%',
                  height: 'auto',
                  display: 'block'
                }}
                sizes={isMobile ? '85vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px'}
                priority={index < 3}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section ref={sectionRef} className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Título da Seção */}
          <ScrollReveal withScale>
            <h2 className="text-center mb-12 md:mb-16">{title}</h2>
          </ScrollReveal>

          {/* Masonry Layout Unificado Responsivo 
              - Mobile (< 768px): 1 coluna
              - Tablet (768px - 1024px): 2 colunas
              - Desktop (≥ 1024px): 3 colunas 
          */}
          <StaggerContainer staggerDelay={0.08}>
            <div 
              className="gap-4 md:gap-6"
              style={{
                columnCount: 1, // Default mobile
              }}
            >
              {/* CSS para breakpoints de colunas - Mais robusto que JS condicional */}
              <style jsx>{`
                @media (min-width: 640px) {
                  .gap-4 { column-count: 2 !important; }
                }
                @media (min-width: 1024px) {
                  .gap-4 { column-count: 3 !important; }
                }
              `}</style>
              
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={testimonial.id}>
                  <TestimonialCard 
                    testimonial={testimonial} 
                    index={index} 
                    // Passar isMobile apenas para ajustes finos se necessário, 
                    // mas o layout agora é controlado por CSS
                    isMobile={false} 
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <TestimonialsModal 
        open={modalOpen} 
        index={activeIndex} 
        setIndex={setActiveIndex}
        onClose={closeModal} 
        items={testimonials} 
      />
    </>
  );
}

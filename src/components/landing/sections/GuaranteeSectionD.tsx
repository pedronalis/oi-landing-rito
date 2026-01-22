import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { CTAButton } from '@/components/ui/CTAButton';
import type { Section } from '@/content/types';

interface GuaranteeSectionDProps {
  section: Extract<Section, { type: 'guarantee' }>;
}

export function GuaranteeSectionD({ section }: GuaranteeSectionDProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal withScale>
          <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-10">
            {/* CTA Button */}
            <CTAButton
              withGlow
              withPulse
              variant="primary"
              className="text-lg md:text-xl px-12 py-5 min-w-[300px]"
              onClick={scrollToPricing}
            >
              QUERO ENTRAR PRA A ORDEM
            </CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

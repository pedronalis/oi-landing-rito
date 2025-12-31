'use client';

import { Clock, HelpCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

import { landingBContent } from '@/content/landingB';
import { CTAButton } from '@/components/ui/CTAButton';
import { CTAHintBadges } from '@/components/ui/CTAHint';
import { GradientOrbs } from '@/components/ui/GradientOrbs';
import { VideoFrame } from '@/components/ui/VideoFrame';
import { FAQCard } from '@/components/ui/FAQCard';
import { Footer } from '@/components/ui/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HowWeDefeatSectionB } from './sections/HowWeDefeatSectionB';
import { useUtmSourceSuffix } from '@/hooks/useUtmSourceSuffix';

// Above-fold components (keep static imports)
import { SplitHero } from './sections/SplitHero';
import { VerticalTimeline } from './sections/VerticalTimeline';
import { TabbedArsenal } from './sections/TabbedArsenal';
import { ComparisonSlider } from './sections/ComparisonSlider';

// Dynamic imports for below-fold heavy components (code splitting)
const ExperienceCarousel = dynamic(
  () => import('./sections/ExperienceCarousel').then(mod => ({ default: mod.ExperienceCarousel })),
  { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const StorytellingManifesto = dynamic(
  () => import('./sections/StorytellingManifesto').then(mod => ({ default: mod.StorytellingManifesto })),
  { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const PricingSection = dynamic(
  () => import('./sections/PricingSection').then(mod => ({ default: mod.PricingSection })),
  { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const TestimonialsSection = dynamic(
  () => import('./sections/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })),
  { loading: () => <div className="min-h-96 bg-dark-50/50 animate-pulse" /> }
);

const GuaranteeSection = dynamic(
  () => import('./sections/GuaranteeSection').then(mod => ({ default: mod.GuaranteeSection })),
  { loading: () => <div className="min-h-64 bg-dark-50/50 animate-pulse" /> }
);

export function LandingB() {
  const { hero, sections, pricing } = landingBContent;
  
  // Appends 'B' to utm_source (e.g., facebook -> facebookB)
  useUtmSourceSuffix('B');

  // Função para scroll suave até a seção de pricing
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Gradient background orbs */}
      <GradientOrbs enhanced />

      {/* Hero Section - SPLIT LAYOUT (Nova) */}
      <SplitHero
        logoSrc="/uploads/logo.webp"
        headline={
          <>
            Uma nova forma de{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-brand-300">SER</span>
            {/* Mobile: break after SER */}
            <br className="lg:hidden" />
            {/* Desktop: break after SER (same line with 'e') */}
            <br className="hidden lg:block" />
            <span className="lg:hidden">e </span>
            <span className="hidden lg:inline">e </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-400 to-accent-300">CRIAR</span>
            {' '}no Digital
          </>
        }
        subtitle={hero.subtitle}
        videoLabel={hero.heroVideoLabel}
        ctaLabel={hero.primaryCtaLabel}
        onCtaClick={scrollToPricing}
      />

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Platform Section - VERTICAL TIMELINE (Nova) */}
      {sections.find((s) => s.type === 'platform') && (() => {
        const section = sections.find((s) => s.type === 'platform') as Extract<
          typeof sections[number],
          { type: 'platform' }
        >;
        return (
          <VerticalTimeline
            title={section.title}
            description={section.description}
            features={section.features}
          />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Extraverso Section - mantém similar mas sem partículas */}
      {sections.find((s) => s.type === 'extraverso') && (() => {
        const section = sections.find((s) => s.type === 'extraverso') as Extract<
          typeof sections[number],
          { type: 'extraverso' }
        >;
        return (
          <section className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6">
            <div className="max-w-4xl mx-auto relative z-10">
              <ScrollReveal>
                {/* Description - Top */}
                <div className="text-center mb-8">
                  <p className="text-brand-400 text-sm md:text-base font-medium tracking-wide">
                    {section.description}
                  </p>
                </div>

                {/* Title */}
                <h2 className="mb-6 text-center px-8 md:px-12 lg:px-16">
                  {section.title.split('EXTRAVERSO').map((part, index, array) => {
                    if (index === array.length - 1) {
                      return <span key={index}>{part}</span>;
                    }
                    return (
                      <span key={index}>
                        {part}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 via-brand-300 to-accent-400 font-extrabold">
                          EXTRAVERSO
                        </span>
                      </span>
                    );
                  })}
                </h2>
                
                {section.subtitle && (
                  <p className="text-center text-[#b388ff] text-sm md:text-base font-medium tracking-wide mb-10">
                    {section.subtitle}
                  </p>
                )}
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <VideoFrame label={section.videoLabel} className="mb-10" />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="text-center space-y-5">
                  <CTAButton
                    withGlow
                    withPulse
                    variant="primary"
                    className="text-lg md:text-xl px-10 py-5"
                    onClick={scrollToPricing}
                  >
                    {section.ctaLabel}
                  </CTAButton>
                  <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Arsenal Section - TABBED (Nova) */}
      {sections.find((s) => s.type === 'arsenal') && (() => {
        const section = sections.find((s) => s.type === 'arsenal') as Extract<
          typeof sections[number],
          { type: 'arsenal' }
        >;
        return (
          <TabbedArsenal
            title={section.title}
            description={section.description}
            items={section.items}
            note={section.note ?? ''}
          />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Comparison Section - SLIDER TOGGLE (Nova) */}
      {sections.find((s) => s.type === 'comparison') && (() => {
        const section = sections.find((s) => s.type === 'comparison') as Extract<
          typeof sections[number],
          { type: 'comparison' }
        >;
        return (
          <ComparisonSlider
            withoutTitle={section.without.title}
            withoutItems={section.without.items}
            withTitle={section.with.title}
            withItems={section.with.items}
          />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* How We Defeat Section - Landing B version with Lucide Brain */}
      {sections.find((s) => s.type === 'how-we-defeat') && (() => {
        const section = sections.find((s) => s.type === 'how-we-defeat') as Extract<
          typeof sections[number],
          { type: 'how-we-defeat' }
        >;
        return (
          <HowWeDefeatSectionB
            title={section.title}
            description={section.description}
            videoLabel={section.videoLabel}
            ctaLabel={section.ctaLabel}
            onCtaClick={scrollToPricing}
          />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Experiences Section - CAROUSEL (Nova) */}
      {sections.find((s) => s.type === 'experiences') && (() => {
        const section = sections.find((s) => s.type === 'experiences') as Extract<
          typeof sections[number],
          { type: 'experiences' }
        >;
        return (
          <ExperienceCarousel
            title={section.title}
            description={section.description}
            experiences={section.experiences}
          />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Manifesto Section - STORYTELLING (Nova) */}
      {sections.find((s) => s.type === 'manifesto') && (() => {
        const section = sections.find((s) => s.type === 'manifesto') as Extract<
          typeof sections[number],
          { type: 'manifesto' }
        >;
        return (
          <StorytellingManifesto
            title={section.title}
            description={section.description}
            market={section.market}
            ordem={section.ordem}
            quote={section.quote}
          />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Testimonials Section */}
      {sections.find((s) => s.type === 'testimonials') && (() => {
        const section = sections.find((s) => s.type === 'testimonials') as Extract<
          typeof sections[number],
          { type: 'testimonials' }
        >;
        return (
          <TestimonialsSection title={section.title} />
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Pricing Section */}
      {sections.find((s) => s.type === 'pricing') && (() => {
        const section = sections.find((s) => s.type === 'pricing') as Extract<
          typeof sections[number],
          { type: 'pricing' }
        >;
        return (
          <div id="pricing-section" className="scroll-mt-20">
            <PricingSection
              title={section.title}
              description={section.description}
              pricing={pricing}
            />
          </div>
        );
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* Guarantee Section */}
      {sections.find((s) => s.type === 'guarantee') && (() => {
        const section = sections.find((s) => s.type === 'guarantee') as Extract<
          typeof sections[number],
          { type: 'guarantee' }
        >;
        return <GuaranteeSection section={section} />;
      })()}

      {/* Section Separator */}
      <div className="section-separator max-w-4xl mx-auto" />

      {/* FAQ Section */}
      {sections.find((s) => s.type === 'faq') && (() => {
        const section = sections.find((s) => s.type === 'faq') as Extract<
          typeof sections[number],
          { type: 'faq' }
        >;
        const finalCtaSection = sections.find((s) => s.type === 'finalCta') as Extract<
          typeof sections[number],
          { type: 'finalCta' }
        > | undefined;

        // Schema.org FAQ JSON-LD for SEO
        const faqSchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: section.questions.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer.replace(/\n\n/g, ' ').trim(),
            },
          })),
        };

        return (
          <>
            {/* Schema.org JSON-LD for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <section
              className="relative z-10 py-14 sm:py-16 md:py-28 lg:py-32 px-5 sm:px-6"
              aria-labelledby="faq-heading"
            >
              {/* Hidden heading for accessibility */}
              <h2
                id="faq-heading"
                className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                style={{ clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)' }}
              >
                Perguntas Frequentes
              </h2>
              <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                {section.questions.map((faq, index) => {
                  const isFirstQuestion = index === 0;

                  return (
                    <ScrollReveal key={index} delay={index * 0.1} withScale>
                      <FAQCard
                        question={faq.question}
                        answer={faq.answer}
                        index={index}
                        id={`faq-${index}`}
                        icon={isFirstQuestion ? Clock : HelpCircle}
                        variant={isFirstQuestion ? 'neutral' : 'highlight'}
                        badge={!isFirstQuestion ? '💡 TESTE AGORA' : undefined}
                      />
                    </ScrollReveal>
                  );
                })}

                {/* Visual separator before CTA */}
                <div className="flex justify-center py-4">
                  <div className="w-24 h-px bg-linear-to-r from-transparent via-brand-400/30 to-transparent" />
                </div>

                {/* CTA Section below both FAQ cards */}
                {finalCtaSection && (
                  <ScrollReveal delay={0.2} withScale>
                    <div className="pt-4 md:pt-8">
                      <div className="flex flex-col items-center space-y-6 md:space-y-7">
                        <CTAButton
                          withGlow
                          withPulse
                          variant="primary"
                          className="text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 w-full sm:w-auto min-w-[280px] sm:min-w-[300px] md:min-w-[320px]"
                          aria-label={`${finalCtaSection.ctaLabel}. Multiplicar ROI, Ganhar Tempo, Saúde Mental`}
                          onClick={scrollToPricing}
                        >
                          {finalCtaSection.ctaLabel}
                        </CTAButton>

                        <CTAHintBadges items={['Multiplicar ROI', 'Ganhar Tempo', 'Saúde Mental']} />

                        {finalCtaSection.note && (
                          <p 
                            className="text-sm md:text-base lg:text-lg text-cream-500 italic pt-2 md:pt-4 text-center max-w-2xl leading-relaxed mx-auto"
                            style={{ fontFamily: 'var(--font-body), "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
                          >
                            {finalCtaSection.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </section>
          </>
        );
      })()}


      {/* Footer */}
      <Footer />
    </div>
  );
}

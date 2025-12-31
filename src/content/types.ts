/**
 * Tipos TypeScript para estrutura de conteúdo das landing pages
 */

export interface SEO {
  title: string;
  description: string;
}

export interface Nav {
  logoText: string;
}

export interface Hero {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryHint: string;
  heroVideoLabel: string;
}

export interface Plan {
  name: string;
  description: string;
  features: string[];
  price: string;
  priceNote?: string;
  priceSubnote?: string;
  ctaLabel: string;
  checkoutUrl?: string;
  highlighted?: boolean;
}

export interface Pricing {
  plans: Plan[];
}

export type SectionType =
  | 'platform'
  | 'extraverso'
  | 'arsenal'
  | 'comparison'
  | 'how-we-defeat'
  | 'experiences'
  | 'manifesto'
  | 'testimonials'
  | 'pricing'
  | 'guarantee'
  | 'faq'
  | 'finalCta';

export interface BaseSection {
  id: SectionType;
  type: SectionType;
}

export interface PlatformSection extends BaseSection {
  type: 'platform';
  title: string | string[];
  description: string;
  features: Array<{
    number: string;
    title: string;
    description: string;
    icon: 'target' | 'folder' | 'lightning' | 'brain';
  }>;
}

export interface ExtraversoSection extends BaseSection {
  type: 'extraverso';
  title: string;
  description: string;
  subtitle?: string;
  videoLabel: string;
  ctaLabel: string;
  hint: string;
}

export type ArsenalIconType = 
  | 'diamond'      // Produto & Oferta
  | 'quill'        // Copy & Vendas
  | 'sparkles'     // Conteúdo & Mídia
  | 'book-open'    // Estrutura & Ensino
  | 'crystal-ball' // Oráculos
  | 'compass';     // Estratégia

export type ArsenalCategory = 
  | 'produto'    // Verde Brand
  | 'copy'       // Roxo Accent
  | 'conteudo'   // Amber
  | 'estrutura'  // Cyan
  | 'oraculo'    // Rose
  | 'estrategia'; // Teal

export interface ArsenalItem {
  id: string;
  title: string;
  description: string;
  icon: ArsenalIconType;
  category: ArsenalCategory;
}

export interface ArsenalSection extends BaseSection {
  type: 'arsenal';
  title: string;
  description: string;
  items: ArsenalItem[];
  note?: string;
}

export interface ComparisonSection extends BaseSection {
  type: 'comparison';
  title: string;
  without: {
    title: string;
    items: string[];
  };
  with: {
    title: string;
    items: string[];
  };
}

export interface HowWeDefeatSection extends BaseSection {
  type: 'how-we-defeat';
  title: string;
  description: string;
  videoLabel: string;
  ctaLabel: string;
  hint: string;
}

export interface ExperiencesSection extends BaseSection {
  type: 'experiences';
  title: string;
  description: string;
  experiences: Array<{
    name: string;
    description: string;
    idealFor: string;
  }>;
}

export interface ManifestoSection extends BaseSection {
  type: 'manifesto';
  title: string;
  description: string;
  market: Array<{
    emoji: string;
    text: string;
  }>;
  ordem: Array<{
    emoji: string;
    text: string;
  }>;
  quote: string;
}

export interface TestimonialsSection extends BaseSection {
  type: 'testimonials';
  title: string;
}

export interface PricingSection extends BaseSection {
  type: 'pricing';
  title: string;
  description: string;
}

export interface GuaranteeSection extends BaseSection {
  type: 'guarantee';
  title: string;
  description: string;
  items: string[];
}

export interface FAQSection extends BaseSection {
  type: 'faq';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface FinalCtaSection extends BaseSection {
  type: 'finalCta';
  title: string;
  description: string;
  ctaLabel: string;
  hint: string;
  note?: string;
}

export type Section =
  | PlatformSection
  | ExtraversoSection
  | ArsenalSection
  | ComparisonSection
  | HowWeDefeatSection
  | ExperiencesSection
  | ManifestoSection
  | TestimonialsSection
  | PricingSection
  | GuaranteeSection
  | FAQSection
  | FinalCtaSection;

export interface LandingContent {
  seo: SEO;
  nav: Nav;
  hero: Hero;
  sections: Section[];
  pricing: Pricing;
}


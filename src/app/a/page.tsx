import { LandingA } from '@/components/landing/LandingA';
import { landingAContent } from '@/content/landingA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: landingAContent.seo.title,
  description: landingAContent.seo.description,
};

export default function LandingAPage() {
  return <LandingA />;
}


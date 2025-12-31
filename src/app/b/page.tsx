import { LandingB } from '@/components/landing/LandingB';
import { landingBContent } from '@/content/landingB';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: landingBContent.seo.title,
  description: landingBContent.seo.description,
};

export default function LandingBPage() {
  return <LandingB />;
}


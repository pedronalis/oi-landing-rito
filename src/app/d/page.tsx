import { LandingD } from '@/components/landing/LandingD';
import { landingDContent } from '@/content/landingD';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: landingDContent.seo.title,
    description: landingDContent.seo.description,
};

export default function LandingDPage() {
    return <LandingD />;
}

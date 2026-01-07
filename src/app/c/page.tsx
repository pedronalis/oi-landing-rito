import { LandingC } from '@/components/landing/LandingC';
import { landingCContent } from '@/content/landingC';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: landingCContent.seo.title,
    description: landingCContent.seo.description,
};

export default function LandingCPage() {
    return <LandingC />;
}

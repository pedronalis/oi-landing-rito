'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to capture UTM parameters from the current URL (from ads)
 * and build a query string to append to checkout URLs.
 * 
 * UTMs captured: utm_campaign, utm_medium, utm_content, utm_term
 * (utm_source is already in the checkout URL and will be preserved)
 */
export function useAdUtmParams() {
    const [adUtmString, setAdUtmString] = useState('');

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);

        // UTM params we want to capture from ads
        const utmKeys = ['utm_campaign', 'utm_medium', 'utm_content', 'utm_term'];

        const capturedParams: string[] = [];

        utmKeys.forEach(key => {
            const value = urlParams.get(key);
            if (value) {
                capturedParams.push(`${key}=${encodeURIComponent(value)}`);
            }
        });

        if (capturedParams.length > 0) {
            setAdUtmString('&' + capturedParams.join('&'));
        }
    }, []);

    /**
     * Appends captured UTM params to a checkout URL
     * @param baseUrl - The base checkout URL (with utm_source already)
     * @returns URL with all UTM params concatenated
     */
    const appendUtmsToUrl = (baseUrl: string): string => {
        if (!adUtmString) return baseUrl;

        // If URL has query params, append with &
        // If not, this shouldn't happen since our URLs have utm_source
        return baseUrl + adUtmString;
    };

    return { adUtmString, appendUtmsToUrl };
}

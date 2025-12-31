import { useEffect } from 'react';

/**
 * Hook to append a suffix to 'utm_source' in all links (<a> tags) on the page.
 * It uses a MutationObserver to ensure even ensuring links added dynamically
 * (or modified by other scripts like Utmify) get the suffix.
 * 
 * @param suffix - The suffix to append (e.g., 'A' or 'B')
 */
export function useUtmSourceSuffix(suffix: string) {
  useEffect(() => {
    // Function to process all links
    const processLinks = () => {
      const links = document.querySelectorAll('a[href]');
      
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        const href = anchor.href;

        // Skip if not a valid URL or internal anchor
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

        try {
          const url = new URL(href);
          const searchParams = url.searchParams;
          const currentSource = searchParams.get('utm_source');

          // Logic to determine new source
          let newSource = currentSource;

          if (currentSource) {
            // Check if already ends with suffix
            if (!currentSource.endsWith(suffix)) {
              newSource = `${currentSource}${suffix}`;
            }
          } else {
            // Default source if none exists
            newSource = `organic${suffix}`;
          }

          // Apply only if changed to avoid infinite loops/redundant updates
          if (newSource !== currentSource) {
            searchParams.set('utm_source', newSource!);
            anchor.href = url.toString();
          }

        } catch {
          // Ignore invalid URLs
        }
      });
    };

    // Run initial process
    processLinks();

    // Observe DOM changes to handle dynamic content or script modifications
    const observer = new MutationObserver(() => {
      // Simple debounce or just run processLinks
      // Since changing href triggers mutation, we need to be careful.
      // However, processLinks checks if change is needed, so it's relatively safe.
      processLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'] // Watch for href changes specifically
    });

    // Also use an interval as a fallback for scripts that might not trigger standard mutations compatible with our observer setup immediately
    const interval = setInterval(processLinks, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [suffix]);
}

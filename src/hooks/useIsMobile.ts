import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check initially
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Run initially
        checkMobile();

        // Add listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}

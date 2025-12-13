import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design using media queries
 * @param query - Media query string
 * @returns Boolean indicating if media query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const media = window.matchMedia(query);

        // Set initial value
        setMatches(media.matches);

        // Create event listener
        const listener = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        // Add listener
        media.addEventListener('change', listener);

        // Cleanup
        return () => {
            media.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}

/**
 * Pre-defined media query hooks for common breakpoints
 */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');

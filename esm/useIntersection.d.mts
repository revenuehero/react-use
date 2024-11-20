import { RefObject } from 'react';

declare const useIntersection: (ref: RefObject<HTMLElement>, options: IntersectionObserverInit) => IntersectionObserverEntry | null;

export { useIntersection as default };

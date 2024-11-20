import { RefObject } from 'react';

declare const useClickAway: <E extends Event = Event>(ref: RefObject<HTMLElement | null>, onClickAway: (event: E) => void, events?: string[]) => void;

export { useClickAway as default };

import { RefObject } from 'react';
import { State } from './useMouse.mjs';

interface UseMouseHoveredOptions {
    whenHovered?: boolean;
    bound?: boolean;
}
declare const useMouseHovered: (ref: RefObject<Element>, options?: UseMouseHoveredOptions) => State;

export { type UseMouseHoveredOptions, useMouseHovered as default };

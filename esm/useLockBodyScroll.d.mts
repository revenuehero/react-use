import { RefObject } from 'react';

declare function getClosestBody(el: Element | HTMLElement | HTMLIFrameElement | null): HTMLElement | null;
interface BodyInfoItem {
    counter: number;
    initialOverflow: CSSStyleDeclaration['overflow'];
}
declare const _default: (_locked?: boolean, _elementRef?: RefObject<HTMLElement> | undefined) => void;

export { type BodyInfoItem, _default as default, getClosestBody };

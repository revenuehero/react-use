import { RefObject } from 'react';

interface ContentRect {
    width: number;
    height: number;
    top: number;
    right: number;
    left: number;
    bottom: number;
}
declare const useMeasureDirty: (ref: RefObject<HTMLElement>) => ContentRect;

export { type ContentRect, useMeasureDirty as default };

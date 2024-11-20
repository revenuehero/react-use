import { RefObject } from 'react';

declare type CacheRef = {
    prevDiff: number;
    evCache: Array<PointerEvent>;
};
declare enum ZoomState {
    'ZOOMING_IN' = "ZOOMING_IN",
    'ZOOMING_OUT' = "ZOOMING_OUT"
}
declare type ZoomStateType = ZoomState.ZOOMING_IN | ZoomState.ZOOMING_OUT;
declare const usePinchZoom: (ref: RefObject<HTMLElement>) => {
    zoomingState: ZoomState;
    pinchState: number;
} | {
    zoomingState: null;
    pinchState: number;
};

export { type CacheRef, ZoomState, type ZoomStateType, usePinchZoom as default };

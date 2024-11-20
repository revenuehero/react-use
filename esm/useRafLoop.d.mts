declare type RafLoopReturns = [() => void, () => void, () => boolean];
declare function useRafLoop(callback: FrameRequestCallback, initiallyActive?: boolean): RafLoopReturns;

export { type RafLoopReturns, useRafLoop as default };

declare type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];
declare function useTimeoutFn(fn: Function, ms?: number): UseTimeoutFnReturn;

export { type UseTimeoutFnReturn, useTimeoutFn as default };

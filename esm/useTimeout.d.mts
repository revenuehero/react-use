declare type UseTimeoutReturn = [() => boolean | null, () => void, () => void];
declare function useTimeout(ms?: number): UseTimeoutReturn;

export { type UseTimeoutReturn, useTimeout as default };

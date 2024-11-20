import { DependencyList } from 'react';

declare type UseDebounceReturn = [() => boolean | null, () => void];
declare function useDebounce(fn: Function, ms?: number, deps?: DependencyList): UseDebounceReturn;

export { type UseDebounceReturn, useDebounce as default };

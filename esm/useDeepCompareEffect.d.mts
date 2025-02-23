import { EffectCallback, DependencyList } from 'react';

declare const useDeepCompareEffect: (effect: EffectCallback, deps: DependencyList) => void;

export { useDeepCompareEffect as default };

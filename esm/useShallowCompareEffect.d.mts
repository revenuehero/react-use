import { EffectCallback, DependencyList } from 'react';

declare const useShallowCompareEffect: (effect: EffectCallback, deps: DependencyList) => void;

export { useShallowCompareEffect as default };

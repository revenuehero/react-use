import { DependencyList } from 'react';
import { UseEventTarget, UseEventOptions } from './useEvent.mjs';

declare type KeyPredicate = (event: KeyboardEvent) => boolean;
declare type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);
declare type Handler = (event: KeyboardEvent) => void;
interface UseKeyOptions<T extends UseEventTarget> {
    event?: 'keydown' | 'keypress' | 'keyup';
    target?: T | null;
    options?: UseEventOptions<T>;
}
declare const useKey: <T extends UseEventTarget>(key: KeyFilter, fn?: Handler, opts?: UseKeyOptions<T>, deps?: DependencyList) => void;

export { type Handler, type KeyFilter, type KeyPredicate, type UseKeyOptions, useKey as default };

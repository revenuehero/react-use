declare type Predicate<T> = (prev: T | undefined, next: T) => boolean;
declare function usePreviousDistinct<T>(value: T, compare?: Predicate<T>): T | undefined;

export { type Predicate, usePreviousDistinct as default };

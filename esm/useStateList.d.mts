interface UseStateListReturn<T> {
    state: T;
    currentIndex: number;
    setStateAt: (newIndex: number) => void;
    setState: (state: T) => void;
    next: () => void;
    prev: () => void;
    isFirst: boolean;
    isLast: boolean;
}
declare function useStateList<T>(stateSet?: T[]): UseStateListReturn<T>;

export { type UseStateListReturn, useStateList as default };

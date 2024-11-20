interface QueueMethods<T> {
    add: (item: T) => void;
    remove: () => T;
    first: T;
    last: T;
    size: number;
}
declare const useQueue: <T>(initialValue?: T[]) => QueueMethods<T>;

export { type QueueMethods, useQueue as default };

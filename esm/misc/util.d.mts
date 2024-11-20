declare const noop: () => void;
declare function on<T extends Window | Document | HTMLElement | EventTarget>(obj: T | null, ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]): void;
declare function off<T extends Window | Document | HTMLElement | EventTarget>(obj: T | null, ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]): void;
declare const isBrowser: boolean;
declare const isNavigator: boolean;

export { isBrowser, isNavigator, noop, off, on };

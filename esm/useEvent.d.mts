interface ListenerType1 {
    addEventListener(name: string, handler: (event?: any) => void, ...args: any[]): any;
    removeEventListener(name: string, handler: (event?: any) => void, ...args: any[]): any;
}
interface ListenerType2 {
    on(name: string, handler: (event?: any) => void, ...args: any[]): any;
    off(name: string, handler: (event?: any) => void, ...args: any[]): any;
}
declare type UseEventTarget = ListenerType1 | ListenerType2;
declare type AddEventListener<T> = T extends ListenerType1 ? T['addEventListener'] : T extends ListenerType2 ? T['on'] : never;
declare type UseEventOptions<T> = Parameters<AddEventListener<T>>[2];
declare const useEvent: <T extends UseEventTarget>(name: Parameters<AddEventListener<T>>[0], handler?: Parameters<AddEventListener<T>>[1] | null | undefined, target?: Window | T | null, options?: UseEventOptions<T> | undefined) => void;

export { type ListenerType1, type ListenerType2, type UseEventOptions, type UseEventTarget, useEvent as default };

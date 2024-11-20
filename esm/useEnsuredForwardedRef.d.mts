import { MutableRefObject, RefForwardingComponent, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

declare function useEnsuredForwardedRef<T>(forwardedRef: MutableRefObject<T>): MutableRefObject<T>;
declare function ensuredForwardRef<T, P = {}>(Component: RefForwardingComponent<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

export { useEnsuredForwardedRef as default, ensuredForwardRef };

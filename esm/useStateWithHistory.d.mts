import { Dispatch } from 'react';
import { IHookStateSetAction, IHookStateInitAction } from './misc/hookState.mjs';

interface HistoryState<S> {
    history: S[];
    position: number;
    capacity: number;
    back: (amount?: number) => void;
    forward: (amount?: number) => void;
    go: (position: number) => void;
}
declare type UseStateHistoryReturn<S> = [S, Dispatch<IHookStateSetAction<S>>, HistoryState<S>];
declare function useStateWithHistory<S, I extends S>(initialState: IHookStateInitAction<S>, capacity?: number, initialHistory?: I[]): UseStateHistoryReturn<S>;
declare function useStateWithHistory<S = undefined>(): UseStateHistoryReturn<S | undefined>;

export { type UseStateHistoryReturn, useStateWithHistory };

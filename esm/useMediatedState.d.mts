import { Dispatch, SetStateAction } from 'react';

interface StateMediator<S = any> {
    (newState: any): S;
    (newState: any, dispatch: Dispatch<SetStateAction<S>>): void;
}
declare type UseMediatedStateReturn<S = any> = [S, Dispatch<SetStateAction<S>>];
declare function useMediatedState<S = undefined>(mediator: StateMediator<S | undefined>): UseMediatedStateReturn<S | undefined>;
declare function useMediatedState<S = any>(mediator: StateMediator<S>, initialState: S): UseMediatedStateReturn<S>;

export { type StateMediator, type UseMediatedStateReturn, useMediatedState };

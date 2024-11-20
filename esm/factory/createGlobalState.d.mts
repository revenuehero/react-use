import { IHookStateInitAction, IHookStateSetAction } from '../misc/hookState.mjs';

declare function createGlobalState<S = any>(initialState: IHookStateInitAction<S>): () => [S, (state: IHookStateSetAction<S>) => void];
declare function createGlobalState<S = undefined>(): () => [
    S,
    (state: IHookStateSetAction<S>) => void
];

export { createGlobalState, createGlobalState as default };

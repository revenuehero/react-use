import * as react from 'react';

declare const createReducerContext: <R extends react.Reducer<any, any>>(reducer: R, defaultInitialState: react.ReducerState<R>) => readonly [() => [react.ReducerState<R>, react.Dispatch<react.ReducerAction<R>>], ({ children, initialState, }: {
    children?: React.ReactNode;
    initialState?: react.ReducerState<R> | undefined;
}) => react.FunctionComponentElement<react.ProviderProps<[react.ReducerState<R>, react.Dispatch<react.ReducerAction<R>>] | undefined>>, react.Context<[react.ReducerState<R>, react.Dispatch<react.ReducerAction<R>>] | undefined>];

export { createReducerContext as default };

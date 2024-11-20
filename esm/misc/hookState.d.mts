declare type IHookStateInitialSetter<S> = () => S;
declare type IHookStateInitAction<S> = S | IHookStateInitialSetter<S>;
declare type IHookStateSetter<S> = ((prevState: S) => S) | (() => S);
declare type IHookStateSetAction<S> = S | IHookStateSetter<S>;
declare type IHookStateResolvable<S> = S | IHookStateInitialSetter<S> | IHookStateSetter<S>;
declare function resolveHookState<S>(nextState: IHookStateInitAction<S>): S;
declare function resolveHookState<S, C extends S>(nextState: IHookStateSetAction<S>, currentState?: C): S;
declare function resolveHookState<S, C extends S>(nextState: IHookStateResolvable<S>, currentState?: C): S;

export { type IHookStateInitAction, type IHookStateInitialSetter, type IHookStateResolvable, type IHookStateSetAction, type IHookStateSetter, resolveHookState };

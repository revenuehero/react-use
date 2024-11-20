import { Dispatch, SetStateAction } from 'react';

declare type ValidityState = [boolean | undefined, ...any[]] | [undefined];
interface StateValidator<V, S> {
    (state: S): V;
    (state: S, dispatch: Dispatch<SetStateAction<V>>): void;
}
declare type UseStateValidatorReturn<V> = [V, () => void];
declare function useStateValidator<V extends ValidityState, S>(state: S, validator: StateValidator<V, S>, initialState?: V): UseStateValidatorReturn<V>;

export { type StateValidator, type UseStateValidatorReturn, type ValidityState, useStateValidator as default };

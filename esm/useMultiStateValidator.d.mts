import { ValidityState, StateValidator, UseStateValidatorReturn } from './useStateValidator.mjs';
import 'react';

declare type MultiStateValidatorStates = any[] | {
    [p: string]: any;
} | {
    [p: number]: any;
};
declare type MultiStateValidator<V extends ValidityState, S extends MultiStateValidatorStates> = StateValidator<V, S>;
declare function useMultiStateValidator<V extends ValidityState, S extends MultiStateValidatorStates>(states: S, validator: MultiStateValidator<V, S>, initialValidity?: V): UseStateValidatorReturn<V>;

export { type MultiStateValidator, type MultiStateValidatorStates, useMultiStateValidator };

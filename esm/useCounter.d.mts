import { IHookStateSetAction, IHookStateInitAction } from './misc/hookState.mjs';

interface CounterActions {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    get: () => number;
    set: (value: IHookStateSetAction<number>) => void;
    reset: (value?: IHookStateSetAction<number>) => void;
}
declare function useCounter(initialValue?: IHookStateInitAction<number>, max?: number | null, min?: number | null): [number, CounterActions];

export { type CounterActions, useCounter as default };

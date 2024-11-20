import { Dispatch } from 'react';
import { IHookStateInitAction, IHookStateSetAction } from './misc/hookState.mjs';

declare function useGetSet<S>(initialState: IHookStateInitAction<S>): [get: () => S, set: Dispatch<IHookStateSetAction<S>>];

export { useGetSet as default };

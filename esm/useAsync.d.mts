import { AsyncState } from './useAsyncFn.mjs';
export { AsyncFnReturn } from './useAsyncFn.mjs';
import { FunctionReturningPromise, PromiseType } from './misc/types.mjs';
import { DependencyList } from 'react';

declare function useAsync<T extends FunctionReturningPromise>(fn: T, deps?: DependencyList): AsyncState<PromiseType<ReturnType<T>>>;

export { AsyncState, useAsync as default };

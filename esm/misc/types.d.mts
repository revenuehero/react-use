declare type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
declare type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export type { FunctionReturningPromise, PromiseType };

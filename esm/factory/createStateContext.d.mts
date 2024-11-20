import * as react from 'react';

declare const createStateContext: <T>(defaultInitialValue: T) => readonly [() => [T, react.Dispatch<react.SetStateAction<T>>], ({ children, initialValue, }: {
    children?: React.ReactNode;
    initialValue?: T | undefined;
}) => react.FunctionComponentElement<react.ProviderProps<[T, react.Dispatch<react.SetStateAction<T>>] | undefined>>, react.Context<[T, react.Dispatch<react.SetStateAction<T>>] | undefined>];

export { createStateContext as default };

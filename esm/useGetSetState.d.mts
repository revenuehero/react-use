declare const useGetSetState: <T extends object>(initialState?: T) => [() => T, (patch: Partial<T>) => void];

export { useGetSetState as default };

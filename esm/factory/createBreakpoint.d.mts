declare const createBreakpoint: (breakpoints?: {
    [name: string]: number;
}) => () => string;

export { createBreakpoint as default };

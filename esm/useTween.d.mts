declare type Easing = (t: number) => number;
declare const useTween: (easingName?: string, ms?: number, delay?: number) => number;

export { type Easing, useTween as default };

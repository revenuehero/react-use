import { RefObject } from 'react';

interface State {
    x: number;
    y: number;
}
declare const useScroll: (ref: RefObject<HTMLElement>) => State;

export { type State, useScroll as default };

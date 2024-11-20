import * as react from 'react';

declare type Element = ((state: State) => react.ReactElement<any>) | react.ReactElement<any>;
interface State {
    width: number;
    height: number;
}
declare const useSize: (element: Element, { width, height }?: Partial<State>) => [react.ReactElement<any>, State];

export { type Element, type State, useSize as default };

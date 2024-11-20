interface State {
    x: number;
    y: number;
}
declare const useWindowScroll: () => State;

export { type State, useWindowScroll as default };

import { RefObject } from 'react';

interface State {
    docX: number;
    docY: number;
    posX: number;
    posY: number;
    elX: number;
    elY: number;
    elH: number;
    elW: number;
}
declare const useMouse: (ref: RefObject<Element>) => State;

export { type State, useMouse as default };

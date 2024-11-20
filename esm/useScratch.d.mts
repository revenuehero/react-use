import { FC } from 'react';

interface ScratchSensorParams {
    disabled?: boolean;
    onScratch?: (state: ScratchSensorState) => void;
    onScratchStart?: (state: ScratchSensorState) => void;
    onScratchEnd?: (state: ScratchSensorState) => void;
}
interface ScratchSensorState {
    isScratching: boolean;
    start?: number;
    end?: number;
    x?: number;
    y?: number;
    dx?: number;
    dy?: number;
    docX?: number;
    docY?: number;
    posX?: number;
    posY?: number;
    elH?: number;
    elW?: number;
    elX?: number;
    elY?: number;
}
declare const useScratch: (params?: ScratchSensorParams) => [(el: HTMLElement | null) => void, ScratchSensorState];
interface ScratchSensorProps extends ScratchSensorParams {
    children: (state: ScratchSensorState, ref: (el: HTMLElement | null) => void) => React.ReactElement<any>;
}
declare const ScratchSensor: FC<ScratchSensorProps>;

export { ScratchSensor, type ScratchSensorParams, type ScratchSensorProps, type ScratchSensorState, useScratch as default };

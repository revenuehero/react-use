interface OrientationState {
    angle: number;
    type: string;
}
declare const useOrientation: (initialState?: OrientationState) => OrientationState;

export { type OrientationState, useOrientation as default };

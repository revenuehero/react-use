import * as react from 'react';

declare const useDefault: <TStateType>(defaultValue: TStateType, initialValue: TStateType | (() => TStateType)) => readonly [TStateType, react.Dispatch<react.SetStateAction<TStateType | null | undefined>>];

export { useDefault as default };

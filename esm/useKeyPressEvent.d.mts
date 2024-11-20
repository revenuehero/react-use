import { KeyFilter, Handler } from './useKey.mjs';
import 'react';
import './useEvent.mjs';

declare const useKeyPressEvent: (key: string | KeyFilter, keydown?: Handler | null | undefined, keyup?: Handler | null | undefined, useKeyPress?: (keyFilter: KeyFilter) => [boolean, KeyboardEvent | null]) => void;

export { useKeyPressEvent as default };

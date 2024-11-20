import { KeyFilter } from './useKey.mjs';
import 'react';
import './useEvent.mjs';

declare const useKeyPress: (keyFilter: KeyFilter) => [boolean, KeyboardEvent | null];

export { useKeyPress as default };

import * as react from 'react';

declare type Element = ((state: boolean) => react.ReactElement<any>) | react.ReactElement<any>;
declare const useHover: (element: Element) => [react.ReactElement<any>, boolean];

export { type Element, useHover as default };

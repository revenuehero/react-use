declare type UseMeasureRect = Pick<DOMRectReadOnly, 'x' | 'y' | 'top' | 'left' | 'right' | 'bottom' | 'height' | 'width'>;
declare type UseMeasureRef<E extends Element = Element> = (element: E) => void;
declare type UseMeasureResult<E extends Element = Element> = [UseMeasureRef<E>, UseMeasureRect];
declare function useMeasure<E extends Element = Element>(): UseMeasureResult<E>;
declare const _default: typeof useMeasure;

export { type UseMeasureRect, type UseMeasureRef, type UseMeasureResult, _default as default };

import { useFirstMountState } from "./chunk-5DLK7AVU.mjs";
// src/usePreviousDistinct.ts
import { useRef } from "react";
var strictEquals = function(prev, next) {
    return prev === next;
};
function usePreviousDistinct(value) {
    var compare = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : strictEquals;
    var prevRef = useRef();
    var curRef = useRef(value);
    var isFirstMount = useFirstMountState();
    if (!isFirstMount && !compare(curRef.current, value)) {
        prevRef.current = curRef.current;
        curRef.current = value;
    }
    return prevRef.current;
}
export { usePreviousDistinct };

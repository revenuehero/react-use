// src/useLatest.ts
import { useRef } from "react";
var useLatest = function(value) {
    var ref = useRef(value);
    ref.current = value;
    return ref;
};
var useLatest_default = useLatest;
export { useLatest_default };

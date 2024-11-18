import { useEffectOnce_default } from "./chunk-YQAKRCTF.mjs";
// src/useUnmount.ts
import { useRef } from "react";
var useUnmount = function(fn) {
    var fnRef = useRef(fn);
    fnRef.current = fn;
    useEffectOnce_default(function() {
        return function() {
            return fnRef.current();
        };
    });
};
var useUnmount_default = useUnmount;
export { useUnmount_default };

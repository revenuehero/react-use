// src/useCustomCompareEffect.ts
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
import { useEffect, useRef } from "react";
var isPrimitive = function(val) {
    return val !== Object(val);
};
var useCustomCompareEffect = function(effect, deps, depsEqual) {
    if (process.env.NODE_ENV !== "production") {
        if (!_instanceof(deps, Array) || !deps.length) {
            console.warn("`useCustomCompareEffect` should not be used with no dependencies. Use React.useEffect instead.");
        }
        if (deps.every(isPrimitive)) {
            console.warn("`useCustomCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.");
        }
        if (typeof depsEqual !== "function") {
            console.warn("`useCustomCompareEffect` should be used with depsEqual callback for comparing deps list");
        }
    }
    var ref = useRef(void 0);
    if (!ref.current || !depsEqual(deps, ref.current)) {
        ref.current = deps;
    }
    useEffect(effect, ref.current);
};
var useCustomCompareEffect_default = useCustomCompareEffect;
export { useCustomCompareEffect_default };

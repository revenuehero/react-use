function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
import { useCustomCompareEffect_default } from "./chunk-7KCVN543.mjs";
import { isDeepEqual_default } from "./chunk-QXZ6JOK7.mjs";
// src/useDeepCompareEffect.ts
var isPrimitive = function(val) {
    return val !== Object(val);
};
var useDeepCompareEffect = function(effect, deps) {
    if (process.env.NODE_ENV !== "production") {
        if (!_instanceof(deps, Array) || !deps.length) {
            console.warn("`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.");
        }
        if (deps.every(isPrimitive)) {
            console.warn("`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.");
        }
    }
    useCustomCompareEffect_default(effect, deps, isDeepEqual_default);
};
var useDeepCompareEffect_default = useDeepCompareEffect;
export { useDeepCompareEffect_default };

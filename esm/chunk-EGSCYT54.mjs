function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
import { useCustomCompareEffect_default } from "./chunk-7KCVN543.mjs";
// src/useShallowCompareEffect.ts
import { equal as isShallowEqual } from "fast-shallow-equal";
var isPrimitive = function(val) {
    return val !== Object(val);
};
var shallowEqualDepsList = function(prevDeps, nextDeps) {
    return prevDeps.every(function(dep, index) {
        return isShallowEqual(dep, nextDeps[index]);
    });
};
var useShallowCompareEffect = function(effect, deps) {
    if (process.env.NODE_ENV !== "production") {
        if (!_instanceof(deps, Array) || !deps.length) {
            console.warn("`useShallowCompareEffect` should not be used with no dependencies. Use React.useEffect instead.");
        }
        if (deps.every(isPrimitive)) {
            console.warn("`useShallowCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.");
        }
    }
    useCustomCompareEffect_default(effect, deps, shallowEqualDepsList);
};
var useShallowCompareEffect_default = useShallowCompareEffect;
export { useShallowCompareEffect_default };

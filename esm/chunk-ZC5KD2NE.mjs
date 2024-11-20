function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
import { isNavigator, noop } from "./chunk-CI6ZNB5H.mjs";
// src/useVibrate.ts
import { useEffect } from "react";
var isVibrationApiSupported = isNavigator && "vibrate" in navigator;
function useVibrate() {
    var enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, pattern = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [
        1e3,
        1e3
    ], loop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    useEffect(function() {
        var interval;
        if (enabled) {
            navigator.vibrate(pattern);
            if (loop) {
                var duration = _instanceof(pattern, Array) ? pattern.reduce(function(a, b) {
                    return a + b;
                }) : pattern;
                interval = setInterval(function() {
                    navigator.vibrate(pattern);
                }, duration);
            }
        }
        return function() {
            if (enabled) {
                navigator.vibrate(0);
                if (loop) {
                    clearInterval(interval);
                }
            }
        };
    }, [
        enabled
    ]);
}
var useVibrate_default = isVibrationApiSupported ? useVibrate : noop;
export { useVibrate_default };

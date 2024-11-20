// src/useHarmonicIntervalFn.ts
import { useEffect, useRef } from "react";
import { clearHarmonicInterval, setHarmonicInterval } from "set-harmonic-interval";
var useHarmonicIntervalFn = function(fn) {
    var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var latestCallback = useRef(function() {});
    useEffect(function() {
        latestCallback.current = fn;
    });
    useEffect(function() {
        if (delay !== null) {
            var interval = setHarmonicInterval(function() {
                return latestCallback.current();
            }, delay);
            return function() {
                return clearHarmonicInterval(interval);
            };
        }
        return void 0;
    }, [
        delay
    ]);
};
var useHarmonicIntervalFn_default = useHarmonicIntervalFn;
export { useHarmonicIntervalFn_default };

import { useMountedState } from "./chunk-GTDP4HJC.mjs";
// src/usePromise.ts
import { useCallback } from "react";
var usePromise = function() {
    var isMounted = useMountedState();
    return useCallback(function(promise) {
        return new Promise(function(resolve, reject) {
            var onValue = function(value) {
                isMounted() && resolve(value);
            };
            var onError = function(error) {
                isMounted() && reject(error);
            };
            promise.then(onValue, onError);
        });
    }, []);
};
var usePromise_default = usePromise;
export { usePromise_default };

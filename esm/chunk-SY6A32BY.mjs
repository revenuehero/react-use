import { useEffectOnce_default } from "./chunk-YQAKRCTF.mjs";
// src/useUnmountPromise.ts
import { useMemo, useRef } from "react";
var useUnmountPromise = function() {
    var refUnmounted = useRef(false);
    useEffectOnce_default(function() {
        return function() {
            refUnmounted.current = true;
        };
    });
    var wrapper = useMemo(function() {
        var race = function(promise, onError) {
            var newPromise = new Promise(function(resolve, reject) {
                promise.then(function(result) {
                    if (!refUnmounted.current) resolve(result);
                }, function(error) {
                    if (!refUnmounted.current) reject(error);
                    else if (onError) onError(error);
                    else console.error("useUnmountPromise", error);
                });
            });
            return newPromise;
        };
        return race;
    }, []);
    return wrapper;
};
var useUnmountPromise_default = useUnmountPromise;
export { useUnmountPromise_default };

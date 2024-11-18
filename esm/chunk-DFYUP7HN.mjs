// src/useInterval.ts
import { useEffect, useRef } from "react";
var useInterval = function(callback, delay) {
    var savedCallback = useRef(function() {});
    useEffect(function() {
        savedCallback.current = callback;
    });
    useEffect(function() {
        if (delay !== null) {
            var interval = setInterval(function() {
                return savedCallback.current();
            }, delay || 0);
            return function() {
                return clearInterval(interval);
            };
        }
        return void 0;
    }, [
        delay
    ]);
};
var useInterval_default = useInterval;
export { useInterval_default };

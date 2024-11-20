// src/useTimeoutFn.ts
import { useCallback, useEffect, useRef } from "react";
function useTimeoutFn(fn) {
    var ms = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var ready = useRef(false);
    var timeout = useRef();
    var callback = useRef(fn);
    var isReady = useCallback(function() {
        return ready.current;
    }, []);
    var set = useCallback(function() {
        ready.current = false;
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(function() {
            ready.current = true;
            callback.current();
        }, ms);
    }, [
        ms
    ]);
    var clear = useCallback(function() {
        ready.current = null;
        timeout.current && clearTimeout(timeout.current);
    }, []);
    useEffect(function() {
        callback.current = fn;
    }, [
        fn
    ]);
    useEffect(function() {
        set();
        return clear;
    }, [
        ms
    ]);
    return [
        isReady,
        clear,
        set
    ];
}
export { useTimeoutFn };

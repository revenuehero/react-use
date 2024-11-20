// src/useRafLoop.ts
import { useCallback, useEffect, useMemo, useRef } from "react";
function useRafLoop(callback) {
    var initiallyActive = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    var raf = useRef(null);
    var rafActivity = useRef(false);
    var rafCallback = useRef(callback);
    rafCallback.current = callback;
    var step = useCallback(function(time) {
        if (rafActivity.current) {
            rafCallback.current(time);
            raf.current = requestAnimationFrame(step);
        }
    }, []);
    var result = useMemo(function() {
        return [
            function() {
                if (rafActivity.current) {
                    rafActivity.current = false;
                    raf.current && cancelAnimationFrame(raf.current);
                }
            },
            function() {
                if (!rafActivity.current) {
                    rafActivity.current = true;
                    raf.current = requestAnimationFrame(step);
                }
            },
            function() {
                return rafActivity.current;
            }
        ];
    }, []);
    useEffect(function() {
        if (initiallyActive) {
            result[1]();
        }
        return result[0];
    }, []);
    return result;
}
export { useRafLoop };

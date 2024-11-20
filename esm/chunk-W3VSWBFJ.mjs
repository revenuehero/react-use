import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useLongPress.ts
import { useCallback, useRef } from "react";
var isTouchEvent = function(ev) {
    return "touches" in ev;
};
var preventDefault = function(ev) {
    if (!isTouchEvent(ev)) return;
    if (ev.touches.length < 2 && ev.preventDefault) {
        ev.preventDefault();
    }
};
var useLongPress = function(callback) {
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref_isPreventDefault = _ref.isPreventDefault, isPreventDefault = _ref_isPreventDefault === void 0 ? true : _ref_isPreventDefault, _ref_delay = _ref.delay, delay = _ref_delay === void 0 ? 300 : _ref_delay;
    var timeout = useRef();
    var target = useRef();
    var start = useCallback(function(event) {
        if (isPreventDefault && event.target) {
            on(event.target, "touchend", preventDefault, {
                passive: false
            });
            target.current = event.target;
        }
        timeout.current = setTimeout(function() {
            return callback(event);
        }, delay);
    }, [
        callback,
        delay,
        isPreventDefault
    ]);
    var clear = useCallback(function() {
        timeout.current && clearTimeout(timeout.current);
        if (isPreventDefault && target.current) {
            off(target.current, "touchend", preventDefault);
        }
    }, [
        isPreventDefault
    ]);
    return {
        onMouseDown: function(e) {
            return start(e);
        },
        onTouchStart: function(e) {
            return start(e);
        },
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchEnd: clear
    };
};
var useLongPress_default = useLongPress;
export { useLongPress_default };

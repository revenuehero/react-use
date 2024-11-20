function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { useMountedState } from "./chunk-GTDP4HJC.mjs";
import { useSetState_default } from "./chunk-FCCBIX3K.mjs";
import { isBrowser, noop, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useSlider.ts
import { useEffect, useRef } from "react";
var useSlider = function(ref) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var isMounted = useMountedState();
    var isSliding = useRef(false);
    var valueRef = useRef(0);
    var frame = useRef(0);
    var _useSetState_default = _sliced_to_array(useSetState_default({
        isSliding: false,
        value: 0
    }), 2), state = _useSetState_default[0], setState = _useSetState_default[1];
    valueRef.current = state.value;
    useEffect(function() {
        if (isBrowser) {
            var styles = options.styles === void 0 ? true : options.styles;
            var reverse = options.reverse === void 0 ? false : options.reverse;
            if (ref.current && styles) {
                ref.current.style.userSelect = "none";
            }
            var startScrubbing = function() {
                if (!isSliding.current && isMounted()) {
                    (options.onScrubStart || noop)();
                    isSliding.current = true;
                    setState({
                        isSliding: true
                    });
                    bindEvents();
                }
            };
            var stopScrubbing = function() {
                if (isSliding.current && isMounted()) {
                    (options.onScrubStop || noop)(valueRef.current);
                    isSliding.current = false;
                    setState({
                        isSliding: false
                    });
                    unbindEvents();
                }
            };
            var onMouseDown = function(event) {
                startScrubbing();
                onMouseMove(event);
            };
            var onMouseMove = options.vertical ? function(event) {
                return onScrub(event.clientY);
            } : function(event) {
                return onScrub(event.clientX);
            };
            var onTouchStart = function(event) {
                startScrubbing();
                onTouchMove(event);
            };
            var onTouchMove = options.vertical ? function(event) {
                return onScrub(event.changedTouches[0].clientY);
            } : function(event) {
                return onScrub(event.changedTouches[0].clientX);
            };
            var bindEvents = function() {
                on(document, "mousemove", onMouseMove);
                on(document, "mouseup", stopScrubbing);
                on(document, "touchmove", onTouchMove);
                on(document, "touchend", stopScrubbing);
            };
            var unbindEvents = function() {
                off(document, "mousemove", onMouseMove);
                off(document, "mouseup", stopScrubbing);
                off(document, "touchmove", onTouchMove);
                off(document, "touchend", stopScrubbing);
            };
            var onScrub = function(clientXY) {
                cancelAnimationFrame(frame.current);
                frame.current = requestAnimationFrame(function() {
                    if (isMounted() && ref.current) {
                        var rect = ref.current.getBoundingClientRect();
                        var pos = options.vertical ? rect.top : rect.left;
                        var length = options.vertical ? rect.height : rect.width;
                        if (!length) {
                            return;
                        }
                        var value = (clientXY - pos) / length;
                        if (value > 1) {
                            value = 1;
                        } else if (value < 0) {
                            value = 0;
                        }
                        if (reverse) {
                            value = 1 - value;
                        }
                        setState({
                            value: value
                        });
                        (options.onScrub || noop)(value);
                    }
                });
            };
            on(ref.current, "mousedown", onMouseDown);
            on(ref.current, "touchstart", onTouchStart);
            return function() {
                off(ref.current, "mousedown", onMouseDown);
                off(ref.current, "touchstart", onTouchStart);
            };
        } else {
            return void 0;
        }
    }, [
        ref,
        options.vertical
    ]);
    return state;
};
var useSlider_default = useSlider;
export { useSlider_default };

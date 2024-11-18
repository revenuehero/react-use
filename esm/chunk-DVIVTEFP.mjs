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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { useGetSet } from "./chunk-5LOV42O2.mjs";
import { resolveHookState } from "./chunk-MZIQQTER.mjs";
// src/useCounter.ts
import { useMemo } from "react";
function useCounter() {
    var initialValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, max = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, min = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var init = resolveHookState(initialValue);
    typeof init !== "number" && console.error("initialValue has to be a number, got " + (typeof initialValue === "undefined" ? "undefined" : _type_of(initialValue)));
    if (typeof min === "number") {
        init = Math.max(init, min);
    } else if (min !== null) {
        console.error("min has to be a number, got " + (typeof min === "undefined" ? "undefined" : _type_of(min)));
    }
    if (typeof max === "number") {
        init = Math.min(init, max);
    } else if (max !== null) {
        console.error("max has to be a number, got " + (typeof max === "undefined" ? "undefined" : _type_of(max)));
    }
    var _useGetSet = _sliced_to_array(useGetSet(init), 2), get = _useGetSet[0], setInternal = _useGetSet[1];
    return [
        get(),
        useMemo(function() {
            var set = function(newState) {
                var prevState = get();
                var rState = resolveHookState(newState, prevState);
                if (prevState !== rState) {
                    if (typeof min === "number") {
                        rState = Math.max(rState, min);
                    }
                    if (typeof max === "number") {
                        rState = Math.min(rState, max);
                    }
                    prevState !== rState && setInternal(rState);
                }
            };
            return {
                get: get,
                set: set,
                inc: function() {
                    var delta = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                    var rDelta = resolveHookState(delta, get());
                    if (typeof rDelta !== "number") {
                        console.error("delta has to be a number or function returning a number, got " + (typeof rDelta === "undefined" ? "undefined" : _type_of(rDelta)));
                    }
                    set(function(num) {
                        return num + rDelta;
                    });
                },
                dec: function() {
                    var delta = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                    var rDelta = resolveHookState(delta, get());
                    if (typeof rDelta !== "number") {
                        console.error("delta has to be a number or function returning a number, got " + (typeof rDelta === "undefined" ? "undefined" : _type_of(rDelta)));
                    }
                    set(function(num) {
                        return num - rDelta;
                    });
                },
                reset: function() {
                    var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : init;
                    var rValue = resolveHookState(value, get());
                    if (typeof rValue !== "number") {
                        console.error("value has to be a number or function returning a number, got " + (typeof rValue === "undefined" ? "undefined" : _type_of(rValue)));
                    }
                    init = rValue;
                    set(rValue);
                }
            };
        }, [
            init,
            min,
            max
        ])
    ];
}
export { useCounter };

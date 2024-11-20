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
import { useRafState_default } from "./chunk-BHNAEAZ2.mjs";
import { isBrowser, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useWindowScroll.ts
import { useEffect } from "react";
var useWindowScroll = function() {
    var _useRafState_default = _sliced_to_array(useRafState_default(function() {
        return {
            x: isBrowser ? window.pageXOffset : 0,
            y: isBrowser ? window.pageYOffset : 0
        };
    }), 2), state = _useRafState_default[0], setState = _useRafState_default[1];
    useEffect(function() {
        var handler = function() {
            setState(function(state2) {
                var pageXOffset = window.pageXOffset, pageYOffset = window.pageYOffset;
                return state2.x !== pageXOffset || state2.y !== pageYOffset ? {
                    x: pageXOffset,
                    y: pageYOffset
                } : state2;
            });
        };
        handler();
        on(window, "scroll", handler, {
            capture: false,
            passive: true
        });
        return function() {
            off(window, "scroll", handler);
        };
    }, []);
    return state;
};
var useWindowScroll_default = useWindowScroll;
export { useWindowScroll_default };

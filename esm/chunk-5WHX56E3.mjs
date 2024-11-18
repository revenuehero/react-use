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
import { isBrowser, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/factory/createBreakpoint.ts
import { useEffect, useMemo, useState } from "react";
var createBreakpoint = function() {
    var breakpoints = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        laptopL: 1440,
        laptop: 1024,
        tablet: 768
    };
    return function() {
        var _useState = _sliced_to_array(useState(isBrowser ? window.innerWidth : 0), 2), screen = _useState[0], setScreen = _useState[1];
        useEffect(function() {
            var setSideScreen = function() {
                setScreen(window.innerWidth);
            };
            setSideScreen();
            on(window, "resize", setSideScreen);
            return function() {
                off(window, "resize", setSideScreen);
            };
        });
        var sortedBreakpoints = useMemo(function() {
            return Object.entries(breakpoints).sort(function(a, b) {
                return a[1] >= b[1] ? 1 : -1;
            });
        }, [
            breakpoints
        ]);
        var result = sortedBreakpoints.reduce(function(acc, param) {
            var _param = _sliced_to_array(param, 2), name = _param[0], width = _param[1];
            if (screen >= width) {
                return name;
            } else {
                return acc;
            }
        }, sortedBreakpoints[0][0]);
        return result;
    };
};
var createBreakpoint_default = createBreakpoint;
export { createBreakpoint_default };

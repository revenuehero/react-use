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
import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useOrientation.ts
import { useEffect, useState } from "react";
var defaultState = {
    angle: 0,
    type: "landscape-primary"
};
var useOrientation = function() {
    var initialState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultState;
    var _useState = _sliced_to_array(useState(initialState), 2), state = _useState[0], setState = _useState[1];
    useEffect(function() {
        var screen = window.screen;
        var mounted = true;
        var onChange = function() {
            if (mounted) {
                var orientation = screen.orientation;
                if (orientation) {
                    var angle = orientation.angle, type = orientation.type;
                    setState({
                        angle: angle,
                        type: type
                    });
                } else if (window.orientation !== void 0) {
                    setState({
                        angle: typeof window.orientation === "number" ? window.orientation : 0,
                        type: ""
                    });
                } else {
                    setState(initialState);
                }
            }
        };
        on(window, "orientationchange", onChange);
        onChange();
        return function() {
            mounted = false;
            off(window, "orientationchange", onChange);
        };
    }, []);
    return state;
};
var useOrientation_default = useOrientation;
export { useOrientation_default };

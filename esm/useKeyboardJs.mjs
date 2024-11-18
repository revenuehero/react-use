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
import { useMount_default } from "./chunk-VRUZNDBW.mjs";
import "./chunk-YQAKRCTF.mjs";
import "./chunk-UJCSKKID.mjs";
// src/useKeyboardJs.ts
import { useEffect, useState } from "react";
var useKeyboardJs = function(combination) {
    var _useState = _sliced_to_array(useState([
        false,
        null
    ]), 2), state = _useState[0], set = _useState[1];
    var _useState1 = _sliced_to_array(useState(null), 2), keyboardJs = _useState1[0], setKeyboardJs = _useState1[1];
    useMount_default(function() {
        import("./keyboard-MAEHSC7D.mjs").then(function(k) {
            return setKeyboardJs(k.default || k);
        });
    });
    useEffect(function() {
        if (!keyboardJs) {
            return;
        }
        var down = function(event) {
            return set([
                true,
                event
            ]);
        };
        var up = function(event) {
            return set([
                false,
                event
            ]);
        };
        keyboardJs.bind(combination, down, up, true);
        return function() {
            keyboardJs.unbind(combination, down, up);
        };
    }, [
        combination,
        keyboardJs
    ]);
    return state;
};
var useKeyboardJs_default = useKeyboardJs;
export { useKeyboardJs_default as default };

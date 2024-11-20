function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { useUnmount_default } from "./chunk-ACTE3LJA.mjs";
// src/useThrottleFn.ts
import { useEffect, useRef, useState } from "react";
var useThrottleFn = function(fn) {
    var ms = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 200, args = arguments.length > 2 ? arguments[2] : void 0;
    var _useState = _sliced_to_array(useState(null), 2), state = _useState[0], setState = _useState[1];
    var timeout = useRef();
    var nextArgs = useRef();
    useEffect(function() {
        if (!timeout.current) {
            setState(fn.apply(void 0, _to_consumable_array(args)));
            var timeoutCallback = function() {
                if (nextArgs.current) {
                    setState(fn.apply(void 0, _to_consumable_array(nextArgs.current)));
                    nextArgs.current = void 0;
                    timeout.current = setTimeout(timeoutCallback, ms);
                } else {
                    timeout.current = void 0;
                }
            };
            timeout.current = setTimeout(timeoutCallback, ms);
        } else {
            nextArgs.current = args;
        }
    }, args);
    useUnmount_default(function() {
        timeout.current && clearTimeout(timeout.current);
    });
    return state;
};
var useThrottleFn_default = useThrottleFn;
export { useThrottleFn_default };

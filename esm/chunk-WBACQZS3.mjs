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
import { useIsomorphicLayoutEffect_default } from "./chunk-MSZM3MQ3.mjs";
import { isBrowser, noop } from "./chunk-CI6ZNB5H.mjs";
// src/useMeasure.ts
import { useMemo, useState } from "react";
var defaultState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
};
function useMeasure() {
    var _useState = _sliced_to_array(useState(null), 2), element = _useState[0], ref = _useState[1];
    var _useState1 = _sliced_to_array(useState(defaultState), 2), rect = _useState1[0], setRect = _useState1[1];
    var observer = useMemo(function() {
        return new window.ResizeObserver(function(entries) {
            if (entries[0]) {
                var _entries__contentRect = entries[0].contentRect, x = _entries__contentRect.x, y = _entries__contentRect.y, width = _entries__contentRect.width, height = _entries__contentRect.height, top = _entries__contentRect.top, left = _entries__contentRect.left, bottom = _entries__contentRect.bottom, right = _entries__contentRect.right;
                setRect({
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    top: top,
                    left: left,
                    bottom: bottom,
                    right: right
                });
            }
        });
    }, []);
    useIsomorphicLayoutEffect_default(function() {
        if (!element) return;
        observer.observe(element);
        return function() {
            observer.disconnect();
        };
    }, [
        element
    ]);
    return [
        ref,
        rect
    ];
}
var useMeasure_default = isBrowser && typeof window.ResizeObserver !== "undefined" ? useMeasure : function() {
    return [
        noop,
        defaultState
    ];
};
export { useMeasure_default };

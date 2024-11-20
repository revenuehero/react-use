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
import { isBrowser, noop } from "./chunk-CI6ZNB5H.mjs";
// src/useLocalStorage.ts
import { useCallback, useState, useRef, useLayoutEffect } from "react";
var useLocalStorage = function(key, initialValue, options) {
    if (!isBrowser) {
        return [
            initialValue,
            noop,
            noop
        ];
    }
    if (!key) {
        throw new Error("useLocalStorage key may not be falsy");
    }
    var deserializer = options ? options.raw ? function(value) {
        return value;
    } : options.deserializer : JSON.parse;
    var initializer = useRef(function(key2) {
        try {
            var serializer = options ? options.raw ? String : options.serializer : JSON.stringify;
            var localStorageValue = localStorage.getItem(key2);
            if (localStorageValue !== null) {
                return deserializer(localStorageValue);
            } else {
                initialValue && localStorage.setItem(key2, serializer(initialValue));
                return initialValue;
            }
        } catch (e) {
            return initialValue;
        }
    });
    var _useState = _sliced_to_array(useState(function() {
        return initializer.current(key);
    }), 2), state = _useState[0], setState = _useState[1];
    useLayoutEffect(function() {
        return setState(initializer.current(key));
    }, [
        key
    ]);
    var set = useCallback(function(valOrFunc) {
        try {
            var newState = typeof valOrFunc === "function" ? valOrFunc(state) : valOrFunc;
            if (typeof newState === "undefined") return;
            var value;
            if (options) if (options.raw) if (typeof newState === "string") value = newState;
            else value = JSON.stringify(newState);
            else if (options.serializer) value = options.serializer(newState);
            else value = JSON.stringify(newState);
            else value = JSON.stringify(newState);
            localStorage.setItem(key, value);
            setState(deserializer(value));
        } catch (e) {}
    }, [
        key,
        setState
    ]);
    var remove = useCallback(function() {
        try {
            localStorage.removeItem(key);
            setState(void 0);
        } catch (e) {}
    }, [
        key,
        setState
    ]);
    return [
        state,
        set,
        remove
    ];
};
var useLocalStorage_default = useLocalStorage;
export { useLocalStorage_default };

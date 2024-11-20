function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
import { useEffectOnce_default } from "./chunk-YQAKRCTF.mjs";
import { resolveHookState } from "./chunk-MZIQQTER.mjs";
import { useIsomorphicLayoutEffect_default } from "./chunk-MSZM3MQ3.mjs";
// src/factory/createGlobalState.ts
import { useState } from "react";
function createGlobalState(initialState) {
    var store = {
        state: _instanceof(initialState, Function) ? initialState() : initialState,
        setState: function setState(nextState) {
            store.state = resolveHookState(nextState, store.state);
            store.setters.forEach(function(setter) {
                return setter(store.state);
            });
        },
        setters: []
    };
    return function() {
        var _useState = _sliced_to_array(useState(store.state), 2), globalState = _useState[0], stateSetter = _useState[1];
        useEffectOnce_default(function() {
            return function() {
                store.setters = store.setters.filter(function(setter) {
                    return setter !== stateSetter;
                });
            };
        });
        useIsomorphicLayoutEffect_default(function() {
            if (!store.setters.includes(stateSetter)) {
                store.setters.push(stateSetter);
            }
        });
        return [
            globalState,
            store.setState
        ];
    };
}
var createGlobalState_default = createGlobalState;
export { createGlobalState, createGlobalState_default };

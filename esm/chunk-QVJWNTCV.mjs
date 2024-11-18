// src/useMethods.ts
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
import { useMemo, useReducer } from "react";
var useMethods = function(createMethods, initialState) {
    var reducer = useMemo(function() {
        return function(reducerState, action) {
            var _createMethods;
            return (_createMethods = createMethods(reducerState))[action.type].apply(_createMethods, _to_consumable_array(action.payload));
        };
    }, [
        createMethods
    ]);
    var _useReducer = _sliced_to_array(useReducer(reducer, initialState), 2), state = _useReducer[0], dispatch = _useReducer[1];
    var wrappedMethods = useMemo(function() {
        var actionTypes = Object.keys(createMethods(initialState));
        return actionTypes.reduce(function(acc, type) {
            acc[type] = function() {
                for(var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++){
                    payload[_key] = arguments[_key];
                }
                return dispatch({
                    type: type,
                    payload: payload
                });
            };
            return acc;
        }, {});
    }, [
        createMethods,
        initialState
    ]);
    return [
        state,
        wrappedMethods
    ];
};
var useMethods_default = useMethods;
export { useMethods_default };

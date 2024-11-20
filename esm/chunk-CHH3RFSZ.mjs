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
import { useFirstMountState } from "./chunk-5DLK7AVU.mjs";
import { resolveHookState } from "./chunk-MZIQQTER.mjs";
// src/useStateWithHistory.ts
import { useCallback, useMemo, useRef, useState } from "react";
function useStateWithHistory(initialState) {
    var capacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10, initialHistory = arguments.length > 2 ? arguments[2] : void 0;
    if (capacity < 1) {
        throw new Error("Capacity has to be greater than 1, got '".concat(capacity, "'"));
    }
    var isFirstMount = useFirstMountState();
    var _useState = _sliced_to_array(useState(initialState), 2), state = _useState[0], innerSetState = _useState[1];
    var history = useRef(initialHistory !== null && initialHistory !== void 0 ? initialHistory : []);
    var historyPosition = useRef(0);
    if (isFirstMount) {
        if (history.current.length) {
            if (history.current[history.current.length - 1] !== initialState) {
                history.current.push(initialState);
            }
            if (history.current.length > capacity) {
                history.current = history.current.slice(history.current.length - capacity);
            }
        } else {
            history.current.push(initialState);
        }
        historyPosition.current = history.current.length && history.current.length - 1;
    }
    var setState = useCallback(function(newState) {
        innerSetState(function(currentState) {
            newState = resolveHookState(newState, currentState);
            if (newState !== currentState) {
                if (historyPosition.current < history.current.length - 1) {
                    history.current = history.current.slice(0, historyPosition.current + 1);
                }
                historyPosition.current = history.current.push(newState) - 1;
                if (history.current.length > capacity) {
                    history.current = history.current.slice(history.current.length - capacity);
                }
            }
            return newState;
        });
    }, [
        state,
        capacity
    ]);
    var historyState = useMemo(function() {
        return {
            history: history.current,
            position: historyPosition.current,
            capacity: capacity,
            back: function() {
                var amount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                if (!historyPosition.current) {
                    return;
                }
                innerSetState(function() {
                    historyPosition.current -= Math.min(amount, historyPosition.current);
                    return history.current[historyPosition.current];
                });
            },
            forward: function() {
                var amount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                if (historyPosition.current === history.current.length - 1) {
                    return;
                }
                innerSetState(function() {
                    historyPosition.current = Math.min(historyPosition.current + amount, history.current.length - 1);
                    return history.current[historyPosition.current];
                });
            },
            go: function(position) {
                if (position === historyPosition.current) {
                    return;
                }
                innerSetState(function() {
                    historyPosition.current = position < 0 ? Math.max(history.current.length + position, 0) : Math.min(history.current.length - 1, position);
                    return history.current[historyPosition.current];
                });
            }
        };
    }, [
        state
    ]);
    return [
        state,
        setState,
        historyState
    ];
}
export { useStateWithHistory };

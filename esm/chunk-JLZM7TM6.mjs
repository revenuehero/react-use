function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
import { useUpdate } from "./chunk-7AAVMONY.mjs";
// src/useGetSetState.ts
import { useCallback, useRef } from "react";
var useGetSetState = function() {
    var initialState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (process.env.NODE_ENV !== "production") {
        if ((typeof initialState === "undefined" ? "undefined" : _type_of(initialState)) !== "object") {
            console.error("useGetSetState initial state must be an object.");
        }
    }
    var update = useUpdate();
    var state = useRef(_object_spread({}, initialState));
    var get = useCallback(function() {
        return state.current;
    }, []);
    var set = useCallback(function(patch) {
        if (!patch) {
            return;
        }
        if (process.env.NODE_ENV !== "production") {
            if ((typeof patch === "undefined" ? "undefined" : _type_of(patch)) !== "object") {
                console.error("useGetSetState setter patch must be an object.");
            }
        }
        Object.assign(state.current, patch);
        update();
    }, []);
    return [
        get,
        set
    ];
};
var useGetSetState_default = useGetSetState;
export { useGetSetState_default };

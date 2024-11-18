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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import { useMountedState } from "./chunk-GTDP4HJC.mjs";
import { useSetState_default } from "./chunk-FCCBIX3K.mjs";
// src/useCopyToClipboard.ts
import writeText from "copy-to-clipboard";
import { useCallback } from "react";
var useCopyToClipboard = function() {
    var isMounted = useMountedState();
    var _useSetState_default = _sliced_to_array(useSetState_default({
        value: void 0,
        error: void 0,
        noUserInteraction: true
    }), 2), state = _useSetState_default[0], setState = _useSetState_default[1];
    var copyToClipboard = useCallback(function(value) {
        if (!isMounted()) {
            return;
        }
        var noUserInteraction;
        var normalizedValue;
        try {
            if (typeof value !== "string" && typeof value !== "number") {
                var _$error = new Error("Cannot copy typeof ".concat(typeof value === "undefined" ? "undefined" : _type_of(value), " to clipboard, must be a string"));
                if (process.env.NODE_ENV === "development") console.error(_$error);
                setState({
                    value: value,
                    error: _$error,
                    noUserInteraction: true
                });
                return;
            } else if (value === "") {
                var _$error1 = new Error("Cannot copy empty string to clipboard.");
                if (process.env.NODE_ENV === "development") console.error(_$error1);
                setState({
                    value: value,
                    error: _$error1,
                    noUserInteraction: true
                });
                return;
            }
            normalizedValue = value.toString();
            noUserInteraction = writeText(normalizedValue);
            setState({
                value: normalizedValue,
                error: void 0,
                noUserInteraction: noUserInteraction
            });
        } catch (error) {
            setState({
                value: normalizedValue,
                error: error,
                noUserInteraction: noUserInteraction
            });
        }
    }, []);
    return [
        state,
        copyToClipboard
    ];
};
var useCopyToClipboard_default = useCopyToClipboard;
export { useCopyToClipboard_default };

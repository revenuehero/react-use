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
import { useRafState_default } from "./chunk-BHNAEAZ2.mjs";
import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useMouse.ts
import { useEffect } from "react";
var useMouse = function(ref) {
    if (process.env.NODE_ENV === "development") {
        if ((typeof ref === "undefined" ? "undefined" : _type_of(ref)) !== "object" || typeof ref.current === "undefined") {
            console.error("useMouse expects a single ref argument.");
        }
    }
    var _useRafState_default = _sliced_to_array(useRafState_default({
        docX: 0,
        docY: 0,
        posX: 0,
        posY: 0,
        elX: 0,
        elY: 0,
        elH: 0,
        elW: 0
    }), 2), state = _useRafState_default[0], setState = _useRafState_default[1];
    useEffect(function() {
        var moveHandler = function(event) {
            if (ref && ref.current) {
                var _ref_current_getBoundingClientRect = ref.current.getBoundingClientRect(), left = _ref_current_getBoundingClientRect.left, top = _ref_current_getBoundingClientRect.top, elW = _ref_current_getBoundingClientRect.width, elH = _ref_current_getBoundingClientRect.height;
                var posX = left + window.pageXOffset;
                var posY = top + window.pageYOffset;
                var elX = event.pageX - posX;
                var elY = event.pageY - posY;
                setState({
                    docX: event.pageX,
                    docY: event.pageY,
                    posX: posX,
                    posY: posY,
                    elX: elX,
                    elY: elY,
                    elH: elH,
                    elW: elW
                });
            }
        };
        on(document, "mousemove", moveHandler);
        return function() {
            off(document, "mousemove", moveHandler);
        };
    }, [
        ref
    ]);
    return state;
};
var useMouse_default = useMouse;
export { useMouse_default };

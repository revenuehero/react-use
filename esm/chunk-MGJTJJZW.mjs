// src/usePinchZoom.ts
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
import { useEffect, useMemo, useState } from "react";
var ZoomState = /* @__PURE__ */ function(ZoomState2) {
    ZoomState2["ZOOMING_IN"] = "ZOOMING_IN";
    ZoomState2["ZOOMING_OUT"] = "ZOOMING_OUT";
    return ZoomState2;
}(ZoomState || {});
var usePinchZoom = function(ref) {
    var cacheRef = useMemo(function() {
        return {
            evCache: [],
            prevDiff: -1
        };
    }, [
        ref.current
    ]);
    var _useState = _sliced_to_array(useState(), 2), zoomingState = _useState[0], setZoomingState = _useState[1];
    var pointermove_handler = function(ev) {
        for(var i = 0; i < cacheRef.evCache.length; i++){
            if (ev.pointerId == cacheRef.evCache[i].pointerId) {
                cacheRef.evCache[i] = ev;
                break;
            }
        }
        if (cacheRef.evCache.length == 2) {
            var curDiff = Math.abs(cacheRef.evCache[0].clientX - cacheRef.evCache[1].clientX);
            if (cacheRef.prevDiff > 0) {
                if (curDiff > cacheRef.prevDiff) {
                    setZoomingState([
                        "ZOOMING_IN" /* ZOOMING_IN */ ,
                        curDiff
                    ]);
                }
                if (curDiff < cacheRef.prevDiff) {
                    setZoomingState([
                        "ZOOMING_OUT" /* ZOOMING_OUT */ ,
                        curDiff
                    ]);
                }
            }
            cacheRef.prevDiff = curDiff;
        }
    };
    var pointerdown_handler = function(ev) {
        cacheRef.evCache.push(ev);
    };
    var pointerup_handler = function(ev) {
        remove_event(ev);
        if (cacheRef.evCache.length < 2) {
            cacheRef.prevDiff = -1;
        }
    };
    var remove_event = function(ev) {
        for(var i = 0; i < cacheRef.evCache.length; i++){
            if (cacheRef.evCache[i].pointerId == ev.pointerId) {
                cacheRef.evCache.splice(i, 1);
                break;
            }
        }
    };
    useEffect(function() {
        if (ref === null || ref === void 0 ? void 0 : ref.current) {
            ref.current.onpointerdown = pointerdown_handler;
            ref.current.onpointermove = pointermove_handler;
            ref.current.onpointerup = pointerup_handler;
            ref.current.onpointercancel = pointerup_handler;
            ref.current.onpointerout = pointerup_handler;
            ref.current.onpointerleave = pointerup_handler;
        }
    }, [
        ref === null || ref === void 0 ? void 0 : ref.current
    ]);
    return zoomingState ? {
        zoomingState: zoomingState[0],
        pinchState: zoomingState[1]
    } : {
        zoomingState: null,
        pinchState: 0
    };
};
var usePinchZoom_default = usePinchZoom;
export { ZoomState, usePinchZoom_default };

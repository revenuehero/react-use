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
import { noop, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useFullscreen.ts
import { useState } from "react";
import screenfull from "screenfull";
var useFullscreen = function(ref, enabled) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var video = options.video, _options_onClose = options.onClose, onClose = _options_onClose === void 0 ? noop : _options_onClose;
    var _useState = _sliced_to_array(useState(enabled), 2), isFullscreen = _useState[0], setIsFullscreen = _useState[1];
    useIsomorphicLayoutEffect_default(function() {
        if (!enabled) {
            return;
        }
        if (!ref.current) {
            return;
        }
        var onWebkitEndFullscreen = function() {
            if (video === null || video === void 0 ? void 0 : video.current) {
                off(video.current, "webkitendfullscreen", onWebkitEndFullscreen);
            }
            onClose();
        };
        var onChange = function() {
            if (screenfull.isEnabled) {
                var isScreenfullFullscreen = screenfull.isFullscreen;
                setIsFullscreen(isScreenfullFullscreen);
                if (!isScreenfullFullscreen) {
                    onClose();
                }
            }
        };
        if (screenfull.isEnabled) {
            try {
                screenfull.request(ref.current);
                setIsFullscreen(true);
            } catch (error) {
                onClose(error);
                setIsFullscreen(false);
            }
            screenfull.on("change", onChange);
        } else if (video && video.current && video.current.webkitEnterFullscreen) {
            video.current.webkitEnterFullscreen();
            on(video.current, "webkitendfullscreen", onWebkitEndFullscreen);
            setIsFullscreen(true);
        } else {
            onClose();
            setIsFullscreen(false);
        }
        return function() {
            setIsFullscreen(false);
            if (screenfull.isEnabled) {
                try {
                    screenfull.off("change", onChange);
                    screenfull.exit();
                } catch (e) {}
            } else if (video && video.current && video.current.webkitExitFullscreen) {
                off(video.current, "webkitendfullscreen", onWebkitEndFullscreen);
                video.current.webkitExitFullscreen();
            }
        };
    }, [
        enabled,
        video,
        ref
    ]);
    return isFullscreen;
};
var useFullscreen_default = useFullscreen;
export { useFullscreen_default };

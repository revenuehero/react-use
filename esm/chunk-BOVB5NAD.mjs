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
import { noop, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useDrop.ts
import { useCallback, useEffect, useMemo, useState } from "react";
var createProcess = function(options) {
    return function(dataTransfer, event) {
        var uri = dataTransfer.getData("text/uri-list");
        if (uri) {
            (options.onUri || noop)(uri, event);
            return;
        }
        if (dataTransfer.files && dataTransfer.files.length) {
            (options.onFiles || noop)(Array.from(dataTransfer.files), event);
            return;
        }
        if (event.clipboardData) {
            var text = event.clipboardData.getData("text");
            (options.onText || noop)(text, event);
            return;
        }
    };
};
var useDrop = function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var onFiles = options.onFiles, onText = options.onText, onUri = options.onUri;
    var _useState = _sliced_to_array(useState(false), 2), over = _useState[0], setOverRaw = _useState[1];
    var setOver = useCallback(setOverRaw, []);
    var process = useMemo(function() {
        return createProcess(options);
    }, [
        onFiles,
        onText,
        onUri
    ]);
    useEffect(function() {
        var onDragOver = function(event) {
            event.preventDefault();
            setOver(true);
        };
        var onDragEnter = function(event) {
            event.preventDefault();
            setOver(true);
        };
        var onDragLeave = function() {
            setOver(false);
        };
        var onDragExit = function() {
            setOver(false);
        };
        var onDrop = function(event) {
            event.preventDefault();
            setOver(false);
            process(event.dataTransfer, event);
        };
        var onPaste = function(event) {
            process(event.clipboardData, event);
        };
        on(document, "dragover", onDragOver);
        on(document, "dragenter", onDragEnter);
        on(document, "dragleave", onDragLeave);
        on(document, "dragexit", onDragExit);
        on(document, "drop", onDrop);
        if (onText) {
            on(document, "paste", onPaste);
        }
        return function() {
            off(document, "dragover", onDragOver);
            off(document, "dragenter", onDragEnter);
            off(document, "dragleave", onDragLeave);
            off(document, "dragexit", onDragExit);
            off(document, "drop", onDrop);
            off(document, "paste", onPaste);
        };
    }, [
        process
    ].concat(_to_consumable_array(args)));
    return {
        over: over
    };
};
var useDrop_default = useDrop;
export { useDrop_default };

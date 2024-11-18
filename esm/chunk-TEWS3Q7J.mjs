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
import { useMountedState } from "./chunk-GTDP4HJC.mjs";
import { noop } from "./chunk-CI6ZNB5H.mjs";
// src/useDropArea.ts
import { useMemo, useState } from "react";
var createProcess = function(options, mounted) {
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
        if (dataTransfer.items && dataTransfer.items.length) {
            dataTransfer.items[0].getAsString(function(text) {
                if (mounted) {
                    (options.onText || noop)(text, event);
                }
            });
        }
    };
};
var createBond = function(process, setOver) {
    return {
        onDragOver: function(event) {
            event.preventDefault();
        },
        onDragEnter: function(event) {
            event.preventDefault();
            setOver(true);
        },
        onDragLeave: function() {
            setOver(false);
        },
        onDrop: function(event) {
            event.preventDefault();
            event.persist();
            setOver(false);
            process(event.dataTransfer, event);
        },
        onPaste: function(event) {
            event.persist();
            process(event.clipboardData, event);
        }
    };
};
var useDropArea = function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var onFiles = options.onFiles, onText = options.onText, onUri = options.onUri;
    var isMounted = useMountedState();
    var _useState = _sliced_to_array(useState(false), 2), over = _useState[0], setOver = _useState[1];
    var process = useMemo(function() {
        return createProcess(options, isMounted());
    }, [
        onFiles,
        onText,
        onUri
    ]);
    var bond = useMemo(function() {
        return createBond(process, setOver);
    }, [
        process,
        setOver
    ]);
    return [
        bond,
        {
            over: over
        }
    ];
};
var useDropArea_default = useDropArea;
export { useDropArea_default };

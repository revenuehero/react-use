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
import { isBrowser, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useSize.tsx
import * as React from "react";
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
var DRAF = function(callback) {
    return setTimeout(callback, 35);
};
var useSize = function(element) {
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref_width = _ref.width, width = _ref_width === void 0 ? Infinity : _ref_width, _ref_height = _ref.height, height = _ref_height === void 0 ? Infinity : _ref_height;
    var _React;
    if (!isBrowser) {
        return [
            typeof element === "function" ? element({
                width: width,
                height: height
            }) : element,
            {
                width: width,
                height: height
            }
        ];
    }
    var _useState = _sliced_to_array(useState({
        width: width,
        height: height
    }), 2), state = _useState[0], setState = _useState[1];
    if (typeof element === "function") {
        element = element(state);
    }
    var style = element.props.style || {};
    var ref = useRef(null);
    var window = null;
    var setSize = function() {
        var iframe = ref.current;
        var size = iframe ? {
            width: iframe.offsetWidth,
            height: iframe.offsetHeight
        } : {
            width: width,
            height: height
        };
        setState(size);
    };
    var onWindow = function(windowToListenOn) {
        on(windowToListenOn, "resize", setSize);
        DRAF(setSize);
    };
    useEffect(function() {
        var iframe = ref.current;
        if (!iframe) {
            return;
        }
        if (iframe.contentWindow) {
            window = iframe.contentWindow;
            onWindow(window);
        } else {
            var onLoad = function() {
                on(iframe, "load", onLoad);
                window = iframe.contentWindow;
                onWindow(window);
            };
            off(iframe, "load", onLoad);
        }
        return function() {
            if (window && window.removeEventListener) {
                off(window, "resize", setSize);
            }
        };
    }, []);
    style.position = "relative";
    var sized = (_React = React).cloneElement.apply(_React, [
        element,
        {
            style: style
        }
    ].concat(_to_consumable_array([
        React.createElement("iframe", {
            ref: ref,
            style: {
                background: "transparent",
                border: "none",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: -1
            }
        })
    ].concat(_to_consumable_array(React.Children.toArray(element.props.children))))));
    return [
        sized,
        state
    ];
};
var useSize_default = useSize;
export { useSize_default };

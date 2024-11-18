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
import { isBrowser, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useLocation.ts
import { useEffect, useState } from "react";
var patchHistoryMethod = function(method) {
    var history = window.history;
    var original = history[method];
    history[method] = function patchHistoryMethod(state) {
        var result = original.apply(this, arguments);
        var event = new Event(method.toLowerCase());
        event.state = state;
        window.dispatchEvent(event);
        return result;
    };
};
if (isBrowser) {
    patchHistoryMethod("pushState");
    patchHistoryMethod("replaceState");
}
var useLocationServer = function() {
    return {
        trigger: "load",
        length: 1
    };
};
var buildState = function(trigger) {
    var _window_history = window.history, state = _window_history.state, length = _window_history.length;
    var _window_location = window.location, hash = _window_location.hash, host = _window_location.host, hostname = _window_location.hostname, href = _window_location.href, origin = _window_location.origin, pathname = _window_location.pathname, port = _window_location.port, protocol = _window_location.protocol, search = _window_location.search;
    return {
        trigger: trigger,
        state: state,
        length: length,
        hash: hash,
        host: host,
        hostname: hostname,
        href: href,
        origin: origin,
        pathname: pathname,
        port: port,
        protocol: protocol,
        search: search
    };
};
var useLocationBrowser = function() {
    var _useState = _sliced_to_array(useState(buildState("load")), 2), state = _useState[0], setState = _useState[1];
    useEffect(function() {
        var onPopstate = function() {
            return setState(buildState("popstate"));
        };
        var onPushstate = function() {
            return setState(buildState("pushstate"));
        };
        var onReplacestate = function() {
            return setState(buildState("replacestate"));
        };
        on(window, "popstate", onPopstate);
        on(window, "pushstate", onPushstate);
        on(window, "replacestate", onReplacestate);
        return function() {
            off(window, "popstate", onPopstate);
            off(window, "pushstate", onPushstate);
            off(window, "replacestate", onReplacestate);
        };
    }, []);
    return state;
};
var hasEventConstructor = typeof Event === "function";
var useLocation_default = isBrowser && hasEventConstructor ? useLocationBrowser : useLocationServer;
export { useLocation_default };

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
import { isNavigator, noop, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useMediaDevices.ts
import { useEffect, useState } from "react";
var useMediaDevices = function() {
    var _useState = _sliced_to_array(useState({}), 2), state = _useState[0], setState = _useState[1];
    useEffect(function() {
        var mounted = true;
        var onChange = function() {
            navigator.mediaDevices.enumerateDevices().then(function(devices) {
                if (mounted) {
                    setState({
                        devices: devices.map(function(param) {
                            var deviceId = param.deviceId, groupId = param.groupId, kind = param.kind, label = param.label;
                            return {
                                deviceId: deviceId,
                                groupId: groupId,
                                kind: kind,
                                label: label
                            };
                        })
                    });
                }
            }).catch(noop);
        };
        on(navigator.mediaDevices, "devicechange", onChange);
        onChange();
        return function() {
            mounted = false;
            off(navigator.mediaDevices, "devicechange", onChange);
        };
    }, []);
    return state;
};
var useMediaDevicesMock = function() {
    return {};
};
var useMediaDevices_default = isNavigator && !!navigator.mediaDevices ? useMediaDevices : useMediaDevicesMock;
export { useMediaDevices_default };

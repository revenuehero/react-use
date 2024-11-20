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
import { noop, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/usePermission.ts
import { useEffect, useState } from "react";
var usePermission = function(permissionDesc) {
    var _useState = _sliced_to_array(useState(""), 2), state = _useState[0], setState = _useState[1];
    useEffect(function() {
        var mounted = true;
        var permissionStatus = null;
        var onChange = function() {
            if (!mounted) {
                return;
            }
            setState(function() {
                var _permissionStatus_state;
                return (_permissionStatus_state = permissionStatus === null || permissionStatus === void 0 ? void 0 : permissionStatus.state) !== null && _permissionStatus_state !== void 0 ? _permissionStatus_state : "";
            });
        };
        navigator.permissions.query(permissionDesc).then(function(status) {
            permissionStatus = status;
            on(permissionStatus, "change", onChange);
            onChange();
        }).catch(noop);
        return function() {
            permissionStatus && off(permissionStatus, "change", onChange);
            mounted = false;
            permissionStatus = null;
        };
    }, [
        permissionDesc
    ]);
    return state;
};
var usePermission_default = usePermission;
export { usePermission_default };

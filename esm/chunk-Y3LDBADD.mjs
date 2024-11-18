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
import { isDeepEqual_default } from "./chunk-QXZ6JOK7.mjs";
import { isNavigator, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useBattery.ts
import { useEffect, useState } from "react";
var nav = isNavigator ? navigator : void 0;
var isBatteryApiSupported = nav && typeof nav.getBattery === "function";
function useBatteryMock() {
    return {
        isSupported: false
    };
}
function useBattery() {
    var _useState = _sliced_to_array(useState({
        isSupported: true,
        fetched: false
    }), 2), state = _useState[0], setState = _useState[1];
    useEffect(function() {
        var isMounted = true;
        var battery = null;
        var handleChange = function() {
            if (!isMounted || !battery) {
                return;
            }
            var newState = {
                isSupported: true,
                fetched: true,
                level: battery.level,
                charging: battery.charging,
                dischargingTime: battery.dischargingTime,
                chargingTime: battery.chargingTime
            };
            !isDeepEqual_default(state, newState) && setState(newState);
        };
        nav.getBattery().then(function(bat) {
            if (!isMounted) {
                return;
            }
            battery = bat;
            on(battery, "chargingchange", handleChange);
            on(battery, "chargingtimechange", handleChange);
            on(battery, "dischargingtimechange", handleChange);
            on(battery, "levelchange", handleChange);
            handleChange();
        });
        return function() {
            isMounted = false;
            if (battery) {
                off(battery, "chargingchange", handleChange);
                off(battery, "chargingtimechange", handleChange);
                off(battery, "dischargingtimechange", handleChange);
                off(battery, "levelchange", handleChange);
            }
        };
    }, []);
    return state;
}
var useBattery_default = isBatteryApiSupported ? useBattery : useBatteryMock;
export { useBattery_default };

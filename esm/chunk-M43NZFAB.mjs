function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
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
import { useLatest_default } from "./chunk-6JZ5ODIF.mjs";
import { noop, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useScratch.ts
import { cloneElement, useEffect, useRef, useState } from "react";
import { render } from "react-universal-interface";
var useScratch = function() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var disabled = params.disabled;
    var paramsRef = useLatest_default(params);
    var _useState = _sliced_to_array(useState({
        isScratching: false
    }), 2), state = _useState[0], setState = _useState[1];
    var refState = useRef(state);
    var refScratching = useRef(false);
    var refAnimationFrame = useRef(null);
    var _useState1 = _sliced_to_array(useState(null), 2), el = _useState1[0], setEl = _useState1[1];
    useEffect(function() {
        if (disabled) return;
        if (!el) return;
        var onMoveEvent = function(docX, docY) {
            cancelAnimationFrame(refAnimationFrame.current);
            refAnimationFrame.current = requestAnimationFrame(function() {
                var _el_getBoundingClientRect = el.getBoundingClientRect(), left = _el_getBoundingClientRect.left, top = _el_getBoundingClientRect.top;
                var elX = left + window.scrollX;
                var elY = top + window.scrollY;
                var x = docX - elX;
                var y = docY - elY;
                setState(function(oldState) {
                    var newState = _object_spread_props(_object_spread({}, oldState), {
                        dx: x - (oldState.x || 0),
                        dy: y - (oldState.y || 0),
                        end: Date.now(),
                        isScratching: true
                    });
                    refState.current = newState;
                    (paramsRef.current.onScratch || noop)(newState);
                    return newState;
                });
            });
        };
        var onMouseMove = function(event) {
            onMoveEvent(event.pageX, event.pageY);
        };
        var onTouchMove = function(event) {
            onMoveEvent(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
        };
        var onMouseUp;
        var onTouchEnd;
        var stopScratching = function() {
            if (!refScratching.current) return;
            refScratching.current = false;
            refState.current = _object_spread_props(_object_spread({}, refState.current), {
                isScratching: false
            });
            (paramsRef.current.onScratchEnd || noop)(refState.current);
            setState({
                isScratching: false
            });
            off(window, "mousemove", onMouseMove);
            off(window, "touchmove", onTouchMove);
            off(window, "mouseup", onMouseUp);
            off(window, "touchend", onTouchEnd);
        };
        onMouseUp = stopScratching;
        onTouchEnd = stopScratching;
        var startScratching = function(docX, docY) {
            if (!refScratching.current) return;
            var _el_getBoundingClientRect = el.getBoundingClientRect(), left = _el_getBoundingClientRect.left, top = _el_getBoundingClientRect.top;
            var elX = left + window.scrollX;
            var elY = top + window.scrollY;
            var x = docX - elX;
            var y = docY - elY;
            var time = Date.now();
            var newState = {
                isScratching: true,
                start: time,
                end: time,
                docX: docX,
                docY: docY,
                x: x,
                y: y,
                dx: 0,
                dy: 0,
                elH: el.offsetHeight,
                elW: el.offsetWidth,
                elX: elX,
                elY: elY
            };
            refState.current = newState;
            (paramsRef.current.onScratchStart || noop)(newState);
            setState(newState);
            on(window, "mousemove", onMouseMove);
            on(window, "touchmove", onTouchMove);
            on(window, "mouseup", onMouseUp);
            on(window, "touchend", onTouchEnd);
        };
        var onMouseDown = function(event) {
            refScratching.current = true;
            startScratching(event.pageX, event.pageY);
        };
        var onTouchStart = function(event) {
            refScratching.current = true;
            startScratching(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
        };
        on(el, "mousedown", onMouseDown);
        on(el, "touchstart", onTouchStart);
        return function() {
            off(el, "mousedown", onMouseDown);
            off(el, "touchstart", onTouchStart);
            off(window, "mousemove", onMouseMove);
            off(window, "touchmove", onTouchMove);
            off(window, "mouseup", onMouseUp);
            off(window, "touchend", onTouchEnd);
            if (refAnimationFrame.current) cancelAnimationFrame(refAnimationFrame.current);
            refAnimationFrame.current = null;
            refScratching.current = false;
            refState.current = {
                isScratching: false
            };
            setState(refState.current);
        };
    }, [
        el,
        disabled,
        paramsRef
    ]);
    return [
        setEl,
        state
    ];
};
var ScratchSensor = function(props) {
    var children = props.children, params = _object_without_properties(props, [
        "children"
    ]);
    var _useScratch = _sliced_to_array(useScratch(params), 2), ref = _useScratch[0], state = _useScratch[1];
    var element = render(props, state);
    return cloneElement(element, _object_spread_props(_object_spread({}, element.props), {
        ref: function(el) {
            if (element.props.ref) {
                if (_type_of(element.props.ref) === "object") element.props.ref.current = el;
                if (typeof element.props.ref === "function") element.props.ref(el);
            }
            ref(el);
        }
    }));
};
var useScratch_default = useScratch;
export { ScratchSensor, useScratch_default };

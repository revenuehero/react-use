// src/useSpeech.ts
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
import { useCallback, useEffect, useRef, useState } from "react";
var Status = /* @__PURE__ */ function(Status2) {
    Status2[Status2["init"] = 0] = "init";
    Status2[Status2["play"] = 1] = "play";
    Status2[Status2["pause"] = 2] = "pause";
    Status2[Status2["end"] = 3] = "end";
    return Status2;
}(Status || {});
var useSpeech = function(text, options) {
    var mounted = useRef(false);
    var _useState = _sliced_to_array(useState(function() {
        var _ref = options.voice || {}, _ref_lang = _ref.lang, lang = _ref_lang === void 0 ? "default" : _ref_lang, _ref_name = _ref.name, name = _ref_name === void 0 ? "" : _ref_name;
        return {
            isPlaying: false,
            status: Status[0 /* init */ ],
            lang: options.lang || "default",
            voiceInfo: {
                lang: lang,
                name: name
            },
            rate: options.rate || 1,
            pitch: options.pitch || 1,
            volume: options.volume || 1
        };
    }), 2), state = _useState[0], setState = _useState[1];
    var handlePlay = useCallback(function() {
        if (!mounted.current) {
            return;
        }
        setState(function(preState) {
            return _object_spread_props(_object_spread({}, preState), {
                isPlaying: true,
                status: Status[1 /* play */ ]
            });
        });
    }, []);
    var handlePause = useCallback(function() {
        if (!mounted.current) {
            return;
        }
        setState(function(preState) {
            return _object_spread_props(_object_spread({}, preState), {
                isPlaying: false,
                status: Status[2 /* pause */ ]
            });
        });
    }, []);
    var handleEnd = useCallback(function() {
        if (!mounted.current) {
            return;
        }
        setState(function(preState) {
            return _object_spread_props(_object_spread({}, preState), {
                isPlaying: false,
                status: Status[3 /* end */ ]
            });
        });
    }, []);
    useEffect(function() {
        mounted.current = true;
        var utterance = new SpeechSynthesisUtterance(text);
        options.lang && (utterance.lang = options.lang);
        options.voice && (utterance.voice = options.voice);
        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;
        utterance.onstart = handlePlay;
        utterance.onpause = handlePause;
        utterance.onresume = handlePlay;
        utterance.onend = handleEnd;
        window.speechSynthesis.speak(utterance);
        return function() {
            mounted.current = false;
        };
    }, []);
    return state;
};
var useSpeech_default = useSpeech;
export { useSpeech_default };

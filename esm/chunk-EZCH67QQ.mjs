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
import { parseTimeRanges } from "./chunk-THMOQYYJ.mjs";
import { useSetState_default } from "./chunk-FCCBIX3K.mjs";
// src/factory/createHTMLMediaHook.ts
import * as React from "react";
import { useEffect, useRef } from "react";
function createHTMLMediaHook(tag) {
    return function(elOrProps) {
        var element;
        var props;
        if (React.isValidElement(elOrProps)) {
            element = elOrProps;
            props = element.props;
        } else {
            props = elOrProps;
        }
        var _useSetState_default = _sliced_to_array(useSetState_default({
            buffered: [],
            time: 0,
            duration: 0,
            paused: true,
            muted: false,
            volume: 1,
            playing: false
        }), 2), state = _useSetState_default[0], setState = _useSetState_default[1];
        var ref = useRef(null);
        var wrapEvent = function(userEvent, proxyEvent) {
            return function(event) {
                try {
                    proxyEvent && proxyEvent(event);
                } finally{
                    userEvent && userEvent(event);
                }
            };
        };
        var onPlay = function() {
            return setState({
                paused: false
            });
        };
        var onPlaying = function() {
            return setState({
                playing: true
            });
        };
        var onWaiting = function() {
            return setState({
                playing: false
            });
        };
        var onPause = function() {
            return setState({
                paused: true,
                playing: false
            });
        };
        var onVolumeChange = function() {
            var el = ref.current;
            if (!el) {
                return;
            }
            setState({
                muted: el.muted,
                volume: el.volume
            });
        };
        var onDurationChange = function() {
            var el = ref.current;
            if (!el) {
                return;
            }
            var duration = el.duration, buffered = el.buffered;
            setState({
                duration: duration,
                buffered: parseTimeRanges(buffered)
            });
        };
        var onTimeUpdate = function() {
            var el = ref.current;
            if (!el) {
                return;
            }
            setState({
                time: el.currentTime
            });
        };
        var onProgress = function() {
            var el = ref.current;
            if (!el) {
                return;
            }
            setState({
                buffered: parseTimeRanges(el.buffered)
            });
        };
        if (element) {
            element = React.cloneElement(element, _object_spread_props(_object_spread({
                controls: false
            }, props), {
                ref: ref,
                onPlay: wrapEvent(props.onPlay, onPlay),
                onPlaying: wrapEvent(props.onPlaying, onPlaying),
                onWaiting: wrapEvent(props.onWaiting, onWaiting),
                onPause: wrapEvent(props.onPause, onPause),
                onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
                onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
                onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
                onProgress: wrapEvent(props.onProgress, onProgress)
            }));
        } else {
            element = React.createElement(tag, _object_spread_props(_object_spread({
                controls: false
            }, props), {
                ref: ref,
                onPlay: wrapEvent(props.onPlay, onPlay),
                onPlaying: wrapEvent(props.onPlaying, onPlaying),
                onWaiting: wrapEvent(props.onWaiting, onWaiting),
                onPause: wrapEvent(props.onPause, onPause),
                onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
                onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
                onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
                onProgress: wrapEvent(props.onProgress, onProgress)
            }));
        }
        var lockPlay = false;
        var controls = {
            play: function() {
                var el = ref.current;
                if (!el) {
                    return void 0;
                }
                if (!lockPlay) {
                    var promise = el.play();
                    var isPromise = (typeof promise === "undefined" ? "undefined" : _type_of(promise)) === "object";
                    if (isPromise) {
                        lockPlay = true;
                        var resetLock = function() {
                            lockPlay = false;
                        };
                        promise.then(resetLock, resetLock);
                    }
                    return promise;
                }
                return void 0;
            },
            pause: function() {
                var el = ref.current;
                if (el && !lockPlay) {
                    return el.pause();
                }
            },
            seek: function(time) {
                var el = ref.current;
                if (!el || state.duration === void 0) {
                    return;
                }
                time = Math.min(state.duration, Math.max(0, time));
                el.currentTime = time;
            },
            volume: function(volume) {
                var el = ref.current;
                if (!el) {
                    return;
                }
                volume = Math.min(1, Math.max(0, volume));
                el.volume = volume;
                setState({
                    volume: volume
                });
            },
            mute: function() {
                var el = ref.current;
                if (!el) {
                    return;
                }
                el.muted = true;
            },
            unmute: function() {
                var el = ref.current;
                if (!el) {
                    return;
                }
                el.muted = false;
            }
        };
        useEffect(function() {
            var el = ref.current;
            if (!el) {
                if (process.env.NODE_ENV !== "production") {
                    if (tag === "audio") {
                        console.error("useAudio() ref to <audio> element is empty at mount. It seem you have not rendered the audio element, which it returns as the first argument const [audio] = useAudio(...).");
                    } else if (tag === "video") {
                        console.error("useVideo() ref to <video> element is empty at mount. It seem you have not rendered the video element, which it returns as the first argument const [video] = useVideo(...).");
                    }
                }
                return;
            }
            setState({
                volume: el.volume,
                muted: el.muted,
                paused: el.paused
            });
            if (props.autoPlay && el.paused) {
                controls.play();
            }
        }, [
            props.src
        ]);
        return [
            element,
            state,
            controls,
            ref
        ];
    };
}
export { createHTMLMediaHook };

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
import { __commonJS, __toESM } from "./chunk-UJCSKKID.mjs";
// node_modules/rebound/dist/rebound.js
var require_rebound = __commonJS({
    "node_modules/rebound/dist/rebound.js": function(exports, module) {
        "use strict";
        (function(global, factory) {
            (typeof exports === "undefined" ? "undefined" : _type_of(exports)) === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.rebound = factory();
        })(exports, function() {
            "use strict";
            var _onFrame = void 0;
            if (typeof window !== "undefined") {
                _onFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
            }
            if (!_onFrame && typeof process !== "undefined" && process.title === "node") {
                _onFrame = setImmediate;
            }
            _onFrame = _onFrame || function(callback) {
                window.setTimeout(callback, 1e3 / 60);
            };
            var _onFrame$1 = _onFrame;
            var concat = Array.prototype.concat;
            var slice = Array.prototype.slice;
            function bind(func, context) {
                for(var _len = arguments.length, outerArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
                    outerArgs[_key - 2] = arguments[_key];
                }
                return function() {
                    for(var _len2 = arguments.length, innerArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
                        innerArgs[_key2] = arguments[_key2];
                    }
                    func.apply(context, concat.call(outerArgs, slice.call(innerArgs)));
                };
            }
            function extend(target, source) {
                for(var key in source){
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            }
            function onFrame(func) {
                return _onFrame$1(func);
            }
            function removeFirst(array, item) {
                var idx = array.indexOf(item);
                idx !== -1 && array.splice(idx, 1);
            }
            var colorCache = {};
            function hexToRGB(colorString) {
                if (colorCache[colorString]) {
                    return colorCache[colorString];
                }
                var normalizedColor = colorString.replace("#", "");
                if (normalizedColor.length === 3) {
                    normalizedColor = normalizedColor[0] + normalizedColor[0] + normalizedColor[1] + normalizedColor[1] + normalizedColor[2] + normalizedColor[2];
                }
                var parts = normalizedColor.match(/.{2}/g);
                if (!parts || parts.length < 3) {
                    throw new Error("Expected a color string of format #rrggbb");
                }
                var ret = {
                    r: parseInt(parts[0], 16),
                    g: parseInt(parts[1], 16),
                    b: parseInt(parts[2], 16)
                };
                colorCache[colorString] = ret;
                return ret;
            }
            function rgbToHex(rNum, gNum, bNum) {
                var r = rNum.toString(16);
                var g = gNum.toString(16);
                var b = bNum.toString(16);
                r = r.length < 2 ? "0" + r : r;
                g = g.length < 2 ? "0" + g : g;
                b = b.length < 2 ? "0" + b : b;
                return "#" + r + g + b;
            }
            var util = Object.freeze({
                bind: bind,
                extend: extend,
                onFrame: onFrame,
                removeFirst: removeFirst,
                hexToRGB: hexToRGB,
                rgbToHex: rgbToHex
            });
            function mapValueInRange(value, fromLow, fromHigh, toLow, toHigh) {
                var fromRangeSize = fromHigh - fromLow;
                var toRangeSize = toHigh - toLow;
                var valueScale = (value - fromLow) / fromRangeSize;
                return toLow + valueScale * toRangeSize;
            }
            function interpolateColor(val, startColorStr, endColorStr) {
                var fromLow = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                var fromHigh = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
                var asRGB = arguments[5];
                var startColor = hexToRGB(startColorStr);
                var endColor = hexToRGB(endColorStr);
                var r = Math.floor(mapValueInRange(val, fromLow, fromHigh, startColor.r, endColor.r));
                var g = Math.floor(mapValueInRange(val, fromLow, fromHigh, startColor.g, endColor.g));
                var b = Math.floor(mapValueInRange(val, fromLow, fromHigh, startColor.b, endColor.b));
                if (asRGB) {
                    return "rgb(" + r + "," + g + "," + b + ")";
                } else {
                    return rgbToHex(r, g, b);
                }
            }
            function degreesToRadians(deg) {
                return deg * Math.PI / 180;
            }
            function radiansToDegrees(rad) {
                return rad * 180 / Math.PI;
            }
            var MathUtil = Object.freeze({
                mapValueInRange: mapValueInRange,
                interpolateColor: interpolateColor,
                degreesToRadians: degreesToRadians,
                radiansToDegrees: radiansToDegrees
            });
            function tensionFromOrigamiValue(oValue) {
                return (oValue - 30) * 3.62 + 194;
            }
            function origamiValueFromTension(tension) {
                return (tension - 194) / 3.62 + 30;
            }
            function frictionFromOrigamiValue(oValue) {
                return (oValue - 8) * 3 + 25;
            }
            function origamiFromFriction(friction) {
                return (friction - 25) / 3 + 8;
            }
            var OrigamiValueConverter = Object.freeze({
                tensionFromOrigamiValue: tensionFromOrigamiValue,
                origamiValueFromTension: origamiValueFromTension,
                frictionFromOrigamiValue: frictionFromOrigamiValue,
                origamiFromFriction: origamiFromFriction
            });
            var classCallCheck = function classCallCheck(instance, Constructor) {
                if (!_instanceof(instance, Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            };
            var _extends = Object.assign || function(target) {
                for(var i = 1; i < arguments.length; i++){
                    var source = arguments[i];
                    for(var key in source){
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
                return target;
            };
            var AnimationLooper = function() {
                function AnimationLooper2() {
                    classCallCheck(this, AnimationLooper2);
                    this.springSystem = null;
                }
                AnimationLooper2.prototype.run = function run() {
                    var springSystem = getSpringSystem.call(this);
                    onFrame(function() {
                        springSystem.loop(Date.now());
                    });
                };
                return AnimationLooper2;
            }();
            var SimulationLooper = function() {
                function SimulationLooper2(timestep) {
                    classCallCheck(this, SimulationLooper2);
                    this.springSystem = null;
                    this.time = 0;
                    this.running = false;
                    this.timestep = timestep || 16.667;
                }
                SimulationLooper2.prototype.run = function run() {
                    var springSystem = getSpringSystem.call(this);
                    if (this.running) {
                        return;
                    }
                    this.running = true;
                    while(!springSystem.getIsIdle()){
                        springSystem.loop(this.time += this.timestep);
                    }
                    this.running = false;
                };
                return SimulationLooper2;
            }();
            var SteppingSimulationLooper = function() {
                function SteppingSimulationLooper2() {
                    classCallCheck(this, SteppingSimulationLooper2);
                    this.springSystem = null;
                    this.time = 0;
                    this.running = false;
                }
                SteppingSimulationLooper2.prototype.run = function run() {};
                SteppingSimulationLooper2.prototype.step = function step(timestep) {
                    var springSystem = getSpringSystem.call(this);
                    springSystem.loop(this.time += timestep);
                };
                return SteppingSimulationLooper2;
            }();
            function getSpringSystem() {
                if (this.springSystem == null) {
                    throw new Error("cannot run looper without a springSystem");
                }
                return this.springSystem;
            }
            var Loopers = Object.freeze({
                AnimationLooper: AnimationLooper,
                SimulationLooper: SimulationLooper,
                SteppingSimulationLooper: SteppingSimulationLooper
            });
            var BouncyConversion = function() {
                function BouncyConversion2(bounciness, speed) {
                    classCallCheck(this, BouncyConversion2);
                    this.bounciness = bounciness;
                    this.speed = speed;
                    var b = this.normalize(bounciness / 1.7, 0, 20);
                    b = this.projectNormal(b, 0, 0.8);
                    var s = this.normalize(speed / 1.7, 0, 20);
                    this.bouncyTension = this.projectNormal(s, 0.5, 200);
                    this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01);
                }
                BouncyConversion2.prototype.normalize = function normalize(value, startValue, endValue) {
                    return (value - startValue) / (endValue - startValue);
                };
                BouncyConversion2.prototype.projectNormal = function projectNormal(n, start, end) {
                    return start + n * (end - start);
                };
                BouncyConversion2.prototype.linearInterpolation = function linearInterpolation(t, start, end) {
                    return t * end + (1 - t) * start;
                };
                BouncyConversion2.prototype.quadraticOutInterpolation = function quadraticOutInterpolation(t, start, end) {
                    return this.linearInterpolation(2 * t - t * t, start, end);
                };
                BouncyConversion2.prototype.b3Friction1 = function b3Friction1(x) {
                    return 7e-4 * Math.pow(x, 3) - 0.031 * Math.pow(x, 2) + 0.64 * x + 1.28;
                };
                BouncyConversion2.prototype.b3Friction2 = function b3Friction2(x) {
                    return 44e-6 * Math.pow(x, 3) - 6e-3 * Math.pow(x, 2) + 0.36 * x + 2;
                };
                BouncyConversion2.prototype.b3Friction3 = function b3Friction3(x) {
                    return 45e-8 * Math.pow(x, 3) - 332e-6 * Math.pow(x, 2) + 0.1078 * x + 5.84;
                };
                BouncyConversion2.prototype.b3Nobounce = function b3Nobounce(tension) {
                    var friction = 0;
                    if (tension <= 18) {
                        friction = this.b3Friction1(tension);
                    } else if (tension > 18 && tension <= 44) {
                        friction = this.b3Friction2(tension);
                    } else {
                        friction = this.b3Friction3(tension);
                    }
                    return friction;
                };
                return BouncyConversion2;
            }();
            var SpringConfig = function() {
                SpringConfig2.fromOrigamiTensionAndFriction = function fromOrigamiTensionAndFriction(tension, friction) {
                    return new SpringConfig2(tensionFromOrigamiValue(tension), frictionFromOrigamiValue(friction));
                };
                SpringConfig2.fromBouncinessAndSpeed = function fromBouncinessAndSpeed(bounciness, speed) {
                    var bouncyConversion = new BouncyConversion(bounciness, speed);
                    return SpringConfig2.fromOrigamiTensionAndFriction(bouncyConversion.bouncyTension, bouncyConversion.bouncyFriction);
                };
                SpringConfig2.coastingConfigWithOrigamiFriction = function coastingConfigWithOrigamiFriction(friction) {
                    return new SpringConfig2(0, frictionFromOrigamiValue(friction));
                };
                function SpringConfig2(tension, friction) {
                    classCallCheck(this, SpringConfig2);
                    this.tension = tension;
                    this.friction = friction;
                }
                return SpringConfig2;
            }();
            SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG = SpringConfig.fromOrigamiTensionAndFriction(40, 7);
            var PhysicsState = function PhysicsState2() {
                classCallCheck(this, PhysicsState2);
                this.position = 0;
                this.velocity = 0;
            };
            var Spring2 = function() {
                function Spring3(springSystem) {
                    classCallCheck(this, Spring3);
                    this.listeners = [];
                    this._startValue = 0;
                    this._currentState = new PhysicsState();
                    this._displacementFromRestThreshold = 1e-3;
                    this._endValue = 0;
                    this._overshootClampingEnabled = false;
                    this._previousState = new PhysicsState();
                    this._restSpeedThreshold = 1e-3;
                    this._tempState = new PhysicsState();
                    this._timeAccumulator = 0;
                    this._wasAtRest = true;
                    this._id = "s" + Spring3._ID++;
                    this._springSystem = springSystem;
                }
                Spring3.prototype.destroy = function destroy() {
                    this.listeners = [];
                    this._springSystem.deregisterSpring(this);
                };
                Spring3.prototype.getId = function getId() {
                    return this._id;
                };
                Spring3.prototype.setSpringConfig = function setSpringConfig(springConfig) {
                    this._springConfig = springConfig;
                    return this;
                };
                Spring3.prototype.getSpringConfig = function getSpringConfig() {
                    return this._springConfig;
                };
                Spring3.prototype.setCurrentValue = function setCurrentValue(currentValue, skipSetAtRest) {
                    this._startValue = currentValue;
                    this._currentState.position = currentValue;
                    if (!skipSetAtRest) {
                        this.setAtRest();
                    }
                    this.notifyPositionUpdated(false, false);
                    return this;
                };
                Spring3.prototype.getStartValue = function getStartValue() {
                    return this._startValue;
                };
                Spring3.prototype.getCurrentValue = function getCurrentValue() {
                    return this._currentState.position;
                };
                Spring3.prototype.getCurrentDisplacementDistance = function getCurrentDisplacementDistance() {
                    return this.getDisplacementDistanceForState(this._currentState);
                };
                Spring3.prototype.getDisplacementDistanceForState = function getDisplacementDistanceForState(state) {
                    return Math.abs(this._endValue - state.position);
                };
                Spring3.prototype.setEndValue = function setEndValue(endValue) {
                    if (this._endValue === endValue && this.isAtRest()) {
                        return this;
                    }
                    this._startValue = this.getCurrentValue();
                    this._endValue = endValue;
                    this._springSystem.activateSpring(this.getId());
                    for(var i = 0, len = this.listeners.length; i < len; i++){
                        var listener = this.listeners[i];
                        var onChange = listener.onSpringEndStateChange;
                        onChange && onChange(this);
                    }
                    return this;
                };
                Spring3.prototype.getEndValue = function getEndValue() {
                    return this._endValue;
                };
                Spring3.prototype.setVelocity = function setVelocity(velocity) {
                    if (velocity === this._currentState.velocity) {
                        return this;
                    }
                    this._currentState.velocity = velocity;
                    this._springSystem.activateSpring(this.getId());
                    return this;
                };
                Spring3.prototype.getVelocity = function getVelocity() {
                    return this._currentState.velocity;
                };
                Spring3.prototype.setRestSpeedThreshold = function setRestSpeedThreshold(restSpeedThreshold) {
                    this._restSpeedThreshold = restSpeedThreshold;
                    return this;
                };
                Spring3.prototype.getRestSpeedThreshold = function getRestSpeedThreshold() {
                    return this._restSpeedThreshold;
                };
                Spring3.prototype.setRestDisplacementThreshold = function setRestDisplacementThreshold(displacementFromRestThreshold) {
                    this._displacementFromRestThreshold = displacementFromRestThreshold;
                };
                Spring3.prototype.getRestDisplacementThreshold = function getRestDisplacementThreshold() {
                    return this._displacementFromRestThreshold;
                };
                Spring3.prototype.setOvershootClampingEnabled = function setOvershootClampingEnabled(enabled) {
                    this._overshootClampingEnabled = enabled;
                    return this;
                };
                Spring3.prototype.isOvershootClampingEnabled = function isOvershootClampingEnabled() {
                    return this._overshootClampingEnabled;
                };
                Spring3.prototype.isOvershooting = function isOvershooting() {
                    var start = this._startValue;
                    var end = this._endValue;
                    return this._springConfig.tension > 0 && (start < end && this.getCurrentValue() > end || start > end && this.getCurrentValue() < end);
                };
                Spring3.prototype.advance = function advance(time, realDeltaTime) {
                    var isAtRest = this.isAtRest();
                    if (isAtRest && this._wasAtRest) {
                        return;
                    }
                    var adjustedDeltaTime = realDeltaTime;
                    if (realDeltaTime > Spring3.MAX_DELTA_TIME_SEC) {
                        adjustedDeltaTime = Spring3.MAX_DELTA_TIME_SEC;
                    }
                    this._timeAccumulator += adjustedDeltaTime;
                    var tension = this._springConfig.tension;
                    var friction = this._springConfig.friction;
                    var position = this._currentState.position;
                    var velocity = this._currentState.velocity;
                    var tempPosition = this._tempState.position;
                    var tempVelocity = this._tempState.velocity;
                    var aVelocity = void 0;
                    var aAcceleration = void 0;
                    var bVelocity = void 0;
                    var bAcceleration = void 0;
                    var cVelocity = void 0;
                    var cAcceleration = void 0;
                    var dVelocity = void 0;
                    var dAcceleration = void 0;
                    var dxdt = void 0;
                    var dvdt = void 0;
                    while(this._timeAccumulator >= Spring3.SOLVER_TIMESTEP_SEC){
                        this._timeAccumulator -= Spring3.SOLVER_TIMESTEP_SEC;
                        if (this._timeAccumulator < Spring3.SOLVER_TIMESTEP_SEC) {
                            this._previousState.position = position;
                            this._previousState.velocity = velocity;
                        }
                        aVelocity = velocity;
                        aAcceleration = tension * (this._endValue - tempPosition) - friction * velocity;
                        tempPosition = position + aVelocity * Spring3.SOLVER_TIMESTEP_SEC * 0.5;
                        tempVelocity = velocity + aAcceleration * Spring3.SOLVER_TIMESTEP_SEC * 0.5;
                        bVelocity = tempVelocity;
                        bAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;
                        tempPosition = position + bVelocity * Spring3.SOLVER_TIMESTEP_SEC * 0.5;
                        tempVelocity = velocity + bAcceleration * Spring3.SOLVER_TIMESTEP_SEC * 0.5;
                        cVelocity = tempVelocity;
                        cAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;
                        tempPosition = position + cVelocity * Spring3.SOLVER_TIMESTEP_SEC;
                        tempVelocity = velocity + cAcceleration * Spring3.SOLVER_TIMESTEP_SEC;
                        dVelocity = tempVelocity;
                        dAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;
                        dxdt = 1 / 6 * (aVelocity + 2 * (bVelocity + cVelocity) + dVelocity);
                        dvdt = 1 / 6 * (aAcceleration + 2 * (bAcceleration + cAcceleration) + dAcceleration);
                        position += dxdt * Spring3.SOLVER_TIMESTEP_SEC;
                        velocity += dvdt * Spring3.SOLVER_TIMESTEP_SEC;
                    }
                    this._tempState.position = tempPosition;
                    this._tempState.velocity = tempVelocity;
                    this._currentState.position = position;
                    this._currentState.velocity = velocity;
                    if (this._timeAccumulator > 0) {
                        this._interpolate(this._timeAccumulator / Spring3.SOLVER_TIMESTEP_SEC);
                    }
                    if (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) {
                        if (this._springConfig.tension > 0) {
                            this._startValue = this._endValue;
                            this._currentState.position = this._endValue;
                        } else {
                            this._endValue = this._currentState.position;
                            this._startValue = this._endValue;
                        }
                        this.setVelocity(0);
                        isAtRest = true;
                    }
                    var notifyActivate = false;
                    if (this._wasAtRest) {
                        this._wasAtRest = false;
                        notifyActivate = true;
                    }
                    var notifyAtRest = false;
                    if (isAtRest) {
                        this._wasAtRest = true;
                        notifyAtRest = true;
                    }
                    this.notifyPositionUpdated(notifyActivate, notifyAtRest);
                };
                Spring3.prototype.notifyPositionUpdated = function notifyPositionUpdated(notifyActivate, notifyAtRest) {
                    for(var i = 0, len = this.listeners.length; i < len; i++){
                        var listener = this.listeners[i];
                        if (notifyActivate && listener.onSpringActivate) {
                            listener.onSpringActivate(this);
                        }
                        if (listener.onSpringUpdate) {
                            listener.onSpringUpdate(this);
                        }
                        if (notifyAtRest && listener.onSpringAtRest) {
                            listener.onSpringAtRest(this);
                        }
                    }
                };
                Spring3.prototype.systemShouldAdvance = function systemShouldAdvance() {
                    return !this.isAtRest() || !this.wasAtRest();
                };
                Spring3.prototype.wasAtRest = function wasAtRest() {
                    return this._wasAtRest;
                };
                Spring3.prototype.isAtRest = function isAtRest() {
                    return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || this._springConfig.tension === 0);
                };
                Spring3.prototype.setAtRest = function setAtRest() {
                    this._endValue = this._currentState.position;
                    this._tempState.position = this._currentState.position;
                    this._currentState.velocity = 0;
                    return this;
                };
                Spring3.prototype._interpolate = function _interpolate(alpha) {
                    this._currentState.position = this._currentState.position * alpha + this._previousState.position * (1 - alpha);
                    this._currentState.velocity = this._currentState.velocity * alpha + this._previousState.velocity * (1 - alpha);
                };
                Spring3.prototype.getListeners = function getListeners() {
                    return this.listeners;
                };
                Spring3.prototype.addListener = function addListener(newListener) {
                    this.listeners.push(newListener);
                    return this;
                };
                Spring3.prototype.removeListener = function removeListener(listenerToRemove) {
                    removeFirst(this.listeners, listenerToRemove);
                    return this;
                };
                Spring3.prototype.removeAllListeners = function removeAllListeners() {
                    this.listeners = [];
                    return this;
                };
                Spring3.prototype.currentValueIsApproximately = function currentValueIsApproximately(value) {
                    return Math.abs(this.getCurrentValue() - value) <= this.getRestDisplacementThreshold();
                };
                return Spring3;
            }();
            Spring2._ID = 0;
            Spring2.MAX_DELTA_TIME_SEC = 0.064;
            Spring2.SOLVER_TIMESTEP_SEC = 1e-3;
            var SpringSystem2 = function() {
                function SpringSystem3(looper) {
                    classCallCheck(this, SpringSystem3);
                    this.listeners = [];
                    this._activeSprings = [];
                    this._idleSpringIndices = [];
                    this._isIdle = true;
                    this._lastTimeMillis = -1;
                    this._springRegistry = {};
                    this.looper = looper || new AnimationLooper();
                    this.looper.springSystem = this;
                }
                SpringSystem3.prototype.setLooper = function setLooper(looper) {
                    this.looper = looper;
                    looper.springSystem = this;
                };
                SpringSystem3.prototype.createSpring = function createSpring(tension, friction) {
                    var springConfig = void 0;
                    if (tension === void 0 || friction === void 0) {
                        springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
                    } else {
                        springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction);
                    }
                    return this.createSpringWithConfig(springConfig);
                };
                SpringSystem3.prototype.createSpringWithBouncinessAndSpeed = function createSpringWithBouncinessAndSpeed(bounciness, speed) {
                    var springConfig = void 0;
                    if (bounciness === void 0 || speed === void 0) {
                        springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
                    } else {
                        springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed);
                    }
                    return this.createSpringWithConfig(springConfig);
                };
                SpringSystem3.prototype.createSpringWithConfig = function createSpringWithConfig(springConfig) {
                    var spring = new Spring2(this);
                    this.registerSpring(spring);
                    spring.setSpringConfig(springConfig);
                    return spring;
                };
                SpringSystem3.prototype.getIsIdle = function getIsIdle() {
                    return this._isIdle;
                };
                SpringSystem3.prototype.getSpringById = function getSpringById(id) {
                    return this._springRegistry[id];
                };
                SpringSystem3.prototype.getAllSprings = function getAllSprings() {
                    var vals = [];
                    for(var _id in this._springRegistry){
                        if (this._springRegistry.hasOwnProperty(_id)) {
                            vals.push(this._springRegistry[_id]);
                        }
                    }
                    return vals;
                };
                SpringSystem3.prototype.registerSpring = function registerSpring(spring) {
                    this._springRegistry[spring.getId()] = spring;
                };
                SpringSystem3.prototype.deregisterSpring = function deregisterSpring(spring) {
                    removeFirst(this._activeSprings, spring);
                    delete this._springRegistry[spring.getId()];
                };
                SpringSystem3.prototype.advance = function advance(time, deltaTime) {
                    while(this._idleSpringIndices.length > 0){
                        this._idleSpringIndices.pop();
                    }
                    for(var i = 0, len = this._activeSprings.length; i < len; i++){
                        var spring = this._activeSprings[i];
                        if (spring.systemShouldAdvance()) {
                            spring.advance(time / 1e3, deltaTime / 1e3);
                        } else {
                            this._idleSpringIndices.push(this._activeSprings.indexOf(spring));
                        }
                    }
                    while(this._idleSpringIndices.length > 0){
                        var idx = this._idleSpringIndices.pop();
                        idx >= 0 && this._activeSprings.splice(idx, 1);
                    }
                };
                SpringSystem3.prototype.loop = function loop(currentTimeMillis) {
                    var listener = void 0;
                    if (this._lastTimeMillis === -1) {
                        this._lastTimeMillis = currentTimeMillis - 1;
                    }
                    var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
                    this._lastTimeMillis = currentTimeMillis;
                    var i = 0;
                    var len = this.listeners.length;
                    for(i = 0; i < len; i++){
                        listener = this.listeners[i];
                        listener.onBeforeIntegrate && listener.onBeforeIntegrate(this);
                    }
                    this.advance(currentTimeMillis, ellapsedMillis);
                    if (this._activeSprings.length === 0) {
                        this._isIdle = true;
                        this._lastTimeMillis = -1;
                    }
                    for(i = 0; i < len; i++){
                        listener = this.listeners[i];
                        listener.onAfterIntegrate && listener.onAfterIntegrate(this);
                    }
                    if (!this._isIdle) {
                        this.looper.run();
                    }
                };
                SpringSystem3.prototype.activateSpring = function activateSpring(springId) {
                    var spring = this._springRegistry[springId];
                    if (this._activeSprings.indexOf(spring) === -1) {
                        this._activeSprings.push(spring);
                    }
                    if (this.getIsIdle()) {
                        this._isIdle = false;
                        this.looper.run();
                    }
                };
                SpringSystem3.prototype.addListener = function addListener(listener) {
                    this.listeners.push(listener);
                };
                SpringSystem3.prototype.removeListener = function removeListener(listener) {
                    removeFirst(this.listeners, listener);
                };
                SpringSystem3.prototype.removeAllListeners = function removeAllListeners() {
                    this.listeners = [];
                };
                return SpringSystem3;
            }();
            var index = _extends({}, Loopers, {
                OrigamiValueConverter: OrigamiValueConverter,
                MathUtil: MathUtil,
                Spring: Spring2,
                SpringConfig: SpringConfig,
                SpringSystem: SpringSystem2,
                util: _extends({}, util, MathUtil)
            });
            return index;
        });
    }
});
// src/useSpring.ts
var import_rebound = __toESM(require_rebound());
import { useEffect, useMemo, useState } from "react";
var useSpring = function() {
    var targetValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, tension = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, friction = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 3;
    var _useState = _sliced_to_array(useState(null), 2), spring = _useState[0], setSpring = _useState[1];
    var _useState1 = _sliced_to_array(useState(targetValue), 2), value = _useState1[0], setValue = _useState1[1];
    var listener = useMemo(function() {
        return {
            onSpringUpdate: function(currentSpring) {
                var newValue = currentSpring.getCurrentValue();
                setValue(newValue);
            }
        };
    }, []);
    useEffect(function() {
        if (!spring) {
            var newSpring = new import_rebound.SpringSystem().createSpring(tension, friction);
            newSpring.setCurrentValue(targetValue);
            setSpring(newSpring);
            newSpring.addListener(listener);
        }
        return function() {
            if (spring) {
                spring.removeListener(listener);
                setSpring(null);
            }
        };
    }, [
        tension,
        friction,
        spring
    ]);
    useEffect(function() {
        if (spring) {
            spring.setEndValue(targetValue);
        }
    }, [
        targetValue
    ]);
    return value;
};
var useSpring_default = useSpring;
export { useSpring_default as default };

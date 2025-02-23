function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
import { useUpdateEffect_default } from "./chunk-UY5OQYFJ.mjs";
import { useEffectOnce_default } from "./chunk-YQAKRCTF.mjs";
// src/useLogger.ts
var useLogger = function(componentName) {
    for(var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        rest[_key - 1] = arguments[_key];
    }
    useEffectOnce_default(function() {
        var _console;
        (_console = console).log.apply(_console, [
            "".concat(componentName, " mounted")
        ].concat(_to_consumable_array(rest)));
        return function() {
            return console.log("".concat(componentName, " unmounted"));
        };
    });
    useUpdateEffect_default(function() {
        var _console;
        (_console = console).log.apply(_console, [
            "".concat(componentName, " updated")
        ].concat(_to_consumable_array(rest)));
    });
};
var useLogger_default = useLogger;
export { useLogger_default };

import { useRaf_default } from "./chunk-QEQFLHFT.mjs";
// src/useTween.ts
import { easing } from "ts-easing";
var useTween = function() {
    var easingName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "inCirc", ms = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 200, delay = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var fn = easing[easingName];
    var t = useRaf_default(ms, delay);
    if (process.env.NODE_ENV !== "production") {
        if (typeof fn !== "function") {
            console.error('useTween() expected "easingName" property to be a valid easing function name, like:"' + Object.keys(easing).join('", "') + '".');
            console.trace();
            return 0;
        }
    }
    return fn(t);
};
var useTween_default = useTween;
export { useTween_default };

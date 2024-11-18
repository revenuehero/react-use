import { isBrowser, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useEvent.ts
import { useEffect } from "react";
var defaultTarget = isBrowser ? window : null;
var isListenerType1 = function(target) {
    return !!target.addEventListener;
};
var isListenerType2 = function(target) {
    return !!target.on;
};
var useEvent = function(name, handler) {
    var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultTarget, options = arguments.length > 3 ? arguments[3] : void 0;
    useEffect(function() {
        if (!handler) {
            return;
        }
        if (!target) {
            return;
        }
        if (isListenerType1(target)) {
            on(target, name, handler, options);
        } else if (isListenerType2(target)) {
            target.on(name, handler, options);
        }
        return function() {
            if (isListenerType1(target)) {
                off(target, name, handler, options);
            } else if (isListenerType2(target)) {
                target.off(name, handler, options);
            }
        };
    }, [
        name,
        handler,
        target,
        JSON.stringify(options)
    ]);
};
var useEvent_default = useEvent;
export { useEvent_default };

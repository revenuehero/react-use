import { useEvent_default } from "./chunk-FQVXV7TY.mjs";
import { noop } from "./chunk-CI6ZNB5H.mjs";
// src/useKey.ts
import { useMemo } from "react";
var createKeyPredicate = function(keyFilter) {
    return typeof keyFilter === "function" ? keyFilter : typeof keyFilter === "string" ? function(event) {
        return event.key === keyFilter;
    } : keyFilter ? function() {
        return true;
    } : function() {
        return false;
    };
};
var useKey = function(key) {
    var fn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop, opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, deps = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [
        key
    ];
    var _opts_event = opts.event, event = _opts_event === void 0 ? "keydown" : _opts_event, target = opts.target, options = opts.options;
    var useMemoHandler = useMemo(function() {
        var predicate = createKeyPredicate(key);
        var handler = function(handlerEvent) {
            if (predicate(handlerEvent)) {
                return fn(handlerEvent);
            }
        };
        return handler;
    }, deps);
    useEvent_default(event, useMemoHandler, target, options);
};
var useKey_default = useKey;
export { useKey_default };

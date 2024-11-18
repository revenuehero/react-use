import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useBeforeUnload.ts
import { useCallback, useEffect } from "react";
var useBeforeUnload = function() {
    var enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, message = arguments.length > 1 ? arguments[1] : void 0;
    var handler = useCallback(function(event) {
        var finalEnabled = typeof enabled === "function" ? enabled() : true;
        if (!finalEnabled) {
            return;
        }
        event.preventDefault();
        if (message) {
            event.returnValue = message;
        }
        return message;
    }, [
        enabled,
        message
    ]);
    useEffect(function() {
        if (!enabled) {
            return;
        }
        on(window, "beforeunload", handler);
        return function() {
            return off(window, "beforeunload", handler);
        };
    }, [
        enabled,
        handler
    ]);
};
var useBeforeUnload_default = useBeforeUnload;
export { useBeforeUnload_default };

import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/usePageLeave.ts
import { useEffect } from "react";
var usePageLeave = function(onPageLeave) {
    var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    useEffect(function() {
        if (!onPageLeave) {
            return;
        }
        var handler = function(event) {
            event = event ? event : window.event;
            var from = event.relatedTarget || event.toElement;
            if (!from || from.nodeName === "HTML") {
                onPageLeave();
            }
        };
        on(document, "mouseout", handler);
        return function() {
            off(document, "mouseout", handler);
        };
    }, args);
};
var usePageLeave_default = usePageLeave;
export { usePageLeave_default };

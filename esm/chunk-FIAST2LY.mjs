function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
import { isBrowser, off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useLockBodyScroll.ts
import { useEffect, useRef } from "react";
function getClosestBody(el) {
    if (!el) {
        return null;
    } else if (el.tagName === "BODY") {
        return el;
    } else if (el.tagName === "IFRAME") {
        var document2 = el.contentDocument;
        return document2 ? document2.body : null;
    } else if (!el.offsetParent) {
        return null;
    }
    return getClosestBody(el.offsetParent);
}
function preventDefault(rawEvent) {
    var e = rawEvent || window.event;
    if (e.touches.length > 1) return true;
    if (e.preventDefault) e.preventDefault();
    return false;
}
var isIosDevice = isBrowser && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform);
var bodies = /* @__PURE__ */ new Map();
var doc = (typeof document === "undefined" ? "undefined" : _type_of(document)) === "object" ? document : void 0;
var documentListenerAdded = false;
var useLockBodyScroll_default = !doc ? function useLockBodyMock() {
    var _locked = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, _elementRef = arguments.length > 1 ? arguments[1] : void 0;
} : function useLockBody() {
    var locked = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, elementRef = arguments.length > 1 ? arguments[1] : void 0;
    var bodyRef = useRef(doc.body);
    elementRef = elementRef || bodyRef;
    var lock = function(body) {
        var bodyInfo = bodies.get(body);
        if (!bodyInfo) {
            bodies.set(body, {
                counter: 1,
                initialOverflow: body.style.overflow
            });
            if (isIosDevice) {
                if (!documentListenerAdded) {
                    on(document, "touchmove", preventDefault, {
                        passive: false
                    });
                    documentListenerAdded = true;
                }
            } else {
                body.style.overflow = "hidden";
            }
        } else {
            bodies.set(body, {
                counter: bodyInfo.counter + 1,
                initialOverflow: bodyInfo.initialOverflow
            });
        }
    };
    var unlock = function(body) {
        var bodyInfo = bodies.get(body);
        if (bodyInfo) {
            if (bodyInfo.counter === 1) {
                bodies.delete(body);
                if (isIosDevice) {
                    body.ontouchmove = null;
                    if (documentListenerAdded) {
                        off(document, "touchmove", preventDefault);
                        documentListenerAdded = false;
                    }
                } else {
                    body.style.overflow = bodyInfo.initialOverflow;
                }
            } else {
                bodies.set(body, {
                    counter: bodyInfo.counter - 1,
                    initialOverflow: bodyInfo.initialOverflow
                });
            }
        }
    };
    useEffect(function() {
        var body = getClosestBody(elementRef.current);
        if (!body) {
            return;
        }
        if (locked) {
            lock(body);
        } else {
            unlock(body);
        }
    }, [
        locked,
        elementRef.current
    ]);
    useEffect(function() {
        var body = getClosestBody(elementRef.current);
        if (!body) {
            return;
        }
        return function() {
            unlock(body);
        };
    }, []);
};
export { getClosestBody, useLockBodyScroll_default };

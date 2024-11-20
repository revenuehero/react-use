import { useIsomorphicLayoutEffect_default } from "./chunk-MSZM3MQ3.mjs";
import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useStartTyping.ts
var isFocusedElementEditable = function() {
    var activeElement = document.activeElement, body = document.body;
    if (!activeElement) {
        return false;
    }
    if (activeElement === body) {
        return false;
    }
    switch(activeElement.tagName){
        case "INPUT":
        case "TEXTAREA":
            return true;
    }
    return activeElement.hasAttribute("contenteditable");
};
var isTypedCharGood = function(param) {
    var keyCode = param.keyCode, metaKey = param.metaKey, ctrlKey = param.ctrlKey, altKey = param.altKey;
    if (metaKey || ctrlKey || altKey) {
        return false;
    }
    if (keyCode >= 48 && keyCode <= 57) {
        return true;
    }
    if (keyCode >= 65 && keyCode <= 90) {
        return true;
    }
    return false;
};
var useStartTyping = function(onStartTyping) {
    useIsomorphicLayoutEffect_default(function() {
        var keydown = function(event) {
            !isFocusedElementEditable() && isTypedCharGood(event) && onStartTyping(event);
        };
        on(document, "keydown", keydown);
        return function() {
            off(document, "keydown", keydown);
        };
    }, []);
};
var useStartTyping_default = useStartTyping;
export { useStartTyping_default };

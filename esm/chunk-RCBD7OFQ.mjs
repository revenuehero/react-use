import { off, on } from "./chunk-CI6ZNB5H.mjs";
// src/useClickAway.ts
import { useEffect, useRef } from "react";
var defaultEvents = [
    "mousedown",
    "touchstart"
];
var useClickAway = function(ref, onClickAway) {
    var events = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultEvents;
    var savedCallback = useRef(onClickAway);
    useEffect(function() {
        savedCallback.current = onClickAway;
    }, [
        onClickAway
    ]);
    useEffect(function() {
        var handler = function(event) {
            var el = ref.current;
            el && !el.contains(event.target) && savedCallback.current(event);
        };
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var eventName = _step.value;
                on(document, eventName, handler);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return function() {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var eventName = _step.value;
                    off(document, eventName, handler);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };
    }, [
        events,
        ref
    ]);
};
var useClickAway_default = useClickAway;
export { useClickAway_default };

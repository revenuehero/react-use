function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
import { useUpdateEffect_default } from "./chunk-UY5OQYFJ.mjs";
import { useUpdate } from "./chunk-7AAVMONY.mjs";
import { useMountedState } from "./chunk-GTDP4HJC.mjs";
// src/useStateList.ts
import { useMemo, useRef } from "react";
function useStateList() {
    var stateSet = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var isMounted = useMountedState();
    var update = useUpdate();
    var index = useRef(0);
    useUpdateEffect_default(function() {
        if (stateSet.length <= index.current) {
            index.current = stateSet.length - 1;
            update();
        }
    }, [
        stateSet.length
    ]);
    var actions = useMemo(function() {
        return {
            next: function() {
                return actions.setStateAt(index.current + 1);
            },
            prev: function() {
                return actions.setStateAt(index.current - 1);
            },
            setStateAt: function(newIndex) {
                if (!isMounted()) return;
                if (!stateSet.length) return;
                if (newIndex === index.current) return;
                index.current = newIndex >= 0 ? newIndex % stateSet.length : stateSet.length + newIndex % stateSet.length;
                update();
            },
            setState: function(state) {
                if (!isMounted()) return;
                var newIndex = stateSet.length ? stateSet.indexOf(state) : -1;
                if (newIndex === -1) {
                    throw new Error("State '".concat(state, "' is not a valid state (does not exist in state list)"));
                }
                index.current = newIndex;
                update();
            }
        };
    }, [
        stateSet
    ]);
    return _object_spread({
        state: stateSet[index.current],
        currentIndex: index.current,
        isFirst: index.current === 0,
        isLast: index.current === stateSet.length - 1
    }, actions);
}
export { useStateList };

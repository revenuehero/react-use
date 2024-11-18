import { useFirstMountState } from "./chunk-5DLK7AVU.mjs";
// src/useUpdateEffect.ts
import { useEffect } from "react";
var useUpdateEffect = function(effect, deps) {
    var isFirstMount = useFirstMountState();
    useEffect(function() {
        if (!isFirstMount) {
            return effect();
        }
    }, deps);
};
var useUpdateEffect_default = useUpdateEffect;
export { useUpdateEffect_default };

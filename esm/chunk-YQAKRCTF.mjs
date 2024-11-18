// src/useEffectOnce.ts
import { useEffect } from "react";
var useEffectOnce = function(effect) {
    useEffect(effect, []);
};
var useEffectOnce_default = useEffectOnce;
export { useEffectOnce_default };

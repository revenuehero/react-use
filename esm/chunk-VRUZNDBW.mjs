import { useEffectOnce_default } from "./chunk-YQAKRCTF.mjs";
// src/useMount.ts
var useMount = function(fn) {
    useEffectOnce_default(function() {
        fn();
    });
};
var useMount_default = useMount;
export { useMount_default };

import { useUpdate } from "./chunk-7AAVMONY.mjs";
import { useTimeoutFn } from "./chunk-MQMFJULZ.mjs";
// src/useTimeout.ts
function useTimeout() {
    var ms = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var update = useUpdate();
    return useTimeoutFn(update, ms);
}
export { useTimeout };

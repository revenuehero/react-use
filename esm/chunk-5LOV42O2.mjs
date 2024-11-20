import { resolveHookState } from "./chunk-MZIQQTER.mjs";
import { useUpdate } from "./chunk-7AAVMONY.mjs";
// src/useGetSet.ts
import { useMemo, useRef } from "react";
function useGetSet(initialState) {
    var state = useRef(resolveHookState(initialState));
    var update = useUpdate();
    return useMemo(function() {
        return [
            function() {
                return state.current;
            },
            function(newState) {
                state.current = resolveHookState(newState, state.current);
                update();
            }
        ];
    }, []);
}
export { useGetSet };

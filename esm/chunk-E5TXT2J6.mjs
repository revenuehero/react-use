// src/useEnsuredForwardedRef.ts
import { forwardRef, useEffect, useRef } from "react";
function useEnsuredForwardedRef(forwardedRef) {
    var ensuredRef = useRef(forwardedRef && forwardedRef.current);
    useEffect(function() {
        if (!forwardedRef) {
            return;
        }
        forwardedRef.current = ensuredRef.current;
    }, [
        forwardedRef
    ]);
    return ensuredRef;
}
function ensuredForwardRef(Component) {
    return forwardRef(function(props, ref) {
        var ensuredRef = useEnsuredForwardedRef(ref);
        return Component(props, ensuredRef);
    });
}
export { useEnsuredForwardedRef, ensuredForwardRef };

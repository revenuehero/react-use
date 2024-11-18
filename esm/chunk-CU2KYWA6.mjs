// src/usePrevious.ts
import { useEffect, useRef } from "react";
function usePrevious(state) {
    var ref = useRef();
    useEffect(function() {
        ref.current = state;
    });
    return ref.current;
}
export { usePrevious };

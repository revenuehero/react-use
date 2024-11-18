// src/useFirstMountState.ts
import { useRef } from "react";
function useFirstMountState() {
    var isFirst = useRef(true);
    if (isFirst.current) {
        isFirst.current = false;
        return true;
    }
    return isFirst.current;
}
export { useFirstMountState };

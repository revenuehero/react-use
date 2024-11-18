// src/useRendersCount.ts
import { useRef } from "react";
function useRendersCount() {
    return ++useRef(0).current;
}
export { useRendersCount };

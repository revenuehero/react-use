import { useMouse_default } from "./chunk-32UJGARW.mjs";
import { useHoverDirty_default } from "./chunk-NBZR5ZB2.mjs";
// src/useMouseHovered.ts
var nullRef = {
    current: null
};
var useMouseHovered = function(ref) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var whenHovered = !!options.whenHovered;
    var bound = !!options.bound;
    var isHovered = useHoverDirty_default(ref, whenHovered);
    var state = useMouse_default(whenHovered && !isHovered ? nullRef : ref);
    if (bound) {
        state.elX = Math.max(0, Math.min(state.elX, state.elW));
        state.elY = Math.max(0, Math.min(state.elY, state.elH));
    }
    return state;
};
var useMouseHovered_default = useMouseHovered;
export { useMouseHovered_default };

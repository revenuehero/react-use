// src/useTitle.ts
import { useEffect, useRef } from "react";
var DEFAULT_USE_TITLE_OPTIONS = {
    restoreOnUnmount: false
};
function useTitle(title) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_USE_TITLE_OPTIONS;
    var prevTitleRef = useRef(document.title);
    if (document.title !== title) document.title = title;
    useEffect(function() {
        if (options && options.restoreOnUnmount) {
            return function() {
                document.title = prevTitleRef.current;
            };
        } else {
            return;
        }
    }, []);
}
var useTitle_default = typeof document !== "undefined" ? useTitle : function(_title) {};
export { useTitle_default };

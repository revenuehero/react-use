// src/useLifecycles.ts
import { useEffect } from "react";
var useLifecycles = function(mount, unmount) {
    useEffect(function() {
        if (mount) {
            mount();
        }
        return function() {
            if (unmount) {
                unmount();
            }
        };
    }, []);
};
var useLifecycles_default = useLifecycles;
export { useLifecycles_default };

// src/factory/createStateContext.ts
import { createContext, createElement, useContext, useState } from "react";
var createStateContext = function(defaultInitialValue) {
    var context = createContext(void 0);
    var providerFactory = function(props, children) {
        return createElement(context.Provider, props, children);
    };
    var StateProvider = function(param) {
        var children = param.children, initialValue = param.initialValue;
        var state = useState(initialValue !== void 0 ? initialValue : defaultInitialValue);
        return providerFactory({
            value: state
        }, children);
    };
    var useStateContext = function() {
        var state = useContext(context);
        if (state == null) {
            throw new Error("useStateContext must be used inside a StateProvider.");
        }
        return state;
    };
    return [
        useStateContext,
        StateProvider,
        context
    ];
};
var createStateContext_default = createStateContext;
export { createStateContext_default };

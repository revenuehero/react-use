// src/factory/createReducerContext.ts
import { createContext, createElement, useContext, useReducer } from "react";
var createReducerContext = function(reducer, defaultInitialState) {
    var context = createContext(void 0);
    var providerFactory = function(props, children) {
        return createElement(context.Provider, props, children);
    };
    var ReducerProvider = function(param) {
        var children = param.children, initialState = param.initialState;
        var state = useReducer(reducer, initialState !== void 0 ? initialState : defaultInitialState);
        return providerFactory({
            value: state
        }, children);
    };
    var useReducerContext = function() {
        var state = useContext(context);
        if (state == null) {
            throw new Error("useReducerContext must be used inside a ReducerProvider.");
        }
        return state;
    };
    return [
        useReducerContext,
        ReducerProvider,
        context
    ];
};
var createReducerContext_default = createReducerContext;
export { createReducerContext_default };

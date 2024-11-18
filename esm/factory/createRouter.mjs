import "../chunk-UJCSKKID.mjs";
// src/factory/createRouter.ts
import React from "react";
var createRouter = function() {
    var context = React.createContext({
        route: ""
    });
    var Router = function(props) {
        var route = props.route, fullRoute = props.fullRoute, parent = props.parent, children = props.children;
        if (process.env.NODE_ENV !== "production") {
            if (typeof route !== "string") {
                throw new TypeError("Router route must be a string.");
            }
        }
        return React.createElement(context.Provider, {
            value: {
                fullRoute: fullRoute || route,
                route: route,
                parent: parent
            },
            children: children
        });
    };
};
var createRouter_default = createRouter;
export { createRouter_default as default };

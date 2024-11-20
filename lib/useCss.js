"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var nano_css_1 = require("nano-css");
var cssom_js_1 = require("nano-css/addon/cssom.js");
var vcssom_js_1 = require("nano-css/addon/vcssom.js");
var cssToTree_js_1 = require("nano-css/addon/vcssom/cssToTree.js");
var react_1 = require("react");
var useIsomorphicLayoutEffect_1 = tslib_1.__importDefault(require("./useIsomorphicLayoutEffect"));
var nano = nano_css_1.create();
cssom_js_1.addon(nano);
vcssom_js_1.addon(nano);
var counter = 0;
var useCss = function (css) {
    var className = react_1.useMemo(function () { return 'react-use-css-' + (counter++).toString(36); }, []);
    var sheet = react_1.useMemo(function () { return new nano.VSheet(); }, []);
    useIsomorphicLayoutEffect_1.default(function () {
        var tree = {};
        cssToTree_js_1.cssToTree(tree, css, '.' + className, '');
        sheet.diff(tree);
        return function () {
            sheet.diff({});
        };
    });
    return className;
};
exports.default = useCss;

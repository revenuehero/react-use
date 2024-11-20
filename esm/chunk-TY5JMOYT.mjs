import { useIsomorphicLayoutEffect_default } from "./chunk-MSZM3MQ3.mjs";
// src/useCss.ts
import { create } from "nano-css";
import { addon as addonCSSOM } from "nano-css/addon/cssom.js";
import { addon as addonVCSSOM } from "nano-css/addon/vcssom.js";
import { cssToTree } from "nano-css/addon/vcssom/cssToTree.js";
import { useMemo } from "react";
var nano = create();
addonCSSOM(nano);
addonVCSSOM(nano);
var counter = 0;
var useCss = function(css) {
    var className = useMemo(function() {
        return "react-use-css-" + (counter++).toString(36);
    }, []);
    var sheet = useMemo(function() {
        return new nano.VSheet();
    }, []);
    useIsomorphicLayoutEffect_default(function() {
        var tree = {};
        cssToTree(tree, css, "." + className, "");
        sheet.diff(tree);
        return function() {
            sheet.diff({});
        };
    });
    return className;
};
var useCss_default = useCss;
export { useCss_default };

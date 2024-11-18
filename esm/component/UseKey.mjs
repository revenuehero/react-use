function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
import { createRenderProp } from "../chunk-I67HND2H.mjs";
import { useKey_default } from "../chunk-M52HH5TM.mjs";
import "../chunk-FQVXV7TY.mjs";
import "../chunk-CI6ZNB5H.mjs";
import "../chunk-UJCSKKID.mjs";
// src/component/UseKey.tsx
var UseKey = createRenderProp(useKey_default, function(_param) {
    var filter = _param.filter, fn = _param.fn, deps = _param.deps, rest = _object_without_properties(_param, [
        "filter",
        "fn",
        "deps"
    ]);
    return [
        filter,
        fn,
        rest,
        deps
    ];
});
var UseKey_default = UseKey;
export { UseKey_default as default };

import { resolveHookState } from "./chunk-MZIQQTER.mjs";
import { useUpdate } from "./chunk-7AAVMONY.mjs";
// src/useList.ts
import { useMemo, useRef } from "react";
function useList() {
    var initialList = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var list = useRef(resolveHookState(initialList));
    var update = useUpdate();
    var actions = useMemo(function() {
        var a = {
            set: function(newList) {
                list.current = resolveHookState(newList, list.current);
                update();
            },
            push: function() {
                for(var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++){
                    items[_key] = arguments[_key];
                }
                items.length && actions.set(function(curr) {
                    return curr.concat(items);
                });
            },
            updateAt: function(index, item) {
                actions.set(function(curr) {
                    var arr = curr.slice();
                    arr[index] = item;
                    return arr;
                });
            },
            insertAt: function(index, item) {
                actions.set(function(curr) {
                    var arr = curr.slice();
                    index > arr.length ? arr[index] = item : arr.splice(index, 0, item);
                    return arr;
                });
            },
            update: function(predicate, newItem) {
                actions.set(function(curr) {
                    return curr.map(function(item) {
                        return predicate(item, newItem) ? newItem : item;
                    });
                });
            },
            updateFirst: function(predicate, newItem) {
                var index = list.current.findIndex(function(item) {
                    return predicate(item, newItem);
                });
                index >= 0 && actions.updateAt(index, newItem);
            },
            upsert: function(predicate, newItem) {
                var index = list.current.findIndex(function(item) {
                    return predicate(item, newItem);
                });
                index >= 0 ? actions.updateAt(index, newItem) : actions.push(newItem);
            },
            sort: function(compareFn) {
                actions.set(function(curr) {
                    return curr.slice().sort(compareFn);
                });
            },
            filter: function(callbackFn, thisArg) {
                actions.set(function(curr) {
                    return curr.slice().filter(callbackFn, thisArg);
                });
            },
            removeAt: function(index) {
                actions.set(function(curr) {
                    var arr = curr.slice();
                    arr.splice(index, 1);
                    return arr;
                });
            },
            clear: function() {
                actions.set([]);
            },
            reset: function() {
                actions.set(resolveHookState(initialList).slice());
            }
        };
        a.remove = a.removeAt;
        return a;
    }, []);
    return [
        list.current,
        actions
    ];
}
var useList_default = useList;
export { useList_default };

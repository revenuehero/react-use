import { isBrowser } from "./chunk-CI6ZNB5H.mjs";
// src/useIsomorphicLayoutEffect.ts
import { useEffect, useLayoutEffect } from "react";
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
var useIsomorphicLayoutEffect_default = useIsomorphicLayoutEffect;
export { useIsomorphicLayoutEffect_default };

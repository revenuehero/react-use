// src/misc/hookState.ts
function resolveHookState(nextState, currentState) {
    if (typeof nextState === "function") {
        return nextState.length ? nextState(currentState) : nextState();
    }
    return nextState;
}
export { resolveHookState };

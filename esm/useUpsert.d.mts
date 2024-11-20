import { ListActions } from './useList.mjs';
import { IHookStateInitAction } from './misc/hookState.mjs';

interface UpsertListActions<T> extends Omit<ListActions<T>, 'upsert'> {
    upsert: (newItem: T) => void;
}
/**
 * @deprecated Use `useList` hook's upsert action instead
 */
declare function useUpsert<T>(predicate: (a: T, b: T) => boolean, initialList?: IHookStateInitAction<T[]>): [T[], UpsertListActions<T>];

export { type UpsertListActions, useUpsert as default };

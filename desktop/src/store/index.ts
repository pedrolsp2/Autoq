import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand';
import { AuthSlice, useAuthSlice } from './authSlice';
import { ResetSlice, useResetSlice } from './resetSlice';
import { immer } from 'zustand/middleware/immer';

export type Store = AuthSlice & ResetSlice;

export interface NormalizedState<T> {
  ids: (string | number)[];
  entities: { [id: string]: T };
}

export type ImmerStateCreator<T> = StateCreator<
  Store,
  [['zustand/immer', never], never],
  [],
  T
>;

export const useStoreBase = create<Store>()(
  immer((...a) => ({
    ...useAuthSlice(...a),
    ...useResetSlice(...a),
  }))
);

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useStore = createSelectors(useStoreBase);

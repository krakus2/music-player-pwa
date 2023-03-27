import { persist, PersistOptions } from 'zustand/middleware'
import { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla'

type DeferredPersistOptions<
  S extends object,
  PersistedState = S
> = PersistOptions<S, PersistedState> & {
  hydrateOnResolve: Promise<void>
}

export function deferredPersist<
  S extends object,
  PersistedState = S,
  CustomSetState extends [StoreMutatorIdentifier, unknown][] = [
    StoreMutatorIdentifier,
    unknown
  ][],
  CustomGetState extends [StoreMutatorIdentifier, unknown][] = [
    StoreMutatorIdentifier,
    unknown
  ][]
>(
  config: StateCreator<
    S,
    [...CustomSetState, ['zustand/persist', unknown]],
    CustomGetState,
    S
  >,
  deferredOptions: DeferredPersistOptions<S, PersistedState>
) {
  const { hydrateOnResolve, storage } = deferredOptions

  const options: PersistOptions<S, PersistedState> = {
    ...deferredOptions,
    storage: storage
      ? {
          setItem: async (...args) =>
            hydrateOnResolve.then(() => storage.setItem(...args)),
          getItem: async (...args) =>
            hydrateOnResolve.then(() => storage.getItem(...args)),
          removeItem: async (...args) =>
            hydrateOnResolve.then(() => storage.removeItem(...args)),
        }
      : undefined,
  }

  // INFO: Unfortunately I wasted too much time here
  // @ts-ignore
  return persist<S, CustomSetState, CustomGetState>(config, options)
}

import localForage from 'localforage'
import * as memoryDriver from 'localforage-driver-memory'
import { StorageValue } from 'zustand/middleware'

import { ISongsState } from './interfaces'

localForage.defineDriver(memoryDriver)

localForage.config({
  name: 'Music App PWA',
  storeName: 'songs DB',
  driver: [localForage.INDEXEDDB, memoryDriver._driver],
})

export const SongsAsyncPersistStorage = {
  getItem: async (key: string) => {
    const state = await localForage.getItem<Pick<ISongsState, 'songs'>>(key)

    if (!state) return null

    return { state }
  },
  setItem: async (
    key: string,
    { state }: StorageValue<Pick<ISongsState, 'songs'>>
  ) => {
    await localForage.setItem(key, state)
  },
  removeItem: async (key: string) => {
    await localForage.removeItem(key)
  },
}

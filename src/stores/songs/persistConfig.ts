import localforage from 'localforage'
import { StorageValue } from 'zustand/middleware'

import { ISongsState } from './interfaces'

localforage.config({
  name: 'Music App PWA',
  storeName: 'songs DB',
  driver: localforage.INDEXEDDB,
})

export const SongsAsyncPersistStorage = {
  getItem: async (key: string) => {
    const state = await localforage.getItem<Pick<ISongsState, 'songs'>>(key)

    if (!state) return null

    return { state }
  },
  setItem: async (
    key: string,
    { state }: StorageValue<Pick<ISongsState, 'songs'>>
  ) => {
    await localforage.setItem(key, state)
  },
  removeItem: async (key: string) => {
    await localforage.removeItem(key)
  },
}

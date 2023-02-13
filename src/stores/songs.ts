import { create } from 'zustand'
import localforage from 'localforage'
import { RcFile } from 'antd/es/upload'
import {
  /* createJSONStorage, persist, */ StateStorage,
} from 'zustand/middleware'

localforage.config({
  name: 'Music App PWA',
  storeName: 'songs DB',
})

export default class SongsAsyncPersistStorage implements StateStorage {
  getItem = (key: string) => {
    // TODO: I'm lying here - it's probably Array<ISongFile>
    return localforage.getItem<string>(key)
  }

  setItem = (key: string, value: any) => {
    return localforage.setItem(key, value)
  }

  removeItem = (key: string) => {
    return localforage.removeItem(key)
  }
}

interface ISongFile {
  file: RcFile
  objectUrl: string
}

interface ISongsState {
  songs: Array<ISongFile>
  addSong: (song: RcFile) => void
  deleteSong: (id: string) => void
  // _hasHydrated: boolean
  // _setHasHydrated: (value: boolean) => void
}

export const useSongsStore = create<ISongsState>()(
  // persist(
  (set) => ({
    songs: [],
    addSong: (song) =>
      set((state) => {
        return {
          songs: [
            ...state.songs,
            {
              file: song,
              objectUrl: URL.createObjectURL(song),
            },
          ],
        }
      }),
    deleteSong: (id) => {
      console.log({ id })
    },
    // hydration
    // _hasHydrated: false,
    // _setHasHydrated: (state) => {
    //   set({
    //     _hasHydrated: state,
    //   })
    // },
  })
  // {
  //   name: 'songs-state',
  //   onRehydrateStorage: () => (state) => {
  //     console.log('rehydrate songs store')
  //     state?._setHasHydrated(true)
  //   },
  //   storage: createJSONStorage(() => new SongsAsyncPersistStorage()),
  // }
  // )
)

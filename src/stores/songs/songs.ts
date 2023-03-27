import { create } from 'zustand'
import * as mm from 'music-metadata-browser'
import { v4 as uuidv4 } from 'uuid'

import { deferredPersist } from '../defferedHydrationStore'

import { ISongsState, SongId } from './interfaces'
import { SongsAsyncPersistStorage } from './persistConfig'

export let hydrateStore:
  | ((value: void | PromiseLike<void>) => void)
  | undefined = undefined

export const useSongsStore = create<ISongsState>()(
  deferredPersist<ISongsState, Pick<ISongsState, 'songs'>>(
    (set) => ({
      songs: [],
      addSong: async (newSong) => {
        const metaData = await mm.parseBlob(newSong)

        set((state) => {
          if (state.songs.find((song) => song.file.name === newSong.name)) {
            console.error('Duplicate!')

            return { songs: state.songs }
          }

          return {
            songs: [
              ...state.songs,
              {
                id: uuidv4() as SongId,
                file: newSong,
                metaData,
              },
            ],
          }
        })
      },

      deleteSong: (id) =>
        set((state) => {
          return {
            songs: state.songs.filter((song) => song.id !== id),
          }
        }),

      _hasHydrated: false,
      _setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        })
      },
    }),
    {
      name: 'songs-state',
      onRehydrateStorage: () => (state) => {
        console.log('rehydrate songs store')
        state?._setHasHydrated(true)
      },
      storage: SongsAsyncPersistStorage,
      partialize: (state) => ({ songs: state.songs }),
      hydrateOnResolve: new Promise(function (resolve) {
        console.log('assign resolve to hydrateOnResolve')
        hydrateStore = resolve
      }),
    }
  )
)

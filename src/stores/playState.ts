import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type RepeatMode = 'off' | 'one'

interface IPlayState {
  id: string | null
  isShuffleEnabled: boolean
  repeatMode: RepeatMode
  selectSong: (songId: string) => void
  getIsSelected: (songId: string) => boolean
  toggleShuffle: () => void
  setRepeatMode: (mode: RepeatMode) => void
  toggleRepeatMode: () => void
  // isAnySelected: boolean
}

export const usePlayState = create<IPlayState>()(
  devtools((set, get) => ({
    id: null,
    isShuffleEnabled: false,
    repeatMode: 'off',
    selectSong: (songId) =>
      set(() => {
        return {
          id: songId,
        }
      }),
    getIsSelected: (songId) => get().id === songId,
    toggleShuffle: () =>
      set(() => {
        return {
          isShuffleEnabled: !get().isShuffleEnabled,
        }
      }),
    setRepeatMode: (mode) =>
      set(() => {
        return {
          repeatMode: mode,
        }
      }),
    toggleRepeatMode: () =>
      set((state) => {
        if (state.repeatMode === 'off') {
          return {
            repeatMode: 'one',
          }
        }

        return {
          repeatMode: 'off',
        }
      }),
    // isAnySelected: Boolean(get().id),
  }))
)

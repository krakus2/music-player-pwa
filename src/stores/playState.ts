import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IPlayState {
  id: string | null
  isShuffleEnabled: boolean
  repeatMode: 'off' | 'one'
  selectSong: (songId: string) => void
  getIsSelected: (songId: string) => boolean
  toggleShuffle: () => void
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
    // isAnySelected: Boolean(get().id),
  }))
)

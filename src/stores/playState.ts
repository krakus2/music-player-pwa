import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IPlayState {
  id: string | null
  selectSong: (songId: string) => void
  getIsSelected: (songId: string) => boolean
  // isAnySelected: boolean
}

export const usePlayState = create<IPlayState>()(
  devtools((set, get) => ({
    id: null,
    selectSong: (songId) =>
      set(() => {
        return {
          id: songId,
        }
      }),
    getIsSelected: (songId) => get().id === songId,
    // isAnySelected: Boolean(get().id),
  }))
)

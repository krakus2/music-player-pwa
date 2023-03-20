import { usePlayState } from 'src/stores/playState'
import { useSongsStore } from 'src/stores/songs'

export const useSongDerivatives = () => {
  const { songs } = useSongsStore(({ songs, addSong, deleteSong }) => ({
    songs,
    addSong,
    deleteSong,
  }))

  const { id, selectSong } = usePlayState(({ id, selectSong }) => ({
    id,
    selectSong,
  }))

  const selectedSong = songs.find((song) => song.id === id)
  const selectedSongIndex = songs.findIndex((song) => song.id === id)
  const firstSongId = songs.map((song) => song.id)[0]

  const playNextSong = () => {
    const nextSong = songs[selectedSongIndex + 1]

    if (!nextSong) return selectSong(firstSongId)

    selectSong(nextSong.id)
  }

  const playPreviousSong = () => {
    const previousSong = songs[selectedSongIndex - 1]

    if (!previousSong) return selectSong(firstSongId)

    selectSong(previousSong.id)
  }

  return {
    selectedSong,
    playNextSong,
    playPreviousSong,
  }
}

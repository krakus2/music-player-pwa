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

  const selectedSong = songs.find((song) => song.file.uid === id)
  const selectedSongIndex = songs.findIndex((song) => song.file.uid === id)
  const firstSongId = songs.map((song) => song.file.uid)[0]

  const playNextSong = () => {
    const nextSong = songs[selectedSongIndex + 1]

    if (!nextSong) return selectSong(firstSongId)

    selectSong(nextSong.file.uid)
  }

  const playPreviousSong = () => {
    const previousSong = songs[selectedSongIndex - 1]

    if (!previousSong) return selectSong(firstSongId)

    selectSong(previousSong.file.uid)
  }

  return {
    selectedSong,
    playNextSong,
    playPreviousSong,
  }
}

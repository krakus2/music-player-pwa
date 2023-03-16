import { sample } from 'lodash'

import { usePlayState } from 'src/stores/playState'
import { useSongsStore } from 'src/stores/songs'

export const useSongDerivatives = () => {
  const { songs } = useSongsStore(({ songs, addSong, deleteSong }) => ({
    songs,
    addSong,
    deleteSong,
  }))

  const { id, selectSong, isShuffleEnabled, repeatMode, setRepeatMode } =
    usePlayState(
      ({ id, selectSong, isShuffleEnabled, repeatMode, setRepeatMode }) => ({
        id,
        selectSong,
        isShuffleEnabled,
        repeatMode,
        setRepeatMode,
      })
    )

  const selectedSong = songs.find((song) => song.file.uid === id)
  const selectedSongIndex = songs.findIndex((song) => song.file.uid === id)

  const songsIds = songs.map((song) => song.file.uid)
  const firstSongId = songsIds[0]
  const songsIdsWithoutCurrentlyPlaying = songsIds.filter(
    (songId) => songId !== selectedSong?.file.uid
  )

  const randomShuffleSongId =
    songsIdsWithoutCurrentlyPlaying.length > 1
      ? sample(songsIdsWithoutCurrentlyPlaying)
      : selectedSong?.file.uid

  const playNextSong = () => {
    console.log('playNextSong')

    if (repeatMode === 'one') {
      setRepeatMode('off')
    }

    if (isShuffleEnabled) {
      if (!randomShuffleSongId)
        throw new Error('randomShuffleSongId not available')

      return selectSong(randomShuffleSongId)
    }

    const nextSong = songs[selectedSongIndex + 1]

    if (!nextSong) return selectSong(firstSongId)

    selectSong(nextSong.file.uid)
  }

  const playPreviousSong = () => {
    if (isShuffleEnabled) {
      if (!randomShuffleSongId)
        throw new Error('randomShuffleSongId not available')

      return selectSong(randomShuffleSongId)
    }

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

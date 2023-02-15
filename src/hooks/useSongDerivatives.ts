import { sample } from 'lodash'

import { usePlayState } from 'src/stores/playState'
import { useSongsStore } from 'src/stores/songs'

export const useSongDerivatives = () => {
  const { songs } = useSongsStore(({ songs, addSong, deleteSong }) => ({
    songs,
    addSong,
    deleteSong,
  }))

  const { id, selectSong, isShuffleEnabled } = usePlayState(
    ({ id, selectSong, isShuffleEnabled }) => ({
      id,
      selectSong,
      isShuffleEnabled,
    })
  )

  const selectedSong = songs.find((song) => song.file.uid === id)
  const selectedSongIndex = songs.findIndex((song) => song.file.uid === id)

  const songsIds = songs.map((song) => song.file.uid)
  const firstSongId = songsIds[0]
  const songsIdsWithoutCurrentlyPlaying = songsIds.filter(
    (songId) => songId !== selectedSong?.file.uid
  )

  const randomShuffleSongId = sample(songsIdsWithoutCurrentlyPlaying)

  const nextSongIndex = selectedSongIndex + 1
  const nextSong = songs[nextSongIndex]
  const previousSongIndex = selectedSongIndex - 1
  const previousSong = songs[previousSongIndex]

  const playNextSong = () => {
    if (isShuffleEnabled) {
      if (!randomShuffleSongId)
        throw new Error('randomShuffleSongId not available')

      return selectSong(randomShuffleSongId)
    }

    if (!nextSong) return selectSong(firstSongId)

    selectSong(nextSong.file.uid)
  }

  const playPreviousSong = () => {
    if (isShuffleEnabled) {
      if (!randomShuffleSongId)
        throw new Error('randomShuffleSongId not available')

      return selectSong(randomShuffleSongId)
    }

    if (!previousSong) return selectSong(firstSongId)

    selectSong(previousSong.file.uid)
  }

  return {
    selectedSong,
    playNextSong,
    playPreviousSong,
  }
}

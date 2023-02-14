import { HowlOptions } from 'howler'
import { createContext, ReactNode, useContext } from 'react'
import { AudioPlayerControls, useAudioPlayer } from 'react-use-audio-player'
import { usePlayState } from 'src/stores/playState'
import { useSongsStore } from 'src/stores/songs'

export const AudioPlayerContext = createContext<
  AudioPlayerControls | undefined
>(undefined)

export const AudioPlayerContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
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

  const playerOptions = !!selectedSong
    ? ({
        src: selectedSong.objectUrl,
        // format: [selectedSong.file.type],
        format: ['mp3'],
        autoplay: true,
        onend: () => {
          const currentSongIndex = songs.findIndex(
            (song) => song.file.uid === id
          )
          const nextSongIndex = currentSongIndex + 1
          const nextSong = songs[nextSongIndex]

          if (!!nextSong) {
            selectSong(nextSong.file.uid)
          }
        },
      } as HowlOptions)
    : undefined

  console.log({ selectedSong, songs, id, playerOptions })

  const audioPlayer = useAudioPlayer(playerOptions)

  return (
    <AudioPlayerContext.Provider value={audioPlayer}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const useAudioPlayerContext = () => {
  const audioPlayerContext = useContext(AudioPlayerContext)

  if (!audioPlayerContext) {
    throw new Error('Component beyond audioPlayerContext!')
  }

  return audioPlayerContext
}

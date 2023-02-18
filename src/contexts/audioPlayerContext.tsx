import { HowlOptions } from 'howler'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { AudioPlayerControls, useAudioPlayer } from 'react-use-audio-player'

import { useSongDerivatives } from 'src/hooks/useSongDerivatives'
import { usePlayState } from 'src/stores/playState'

export const AudioPlayerContext = createContext<
  AudioPlayerControls | undefined
>(undefined)

export const AudioPlayerContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { repeatMode } = usePlayState(({ repeatMode }) => ({
    repeatMode,
  }))
  const { selectedSong, playNextSong } = useSongDerivatives()

  const playerOptions = !!selectedSong
    ? ({
        src: selectedSong.objectUrl,
        // TODO: Add some automated way to detect the format from the file
        // format: [selectedSong.file.type],
        format: ['mp3'],
        autoplay: true,
        onend: () => {
          console.log('END')
          if (repeatMode === 'off') {
            playNextSong()
          }
        },
      } as HowlOptions)
    : undefined

  const audioPlayer = useAudioPlayer(playerOptions)

  useEffect(() => {
    if (repeatMode === 'one') {
      audioPlayer.player?.loop(true)
      audioPlayer.player?.off('end')
    } else {
      audioPlayer.player?.loop(false)
      audioPlayer.player?.on('end', playNextSong)
    }
  }, [repeatMode])

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

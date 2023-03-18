import { HowlOptions } from 'howler'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { AudioPlayerControls, useAudioPlayer } from 'react-use-audio-player'

import { useSongDerivatives } from 'src/hooks/useSongDerivatives'

export const AudioPlayerContext = createContext<
  AudioPlayerControls | undefined
>(undefined)

export const AudioPlayerContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { selectedSong, playNextSong } = useSongDerivatives()

  const playerOptions = useMemo<HowlOptions | undefined>(() => {
    if (!selectedSong) return undefined

    const src = URL.createObjectURL(selectedSong.file)

    return {
      src,
      // TODO: Add some automated way to detect the format from the file
      // format: [selectedSong.file.type],
      format: ['mp3'],
      autoplay: true,
      onend: () => {
        playNextSong()
        URL.revokeObjectURL(src)
      },
    } as HowlOptions
  }, [selectedSong])

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

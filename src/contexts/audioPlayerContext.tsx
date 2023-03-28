import { HowlOptions } from 'howler'
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react'
import { AudioPlayerControls, useAudioPlayer } from 'react-use-audio-player'

import { useSongDerivatives } from 'src/hooks/useSongDerivatives'
import { createSongCover } from 'src/utils/createSongCover'
import { getSongTitle } from 'src/utils/getSongTitle'

export const AudioPlayerContext = createContext<
  AudioPlayerControls | undefined
>(undefined)

export const AudioPlayerContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { selectedSong, playNextSong, playPreviousSong } = useSongDerivatives()

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

  useEffect(() => {
    console.log('MEDIA 1', { selectedSong })
    if (!selectedSong) return

    const title = getSongTitle(selectedSong)
    const picture = createSongCover(selectedSong)

    const { album = 'Unknown', artist = 'Unknown' } =
      selectedSong.metaData.common ?? {}

    console.log('MEDIA 2', { title, album, artist, picture })

    const metaData = new window.MediaMetadata({
      title,
      artist,
      album,
      ...(picture && {
        artwork: [
          {
            src: picture,
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: picture,
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: picture,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: picture,
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: picture,
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: picture,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      }),
    })

    console.log('MEDIA 2', {
      metaData,
      window: window.navigator.mediaSession.metadata,
    })

    window.navigator.mediaSession.metadata = metaData

    window.navigator.mediaSession.setActionHandler(
      'previoustrack',
      playPreviousSong
    )

    window.navigator.mediaSession.setActionHandler('nexttrack', playNextSong)

    window.navigator.mediaSession.setActionHandler('play', () =>
      audioPlayer.play()
    )

    window.navigator.mediaSession.setActionHandler('pause', () =>
      audioPlayer.pause()
    )

    window.navigator.mediaSession.setActionHandler('stop', () =>
      audioPlayer.stop()
    )
  }, [selectedSong])

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

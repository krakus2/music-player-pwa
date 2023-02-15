import { Inter } from '@next/font/google'
import {
  PlayCircleFilled,
  PauseCircleFilled,
  FastForwardFilled,
  FastBackwardFilled,
} from '@ant-design/icons'
import { Button } from 'antd'
import { FaRandom } from 'react-icons/fa'

import styles from 'src/styles/Home.module.css'
import { useSongsStore } from 'src/stores/songs'
import { Head } from 'src/components/Head'
import { usePlayState } from 'src/stores/playState'
import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { AddSong } from 'src/components/AddSong'
import { useSongDerivatives } from 'src/hooks/useSongDerivatives'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { togglePlayPause, playing, ready } = useAudioPlayerContext()
  const { playNextSong, playPreviousSong } = useSongDerivatives()

  const { songs } = useSongsStore(({ songs }) => ({
    songs,
  }))

  const { selectSong, getIsSelected, isShuffleEnabled, toggleShuffle } =
    usePlayState(
      ({ selectSong, getIsSelected, id, isShuffleEnabled, toggleShuffle }) => ({
        selectSong,
        getIsSelected,
        id,
        isShuffleEnabled,
        toggleShuffle,
      })
    )

  return (
    <>
      <Head />
      <main className={styles.main}>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-bold underline mb-10'>Music player</h1>

          <AddSong />
          <div>
            <h1>Songs:</h1>
            <div className='flex flex-col gap-1'>
              {songs.map((song) => {
                // TODO: Probably should be moved to the context
                // TODO: Better naming to suggest that it's in regard to specific song
                const isSelected = getIsSelected(song.file.uid)
                const isPlaying = isSelected && playing

                return (
                  <div
                    className='flex items-center justify-between'
                    key={song.file.uid}
                  >
                    <p>{song.file.name}</p>
                    <Button
                      type='default'
                      shape='round'
                      icon={
                        isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />
                      }
                      size='large'
                      onClick={() => {
                        if (isSelected) {
                          return togglePlayPause()
                        }

                        selectSong(song.file.uid)
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          {ready && (
            <div>
              Audio controls:
              <div className='flex gap-1 justify-between'>
                <Button
                  type='default'
                  {...(isShuffleEnabled && { danger: true })}
                  shape='round'
                  size='large'
                  icon={<FaRandom />}
                  onClick={toggleShuffle}
                />
                <Button
                  type='default'
                  shape='round'
                  size='large'
                  icon={<FastBackwardFilled />}
                  onClick={playPreviousSong}
                />
                <Button
                  type='default'
                  shape='round'
                  size='large'
                  icon={playing ? <PauseCircleFilled /> : <PlayCircleFilled />}
                  onClick={togglePlayPause}
                />
                <Button
                  type='default'
                  shape='round'
                  size='large'
                  icon={<FastForwardFilled />}
                  onClick={playNextSong}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

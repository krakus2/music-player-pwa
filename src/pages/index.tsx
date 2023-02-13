import { Inter } from '@next/font/google'

import styles from 'src/styles/Home.module.css'
import { useSongsStore } from 'src/stores/songs'
import { Head } from 'src/components/Head'
import { usePlayState } from 'src/stores/playState'
import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { AddSong } from 'src/components/AddSong'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { togglePlayPause, playing } = useAudioPlayerContext()

  const { songs } = useSongsStore(({ songs }) => ({
    songs,
  }))

  const { selectSong, getIsSelected } = usePlayState(
    ({ selectSong, getIsSelected }) => ({
      selectSong,
      getIsSelected,
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
            {songs.map((song) => {
              // TODO: Probably should be moved to the context
              // TODO: Better naming to suggest that it's in regard to specific song
              const isSelected = getIsSelected(song.file.uid)
              const isPlaying = isSelected && playing

              return (
                <div className='flex gap-8' key={song.file.uid}>
                  <p>{song.file.name}</p>
                  <button
                    onClick={() => {
                      if (isSelected) {
                        return togglePlayPause()
                      }

                      selectSong(song.file.uid)
                    }}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

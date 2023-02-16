import { Inter } from '@next/font/google'

import styles from 'src/styles/Home.module.css'
import { Head } from 'src/components/Head'
import { AddSong } from 'src/components/AddSong'
import { SongList } from 'src/components/SongList'
import { AudioControls } from 'src/components/AudioControls'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head />
      <main className={styles.main}>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-bold underline mb-10'>Music player</h1>

          <AddSong />
          <SongList />
          <AudioControls />
        </div>
      </main>
    </>
  )
}

import { Inter } from '@next/font/google'

import styles from 'src/styles/Home.module.css'
import { Head } from 'src/components/Head'
import { AddSong } from 'src/components/AddSong'
import { SongList } from 'src/components/SongList'
import { AudioControls } from 'src/components/AudioControls'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head />
      <main className={styles.main}>
        <div className='flex flex-col gap-2 max-w-[600px]'>
          <h1 className='text-3xl font-bold underline mb-10 text-center'>
            Music player
          </h1>
          <div className='flex justify-end'>
            <AddSong />
          </div>

          <SongList />
          <AudioControls />
        </div>
      </main>
    </>
  )
}

// export default dynamic(() => Promise.resolve(HomeComponent), { ssr: false })

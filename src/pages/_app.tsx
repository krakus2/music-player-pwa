import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'

import { AudioPlayerContextProvider } from 'src/contexts/audioPlayerContext'
import { hydrateStore } from 'src/stores/songs'

import 'src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (hydrateStore) {
      console.log('effect hydrate')
      hydrateStore()
    }
  }, [])

  return (
    <AudioPlayerProvider>
      <AudioPlayerContextProvider>
        <Component {...pageProps} />
      </AudioPlayerContextProvider>
    </AudioPlayerProvider>
  )
}

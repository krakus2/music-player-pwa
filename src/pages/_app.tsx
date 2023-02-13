import type { AppProps } from 'next/app'
import { AudioPlayerProvider } from 'react-use-audio-player'

import { AudioPlayerContextProvider } from 'src/contexts/audioPlayerContext'

import 'src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AudioPlayerProvider>
      <AudioPlayerContextProvider>
        <Component {...pageProps} />
      </AudioPlayerContextProvider>
    </AudioPlayerProvider>
  )
}

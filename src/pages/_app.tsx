import type { AppProps } from 'next/app'
import { AudioPlayerProvider } from 'react-use-audio-player'

import 'src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AudioPlayerProvider>
      <Component {...pageProps} />
    </AudioPlayerProvider>
  )
}

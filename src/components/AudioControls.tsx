import {
  PlayCircleFilled,
  PauseCircleFilled,
  FastForwardFilled,
  FastBackwardFilled,
} from '@ant-design/icons'
import { Button } from 'antd'

import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { useSongDerivatives } from 'src/hooks/useSongDerivatives'

import { ProgressBar } from './ProgressBar'

export const AudioControls = () => {
  const { togglePlayPause, playing, ready, loading } = useAudioPlayerContext()
  const { playNextSong, playPreviousSong, selectedSong } = useSongDerivatives()

  const playerNotReady = !selectedSong || !(ready || loading)

  if (playerNotReady) return null

  const title = selectedSong.file.name.split('.')[0] ?? 'No title'

  return (
    <div className='mt-4'>
      <p>{title}</p>
      <ProgressBar />
      <div className='flex gap-1 justify-between'>
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
          onClick={() => playNextSong()}
        />
      </div>
    </div>
  )
}

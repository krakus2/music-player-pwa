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
  const songCover = selectedSong.metaData.common.picture?.[0]

  return (
    <div className='mt-4'>
      <div className='flex gap-3 mb-1'>
        {!!songCover && (
          <img
            width={100}
            height={100}
            src={URL.createObjectURL(
              new Blob([songCover.data.buffer], { type: songCover.format })
            )}
          />
        )}
        <div className='self-end'>
          <p>{title}</p>
        </div>
      </div>
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

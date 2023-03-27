import {
  PlayCircleFilled,
  PauseCircleFilled,
  FastForwardFilled,
  FastBackwardFilled,
} from '@ant-design/icons'
import { Button, Rate } from 'antd'

import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { useSongDerivatives } from 'src/hooks/useSongDerivatives'

import { ProgressBar } from './components'
import { useRating } from './useRating'
import { vibrate } from './vibrate'

export const AudioControls = () => {
  const { togglePlayPause, playing, ready, loading } = useAudioPlayerContext()
  const { playNextSong, playPreviousSong, selectedSong } = useSongDerivatives()

  const playerNotReady = !selectedSong || !(ready || loading)

  const songId = selectedSong?.id

  const { rating, isLoading } = useRating(songId)

  if (playerNotReady) return null

  const title = selectedSong.file.name.split('.')[0] ?? 'No title'
  const songCover = selectedSong.metaData.common.picture?.[0]

  const handleClickWithVibration = (callback: () => void) => () => {
    vibrate()
    callback()
  }

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
      {!isLoading && rating && (
        <div className='flex items-center gap-1'>
          <Rate disabled defaultValue={rating} />
          <span>({rating})</span>
        </div>
      )}

      <ProgressBar />
      <div className='flex gap-1 justify-between'>
        <Button
          type='default'
          shape='round'
          size='large'
          icon={<FastBackwardFilled />}
          onClick={handleClickWithVibration(playPreviousSong)}
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

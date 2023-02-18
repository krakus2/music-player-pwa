import {
  PlayCircleFilled,
  PauseCircleFilled,
  FastForwardFilled,
  FastBackwardFilled,
} from '@ant-design/icons'
import { Button } from 'antd'
import { FaRandom } from 'react-icons/fa'
import { RiRepeat2Fill, RiRepeatOneFill } from 'react-icons/ri'

import { usePlayState } from 'src/stores/playState'
import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { useSongDerivatives } from 'src/hooks/useSongDerivatives'

import { ProgressBar } from './ProgressBar'

export const AudioControls = () => {
  const { togglePlayPause, playing, ready, loading } = useAudioPlayerContext()
  const { playNextSong, playPreviousSong, selectedSong } = useSongDerivatives()

  const { isShuffleEnabled, toggleShuffle, repeatMode, toggleRepeatMode } =
    usePlayState(
      ({
        id,
        isShuffleEnabled,
        toggleShuffle,
        repeatMode,
        toggleRepeatMode,
      }) => ({
        id,
        isShuffleEnabled,
        toggleShuffle,
        repeatMode,
        toggleRepeatMode,
      })
    )

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
          onClick={() => playNextSong()}
        />
        <Button
          type='default'
          shape='round'
          size='large'
          icon={(() => {
            if (repeatMode === 'off') return <RiRepeat2Fill />
            if (repeatMode === 'one') return <RiRepeatOneFill />

            return null
          })()}
          onClick={toggleRepeatMode}
        />
      </div>
    </div>
  )
}

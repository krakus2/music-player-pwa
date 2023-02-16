import {
  PlayCircleFilled,
  PauseCircleFilled,
  FastForwardFilled,
  FastBackwardFilled,
} from '@ant-design/icons'
import { Button } from 'antd'
import { FaRandom } from 'react-icons/fa'

import { usePlayState } from 'src/stores/playState'
import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { useSongDerivatives } from 'src/hooks/useSongDerivatives'
import { getMinutesFromSeconds } from 'src/utils/getMinutesFromSeconds'

export const AudioControls = () => {
  const { togglePlayPause, playing, ready, duration, ...rest } =
    useAudioPlayerContext()
  const { playNextSong, playPreviousSong } = useSongDerivatives()

  const { isShuffleEnabled, toggleShuffle } = usePlayState(
    ({ id, isShuffleEnabled, toggleShuffle }) => ({
      id,
      isShuffleEnabled,
      toggleShuffle,
    })
  )

  console.log(rest.player?.seek())

  if (!ready) return null

  return (
    <div>
      <p>{getMinutesFromSeconds(duration)}</p>
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
          onClick={playNextSong}
        />
      </div>
    </div>
  )
}

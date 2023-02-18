import { Progress } from 'antd'
import { useAudioPosition } from 'react-use-audio-player'

import { getMinutesFromSeconds } from 'src/utils/getMinutesFromSeconds'

interface ProgressBarProps {
  currentProgress: number | null | undefined
  totalDuration: number
}

export const ProgressBar = () => {
  const { percentComplete, position, duration } = useAudioPosition()

  return (
    <div>
      <div className='flex justify-between'>
        <p>{getMinutesFromSeconds(position)}</p>
        <p>{getMinutesFromSeconds(duration)}</p>
      </div>
      <Progress percent={percentComplete} showInfo={false} />
    </div>
  )
}

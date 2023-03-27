import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'

import { useSongsStore } from 'src/stores/songs'
import { usePlayState } from 'src/stores/playState'
import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'
import { getMinutesFromSeconds } from 'src/utils/getMinutesFromSeconds'
import { withVibration } from 'src/utils/vibrate'

export const SongList = () => {
  const { togglePlayPause, playing, stop } = useAudioPlayerContext()

  const { songs, deleteSong } = useSongsStore(({ songs, deleteSong }) => ({
    songs,
    deleteSong,
  }))

  const { selectSong, getIsSelected } = usePlayState(
    ({ selectSong, getIsSelected }) => ({
      selectSong,
      getIsSelected,
    })
  )

  return (
    <div>
      <h1>Songs:</h1>
      <div className='flex flex-col gap-1 mt-4'>
        {songs.map((song) => {
          // TODO: Probably should be moved to the context
          // TODO: Better naming to suggest that it's in regard to specific song
          const isSelected = getIsSelected(song.id)
          const isPlaying = isSelected && playing

          return (
            <div
              className='flex items-center justify-between gap-3'
              key={song.id}
            >
              <div className='flex items-center gap-2'>
                <Button
                  type='default'
                  shape='round'
                  icon={
                    isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
                  }
                  size='large'
                  onClick={withVibration(() => {
                    if (isSelected) {
                      return togglePlayPause()
                    }

                    selectSong(song.id)
                  })}
                />
                <span>{song.file.name}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>
                  {getMinutesFromSeconds(song.metaData.format.duration)}
                </span>
                <Button
                  type='default'
                  shape='round'
                  icon={<DeleteOutlined />}
                  size='large'
                  onClick={() => {
                    stop()
                    deleteSong(song.id)
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

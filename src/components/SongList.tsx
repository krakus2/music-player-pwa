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

export const SongList = () => {
  const { togglePlayPause, playing } = useAudioPlayerContext()

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
      <div className='flex flex-col gap-1'>
        {songs.map((song) => {
          // TODO: Probably should be moved to the context
          // TODO: Better naming to suggest that it's in regard to specific song
          const isSelected = getIsSelected(song.file.uid)
          const isPlaying = isSelected && playing

          return (
            <div
              className='flex items-center justify-between gap-3'
              key={song.file.uid}
            >
              <div className='flex items-center gap-1'>
                <Button
                  type='default'
                  shape='round'
                  icon={
                    isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
                  }
                  size='large'
                  onClick={() => {
                    if (isSelected) {
                      return togglePlayPause()
                    }

                    selectSong(song.file.uid)
                  }}
                />
                <span>{song.file.name}</span>
              </div>
              <div className='flex items-center gap-1'>
                <span>{getMinutesFromSeconds(song.props.duration)}</span>
                <Button
                  type='default'
                  shape='round'
                  icon={<DeleteOutlined />}
                  size='large'
                  onClick={() => deleteSong(song.file.uid)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

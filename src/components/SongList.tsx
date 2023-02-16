import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons'
import { Button } from 'antd'

import { useSongsStore } from 'src/stores/songs'
import { usePlayState } from 'src/stores/playState'
import { useAudioPlayerContext } from 'src/contexts/audioPlayerContext'

export const SongList = () => {
  const { togglePlayPause, playing } = useAudioPlayerContext()

  const { songs } = useSongsStore(({ songs }) => ({
    songs,
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
              className='flex items-center justify-between'
              key={song.file.uid}
            >
              <p>{song.file.name}</p>
              <Button
                type='default'
                shape='round'
                icon={isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
                size='large'
                onClick={() => {
                  if (isSelected) {
                    return togglePlayPause()
                  }

                  selectSong(song.file.uid)
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

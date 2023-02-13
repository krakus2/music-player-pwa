import { Button, Upload, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useSongsStore } from 'src/stores/songs'

export const AddSong = () => {
  const { addSong } = useSongsStore(({ addSong }) => ({
    addSong,
  }))

  const addSongProps: UploadProps = {
    accept: 'audio/mpeg3',
    name: 'addSong',
    showUploadList: false,
    // TODO: Only for convenience, change later
    multiple: false,
    beforeUpload(file) {
      addSong(file)

      return false
    },
  }

  return (
    <Upload {...addSongProps}>
      <Button
        style={{ display: 'flex', alignItems: 'center' }}
        icon={<PlusOutlined />}
      >
        Click to add song
      </Button>
    </Upload>
  )
}

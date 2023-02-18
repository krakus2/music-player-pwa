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
    multiple: true,
    beforeUpload(file) {
      addSong(file)

      return false
    },
  }

  return (
    <Upload {...addSongProps}>
      <Button style={{ display: 'flex', alignItems: 'center' }}>
        <PlusOutlined />
      </Button>
    </Upload>
  )
}

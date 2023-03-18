import { RcFile } from 'antd/es/upload'
import * as mm from 'music-metadata-browser'

export interface ISongFile {
  file: RcFile
  metaData: mm.IAudioMetadata
}

export interface ISongsState {
  songs: Array<ISongFile>
  addSong: (song: RcFile) => void
  deleteSong: (id: string) => void
  _hasHydrated: boolean
  _setHasHydrated: (value: boolean) => void
}

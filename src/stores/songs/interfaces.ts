import * as mm from 'music-metadata-browser'
import { Opaque } from 'type-fest'

export type SongId = Opaque<string, 'SongId'>

export interface ISongFile {
  id: SongId
  file: File
  metaData: mm.IAudioMetadata
}

export interface ISongsState {
  songs: Array<ISongFile>
  addSong: (song: File) => void
  deleteSong: (id: SongId) => void
  _hasHydrated: boolean
  _setHasHydrated: (value: boolean) => void
}

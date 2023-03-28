import { ISongFile } from 'src/stores/songs'

export const createSongCover = (song: ISongFile | undefined) => {
  const songCoverData = song?.metaData.common.picture?.[0]

  if (!songCoverData) return

  return URL.createObjectURL(
    new Blob([songCoverData.data.buffer], { type: songCoverData.format })
  )
}

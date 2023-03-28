import { ISongFile } from 'src/stores/songs'

export const getSongTitle = (song: ISongFile | undefined) =>
  song?.metaData.common.title ?? song?.file.name.split('.')[0] ?? 'No title'

import * as mm from 'music-metadata-browser'

export const getSongMetaData = (song: Blob) => mm.parseBlob(song)

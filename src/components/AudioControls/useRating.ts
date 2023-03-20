import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import { Product } from './types'

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const stableIds = new Map()

// if (typeof window !== undefined) {
//   // @ts-ignore
//   window.stableIds = stableIds
// }

const getStableValue = (id: string) => {
  if (stableIds.has(id)) {
    return stableIds.get(id)
  }

  const drawnStableId = randomIntFromInterval(1, 99)

  stableIds.set(id, drawnStableId)

  return drawnStableId
}

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export const useRating = (songId: string | undefined) => {
  const workerRef = useRef<Worker>()
  const [rating, setRating] = useState<number>()

  const isQueryEnabled = !!songId

  useEffect(() => {
    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) => {
      // alert(`WebWorker Response => ${event.data}`)
      setRating(event.data)
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const { data, ...query } = useSWR<Product>(
    isQueryEnabled
      ? `https://dummyjson.com/products/${getStableValue(songId)}`
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      onSuccess: (data) => {
        if (workerRef.current) {
          workerRef.current?.postMessage(data)
        }
      },
    }
  )

  return { ...query, rating }
}

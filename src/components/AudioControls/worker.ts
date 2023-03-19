import { Product } from './types'

addEventListener('message', (event: MessageEvent<Product>) => {
  postMessage(event.data.rating)
})

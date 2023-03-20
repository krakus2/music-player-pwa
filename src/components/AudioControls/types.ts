import { Opaque } from 'type-fest'

export type ProductId = Opaque<number, 'ProductId'>

// TODO: DTO?
export interface Product {
  id: ProductId
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

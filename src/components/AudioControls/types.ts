interface Branding<BrandT> {
  _type: BrandT
}
type Brand<T, BrandT> = T & Branding<BrandT>

export type ProductId = Brand<number, 'ProductId'>

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

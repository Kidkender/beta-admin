import type { ResMedia } from '@modules/media/response/media.response.ts'

export interface ResSlider {
  id: number
  title: string
  image: string
  link: string
  order: number
  isActive: boolean
  media: ResMedia[]
  createdAt: Date
  updatedAt: Date
}

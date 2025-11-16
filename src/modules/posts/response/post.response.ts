export interface ResPost {
  id: number // 1
  title: string // 'test'
  slug: string // 'test-1762405362484'
  summary: string // 'test'
  content: string // 'test'
  category: string // 'TIN_TUC'
  thumbnail: string // 'test'
  published: boolean // false
  publishedAt: string // null
  viewCount: number // 0
  media: ResPostMedia[]
  author: ResPostAuthor
  createdAt: string // '2025-11-06T05:02:42.514Z'
  updatedAt: string // '2025-11-08T01:54:51.468Z'
}

export interface ResPostMedia {
  id: number // 1
  fileName: string // 'land.png'
  url: string // 'http://localhost:3002/uploads/images/1762405362487-land.png'
  type: string // 'IMAGE'
  alt: string // null
  fileSize: number // 3108251
  mimeType: string // 'image/png'
  width: number // null
  height: number // null
}

export interface ResPostAuthor {
  id: number // 1
  fullName: string // string // 'admin'
  email: string // string // 'admin@123.com'
}

export interface ResCompanyInfo {
  id: number // 1
  key: string // 'string'
  title: string // 'string'
  content: string // 'string'
  image: string // 'string'
  order: number // 0
  isActive: boolean // true
  media: ResCompanyInfoMedia[]
  createdAt: string // '2025-11-18T17:33:01.172Z'
  updatedAt: string // '2025-11-18T17:33:01.172Z'
}

export interface ResCompanyInfoMedia {
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

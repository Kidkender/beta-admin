export interface ResMedia {
  id: number
  fileName: string
  url: string
  type: string //  MediaType
  alt: string
  fileSize: number
  mimeType: string
  width: number
  height: number
  createdAt: Date
  uploader: ResMediaUploader
}

export interface ResMediaUploader {
  id: number // 1
  fullName: string // string // 'admin'
  email: string // string // 'admin@123.com'
}

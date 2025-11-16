import { EnumResError } from '@core/enums/response.enum'

export interface PaginationType {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ResTypeSuccess<T = unknown> {
  success: boolean
  message: string
  data: T
}

export interface ResTypeError {
  success: boolean
  message: string
  errorCode: EnumResError
  errors: object
}

export type ResPaginationType<T> = {
  data: T[]
  pagination: PaginationType
}

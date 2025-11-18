import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQueryCompanyInfo = z.infer<typeof reqQueryCompanyInfosSchema>
export const reqQueryCompanyInfosSchema = schemaBaseQuery.extend({
  key: z.string().optional(),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
})

export type ReqCreateCompanyInfo = z.infer<typeof reqCreateCompanyInfoSchema>
export const reqCreateCompanyInfoSchema = z.object({
  key: z.string().optional(),
  title: z.string().min(1, { message: 'Vui lòng nhập tiêu đề' }),
  content: z.string().min(1, { message: 'Vui lòng nhập nội dung' }),
  image: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
  files: z.array(z.file()).optional(),
})

export type ReqUpdateCompanyInfo = z.infer<typeof reqUpdateCompanyInfoSchema>
export const reqUpdateCompanyInfoSchema = reqCreateCompanyInfoSchema.extend({
  id: z.string(),
})

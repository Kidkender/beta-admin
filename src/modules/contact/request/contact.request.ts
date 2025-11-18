import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQueryContact = z.infer<typeof reqQueryContactSchema>
export const reqQueryContactSchema = schemaBaseQuery.extend({
  status: z.string().optional(),
  search: z.string().optional(),
  subject: z.string().optional(),
  fromDate: z.iso.datetime().optional(),
  toDate: z.iso.datetime().optional(),
})

export type ReqCreateContact = z.infer<typeof reqCreateContactSchema>
export const reqCreateContactSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng nhập tiêu đề' }),
  status: z.string().optional(),
  email: z.email().min(1, { message: 'Vui lòng nhập email' }),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string().optional(),
})

export type ReqUpdateContact = z.infer<typeof reqUpdateContactSchema>
export const reqUpdateContactSchema = reqCreateContactSchema.extend({
  id: z.string(),
})

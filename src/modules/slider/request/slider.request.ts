import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQuerySlider = z.infer<typeof reqQuerySlidersSchema>
export const reqQuerySlidersSchema = schemaBaseQuery.extend({
  key: z.string().optional(),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
})

export type ReqCreateSlider = z.infer<typeof reqCreateSliderSchema>
export const reqCreateSliderSchema = z.object({
  title: z.string().min(1, { message: 'Vui lòng nhập tiêu đề' }),
  link: z.string().optional(),
  image: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
  files: z.array(z.file()).optional(),
})

export type ReqUpdateSlider = z.infer<typeof reqUpdateSliderSchema>
export const reqUpdateSliderSchema = reqCreateSliderSchema.extend({
  id: z.string(),
})

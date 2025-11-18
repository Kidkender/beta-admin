import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQuerySliders = z.infer<typeof reqQuerySlidersSchema>
export const reqQuerySlidersSchema = schemaBaseQuery.extend({
  isActive: z.boolean().optional(),
  search: z.string().optional(),
})

export type ReqCreateSlider = z.infer<typeof reqCreateSliderSchema>
export const reqCreateSliderSchema = z.object({
  title: z.string().optional(),
  image: z.string().optional(),
  link: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
})

export type ReqUpdateSlider = z.infer<typeof reqUpdateSliderSchema>
export const reqUpdateSliderSchema = reqCreateSliderSchema.extend({
  id: z.string(),
})

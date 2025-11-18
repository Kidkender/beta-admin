import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQueryMedias = z.infer<typeof reqQueryMediasSchema>
export const reqQueryMediasSchema = schemaBaseQuery.extend({
  type: z.string().optional(),
  uploadedBy: z.number().optional(),
  search: z.string().optional(),
})

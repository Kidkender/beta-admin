import { z } from 'zod'

export type ReqBaseQuery = z.infer<typeof schemaBaseQuery>
export const schemaBaseQuery = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
})

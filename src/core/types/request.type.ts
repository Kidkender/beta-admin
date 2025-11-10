import { z } from 'zod'

export const schemaBaseQuery = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
})

export type ReqBaseQuery = z.infer<typeof schemaBaseQuery>

import { z } from 'zod'

export type ReqBaseQuery = z.infer<typeof schemaBaseQuery>
export const schemaBaseQuery = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  sortBy: z.string().optional(),
})

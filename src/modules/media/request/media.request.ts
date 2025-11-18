import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQueryMedias = z.infer<typeof reqQueryMediasSchema>
export const reqQueryMediasSchema = schemaBaseQuery.extend({
  type: z.string().optional(),
  uploadedBy: z.number().optional(),
  search: z.string().optional(),
})

export type ReqUploadMultipleMedia = z.infer<typeof reqUploadMultipleMediaSchema>
export const reqUploadMultipleMediaSchema = z.object({ files: z.array(z.file()) })

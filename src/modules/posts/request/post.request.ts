import { schemaBaseQuery } from '@core/types/request.type'
import { z } from 'zod'

export type ReqQueryPosts = z.infer<typeof reqQueryPostsSchema>
export const reqQueryPostsSchema = schemaBaseQuery.extend({
  category: z.string().optional(),
  published: z.boolean().optional(),
  search: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  sortBy: z.string().optional(),
})

export type ReqCreatePost = z.infer<typeof reqCreatePostSchema>
export const reqCreatePostSchema = z.object({
  title: z.string().min(1, { message: 'Vui lòng nhập tiêu đề' }),
  summary: z.string().min(1, { message: 'Vui lòng nhập mô tả' }),
  content: z.string().min(1, { message: 'Vui lòng nhập nội dung' }),
  category: z.string().min(1, { message: 'Vui lòng chọn danh mục' }),
  thumbnail: z.string().optional(),
  published: z.boolean().optional(),
  files: z.array(z.file()).optional(),
})

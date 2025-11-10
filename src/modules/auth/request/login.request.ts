import { z } from 'zod'

export const schemaLogin = z.object({
  email: z.email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export type ReqLogin = z.infer<typeof schemaLogin>

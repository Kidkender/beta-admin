import useAuth from '@modules/auth/hooks/auth.hook.ts'
import { type ReactNode, useEffect } from 'react'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { onAuth } = useAuth()

  useEffect(onAuth, [])

  return children
}

import __ROUTE__ from '@constant/route.const.ts'
import useAuth from '@modules/auth/hooks/auth.hook.ts'
import { type ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const pathname = location.pathname

    const isAuthPage = __ROUTE__.AUTH.LOGIN === pathname

    // Chưa login mà không phải trang auth → bắt về login
    if (!isAuth && !isAuthPage) {
      navigate(__ROUTE__.AUTH.LOGIN, { replace: true })
      return
    }

    // Đã login mà còn lang thang ở trang login → đẩy về dashboard
    if (isAuth && isAuthPage) {
      navigate(__ROUTE__.DASHBOARD, { replace: true })
    }
  }, [isAuth, location.pathname, navigate])

  return children
}

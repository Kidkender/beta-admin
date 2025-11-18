// auth.hook.ts
import CONFIG_APP from '@configs/app.config.ts'
import __ROUTE__ from '@constant/route.const.ts'
import { showToastError, showToastSuccess } from '@core/components/toast.core.tsx'
import type { ReqLogin } from '@modules/auth/request/login.request.ts'
import { useLoginMutation } from '@modules/auth/services/auth.service.ts'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function useAuth() {
  const navigate = useNavigate()
  const [onLogin, { isLoading: isLoadingLogin }] = useLoginMutation()

  // 🔥 isAuth reactive theo token
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    const token = localStorage.getItem(CONFIG_APP.TOKEN.ACCESS_TOKEN)
    return !_.isEmpty(token)
  })

  const handleLogin = useCallback(
    async (data: ReqLogin) => {
      try {
        const res = await onLogin(data).unwrap()
        const accessToken = _.get(res, 'token')

        if (!accessToken) {
          throw new Error('Không nhận được token từ server')
        }

        localStorage.setItem(CONFIG_APP.TOKEN.ACCESS_TOKEN, accessToken)
        setIsAuth(true) // 🔥 cập nhật state

        navigate(__ROUTE__.DASHBOARD)
        showToastSuccess('Đăng nhập thành công')
      } catch (err) {
        // tuỳ API mà pick message cho đúng
        const message = _.get(err, 'data.message') ?? err.message ?? 'Đăng nhập thất bại'
        showToastError(message)
      }
    },
    [navigate, onLogin],
  )

  const handleLogout = useCallback(() => {
    localStorage.removeItem(CONFIG_APP.TOKEN.ACCESS_TOKEN)
    setIsAuth(false)
    navigate(__ROUTE__.AUTH.LOGIN)
  }, [navigate])

  // (optional) đồng bộ khi user login/logout ở tab khác
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONFIG_APP.TOKEN.ACCESS_TOKEN) {
        setIsAuth(!_.isEmpty(e.newValue))
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const onAuth = useCallback(() => {
    const redirectTo = isAuth ? __ROUTE__.DASHBOARD : __ROUTE__.AUTH.LOGIN
    navigate(redirectTo)
  }, [navigate, isAuth])

  return { isLoadingLogin, isAuth, handleLogin, handleLogout, onAuth }
}

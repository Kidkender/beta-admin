import CONFIG_APP from '@configs/app.config.ts'
import __ROUTE__ from '@constant/route.const.ts'
import { showToastError, showToastSuccess } from '@core/components/toast.core.tsx'
import logger from '@core/utils/logger.util.ts'
import type { ReqLogin } from '@modules/auth/request/login.request.ts'
import { useLoginMutation } from '@modules/auth/services/auth.service.ts'
import _ from 'lodash'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'

export default function useAuth() {
  const navigate = useNavigate()

  const [onLogin, { isLoading: isLoadingLogin }] = useLoginMutation()

  const handleLogin = useCallback(
    async (data: ReqLogin) => {
      try {
        const res = await onLogin(data).unwrap()
        const resData = _.get(res, 'data')
        const accessToken = _.get(resData, 'token')

        localStorage.setItem(CONFIG_APP.TOKEN.ACCESS_TOKEN, accessToken)

        navigate(__ROUTE__.DASHBOARD)
        showToastSuccess(res.message)
      } catch (err) {
        showToastError(err.message)
        logger.debug(err)
      }
    },
    [navigate, onLogin],
  )

  const handleLogout = useCallback(() => {
    localStorage.removeItem(CONFIG_APP.TOKEN.ACCESS_TOKEN)
    navigate(__ROUTE__.AUTH.LOGIN)
  }, [navigate])

  const onAuth = useCallback(() => {
    const isHasToken = !_.isEmpty(localStorage.getItem(CONFIG_APP.TOKEN.ACCESS_TOKEN))
    const redirectTo = isHasToken ? __ROUTE__.DASHBOARD : __ROUTE__.AUTH.LOGIN
    navigate(redirectTo)
  }, [navigate])

  return { isLoadingLogin, handleLogin, handleLogout, onAuth }
}

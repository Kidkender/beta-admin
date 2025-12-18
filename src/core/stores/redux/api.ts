import CONFIG_APP from '@configs/app.config.ts'
import __ENV__ from '@constant/env.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import __ROUTE__ from '@constant/route.const.ts'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ============================================================================
// Base fetch query (chỉ lo việc fetch + headers)
// ============================================================================
const baseQuery = fetchBaseQuery({
  baseUrl: __ENV__.URL.API,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(CONFIG_APP.TOKEN.ACCESS_TOKEN)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')
    headers.set('ngrok-skip-browser-warning', '1')

    return headers
  },
})

// ============================================================================
// Wrapper để xử lý auth / error toàn cục
// ============================================================================
const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    const status = result.error.status

    if (status === 401) {
      // Token hết hạn / không hợp lệ
      localStorage.removeItem(CONFIG_APP.TOKEN.ACCESS_TOKEN)

      // Có thể dispatch logout nếu cần
      // api.dispatch(authActions.logout())

      window.location.href = __ROUTE__.AUTH.LOGIN
    }
  }

  return result
}

// ============================================================================
// RTK Query API
// ============================================================================
const apiRTKQuery = createApi({
  reducerPath: __REDUX__.REDUCER_PATH.API,
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: Object.values(__REDUX__.TAG_TYPES),
})

export { apiRTKQuery }
export default apiRTKQuery.reducer

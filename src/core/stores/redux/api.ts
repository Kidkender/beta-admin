import CONFIG_APP from '@configs/app.config.ts'
import __ENV__ from '@constant/env.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import __ROUTE__ from '@constant/route.const.ts'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiRTKQuery = createApi({
  reducerPath: __REDUX__.REDUCER_PATH.API,
  endpoints: () => ({}),
  tagTypes: Object.values(__REDUX__.TAG_TYPES),
  baseQuery: fetchBaseQuery({
    baseUrl: __ENV__.URL.API,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '1',
    },
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(CONFIG_APP.TOKEN.ACCESS_TOKEN)
      const author = `Bearer ${token}`.trim()
      if (token) {
        headers.set('Authorization', author)
      }
      return headers
    },
    responseHandler: (response) => {
      if (response.status === 401) {
        localStorage.remove(CONFIG_APP.TOKEN.ACCESS_TOKEN)
        window.location.href = __ROUTE__.AUTH.LOGIN
      }
      return response.json()
    },
  }),
})

export { apiRTKQuery }
export default apiRTKQuery.reducer

import __ENDPOINT__ from '@constant/endpoint.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResTypeError, ResTypeSuccess } from '@core/types/response.type.ts'
import type { ReqLogin } from '@modules/auth/request/login.request.ts'
import type { ResLogin } from '@modules/auth/response/login.response.ts'

const authService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<ResTypeSuccess<ResLogin>, ReqLogin>({
      query: (body) => ({
        url: __ENDPOINT__.AUTH.LOGIN,
        method: HttpMethodEnum.POST,
        body,
      }),
      transformErrorResponse: (response) => response.data as ResTypeError,
    }),
  }),
})

export default authService
export const { useLoginMutation } = authService

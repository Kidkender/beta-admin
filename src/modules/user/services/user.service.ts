import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResUser } from '@modules/user/response/customer.response.ts'

const userService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMe: builder.query<ResUser, undefined>({
      providesTags: [__REDUX__.TAG_TYPES.USER],
      query: () => ({
        url: __ENDPOINT__.USER.ME,
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
})

export default userService
export const { useGetMeQuery } = userService

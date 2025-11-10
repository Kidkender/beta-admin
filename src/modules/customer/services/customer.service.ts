import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ReqBaseQuery } from '@core/types/request.type.ts'
import type { ResTypeSuccess } from '@core/types/response.type.ts'
import type { ResCustomer, ResCustomers } from '@modules/customer/response/customer.response.ts'

const customerService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCustomers: builder.query<ResTypeSuccess<ResCustomers>, ReqBaseQuery>({
      providesTags: [__REDUX__.TAG_TYPES.CUSTOMER],
      query: (params) => ({
        url: __ENDPOINT__.CUSTOMER.LIST,
        method: HttpMethodEnum.GET,
        params,
      }),
    }),

    getCustomerDetail: builder.query<ResTypeSuccess<ResCustomer>, string>({
      providesTags: [__REDUX__.TAG_TYPES.CUSTOMER],
      query: (id) => ({
        url: __ENDPOINT__.CUSTOMER.DETAIL.concat(`/${id}`),
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
})

export default customerService
export const { useGetCustomersQuery, useGetCustomerDetailQuery } = customerService

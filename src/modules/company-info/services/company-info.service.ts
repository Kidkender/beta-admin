import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResPaginationType } from '@core/types/response.type.ts'
import type {
  ReqCreateCompanyInfo,
  ReqQueryCompanyInfo,
  ReqUpdateCompanyInfo,
} from '@modules/company-info/request/company-info.request.ts'
import type { ResCompanyInfo } from '@modules/company-info/response/company-info.response.ts'

const companyInfoService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCompanyInfos: builder.query<ResPaginationType<ResCompanyInfo>, ReqQueryCompanyInfo>({
      providesTags: [__REDUX__.TAG_TYPES.COMPANY_INFO],
      query: (params) => ({
        url: __ENDPOINT__.COMPANY_INFO.INDEX,
        method: HttpMethodEnum.GET,
        params,
      }),
    }),

    getCompanyInfo: builder.query<ResCompanyInfo, string>({
      providesTags: [__REDUX__.TAG_TYPES.COMPANY_INFO],
      query: (id) => ({
        url: `${__ENDPOINT__.COMPANY_INFO.INDEX}/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),

    createCompanyInfo: builder.mutation<ResCompanyInfo, ReqCreateCompanyInfo>({
      invalidatesTags: [__REDUX__.TAG_TYPES.COMPANY_INFO],
      query: (body) => ({
        url: __ENDPOINT__.COMPANY_INFO.INDEX,
        method: HttpMethodEnum.POST,
        body,
      }),
    }),

    updateCompanyInfo: builder.mutation<ResCompanyInfo, ReqUpdateCompanyInfo>({
      invalidatesTags: [__REDUX__.TAG_TYPES.COMPANY_INFO],
      query: ({ id, ...body }) => ({
        url: `${__ENDPOINT__.COMPANY_INFO.INDEX}/${id}`,
        method: HttpMethodEnum.PATCH,
        body,
      }),
    }),

    deleteCompanyInfo: builder.mutation<ResCompanyInfo, number>({
      invalidatesTags: [__REDUX__.TAG_TYPES.COMPANY_INFO],
      query: (id) => ({
        url: `${__ENDPOINT__.COMPANY_INFO.INDEX}/${id}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
  }),
})

export default companyInfoService
export const {
  useGetCompanyInfosQuery,
  useGetCompanyInfoQuery,
  useCreateCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
  useDeleteCompanyInfoMutation,
} = companyInfoService

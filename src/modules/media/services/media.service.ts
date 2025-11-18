import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResPaginationType } from '@core/types/response.type.ts'
import type { ReqQueryMedias } from '@modules/media/request/media.request.ts'
import type { ResMedia } from '@modules/media/response/media.response.ts'

const mediaService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMedias: builder.query<ResPaginationType<ResMedia>, ReqQueryMedias>({
      providesTags: [__REDUX__.TAG_TYPES.MEDIA],
      query: (params) => ({
        url: __ENDPOINT__.MEDIA.INDEX,
        method: HttpMethodEnum.GET,
        params,
      }),
    }),

    getMedia: builder.query<ResMedia, string>({
      providesTags: [__REDUX__.TAG_TYPES.MEDIA],
      query: (id) => ({
        url: `${__ENDPOINT__.MEDIA.INDEX}/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),

    deleteMedia: builder.mutation<ResMedia, number>({
      invalidatesTags: [__REDUX__.TAG_TYPES.MEDIA],
      query: (id) => ({
        url: `${__ENDPOINT__.MEDIA.INDEX}/${id}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),

    uploadMultiMedia: builder.mutation<ResMedia, FormData>({
      invalidatesTags: [__REDUX__.TAG_TYPES.MEDIA],
      query: (body) => ({
        url: __ENDPOINT__.MEDIA.UPLOAD_MULTI,
        method: HttpMethodEnum.POST,
        body,
      }),
    }),
  }),
})

export default mediaService
export const { useGetMediasQuery, useGetMediaQuery, useDeleteMediaMutation, useUploadMultiMediaMutation } = mediaService

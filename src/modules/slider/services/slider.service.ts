import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResPaginationType } from '@core/types/response.type.ts'
import type { ReqCreateSlider, ReqQuerySliders, ReqUpdateSlider } from '@modules/slider/request/slider.request.ts'
import type { ResSlider } from '@modules/slider/response/slider.response.ts'

const sliderService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSliders: builder.query<ResPaginationType<ResSlider>, ReqQuerySliders>({
      providesTags: [__REDUX__.TAG_TYPES.SLIDER],
      query: (params) => ({
        url: __ENDPOINT__.SLIDER.INDEX,
        method: HttpMethodEnum.GET,
        params,
      }),
    }),

    getSlider: builder.query<ResSlider, string>({
      providesTags: [__REDUX__.TAG_TYPES.SLIDER],
      query: (id) => ({
        url: `${__ENDPOINT__.SLIDER.INDEX}/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),

    createSlider: builder.mutation<ResSlider, ReqCreateSlider>({
      invalidatesTags: [__REDUX__.TAG_TYPES.SLIDER],
      query: (body) => ({
        url: __ENDPOINT__.SLIDER.INDEX,
        method: HttpMethodEnum.POST,
        body,
      }),
    }),

    updateSlider: builder.mutation<ResSlider, ReqUpdateSlider>({
      invalidatesTags: [__REDUX__.TAG_TYPES.SLIDER],
      query: ({ id, ...body }) => ({
        url: `${__ENDPOINT__.SLIDER.INDEX}/${id}`,
        method: HttpMethodEnum.PATCH,
        body,
      }),
    }),
  }),
})

export default sliderService
export const { useGetSlidersQuery, useGetSliderQuery, useCreateSliderMutation, useUpdateSliderMutation } = sliderService

import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResPaginationType } from '@core/types/response.type.ts'
import type { ReqCreatePost, ReqQueryPosts, ReqUpdatePost } from '@modules/posts/request/post.request.ts'
import type { ResPost } from '@modules/posts/response/post.response.ts'

const postService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPosts: builder.query<ResPaginationType<ResPost>, ReqQueryPosts>({
      providesTags: [__REDUX__.TAG_TYPES.POST],
      query: (params) => ({
        url: __ENDPOINT__.POST.INDEX,
        method: HttpMethodEnum.GET,
        params,
      }),
    }),

    getPost: builder.query<ResPost, string>({
      providesTags: [__REDUX__.TAG_TYPES.POST],
      query: (id) => ({
        url: `${__ENDPOINT__.POST.INDEX}/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),

    createPost: builder.mutation<ResPost, ReqCreatePost>({
      invalidatesTags: [__REDUX__.TAG_TYPES.POST],
      query: (body) => ({
        url: __ENDPOINT__.POST.INDEX,
        method: HttpMethodEnum.POST,
        body,
      }),
    }),

    updatePost: builder.mutation<ResPost, ReqUpdatePost>({
      invalidatesTags: [__REDUX__.TAG_TYPES.POST],
      query: ({ id, ...body }) => ({
        url: `${__ENDPOINT__.POST.INDEX}/${id}`,
        method: HttpMethodEnum.PATCH,
        body,
      }),
    }),
  }),
})

export default postService
export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation, useUpdatePostMutation } = postService

import __ENDPOINT__ from '@constant/endpoint.const.ts'
import __REDUX__ from '@constant/redux.const.ts'
import { HttpMethodEnum } from '@core/enums/http.enum.ts'
import { apiRTKQuery } from '@core/stores/redux/api.ts'
import type { ResPaginationType } from '@core/types/response.type.ts'
import type { ReqCreateContact, ReqQueryContact, ReqUpdateContact } from '@modules/contact/request/contact.request.ts'
import type { ResContact } from '@modules/contact/response/contact.response.ts'
import type { ResPost } from '@modules/posts/response/post.response.ts'

const contactService = apiRTKQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getContacts: builder.query<ResPaginationType<ResContact>, ReqQueryContact>({
      providesTags: [__REDUX__.TAG_TYPES.CONTACT],
      query: (params) => ({
        url: __ENDPOINT__.CONTACT.INDEX,
        method: HttpMethodEnum.GET,
        params,
      }),
    }),

    getContact: builder.query<ResContact, string>({
      providesTags: [__REDUX__.TAG_TYPES.CONTACT],
      query: (id) => ({
        url: `${__ENDPOINT__.CONTACT.INDEX}/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),

    createContact: builder.mutation<ResContact, ReqCreateContact>({
      invalidatesTags: [__REDUX__.TAG_TYPES.CONTACT],
      query: (body) => ({
        url: __ENDPOINT__.CONTACT.INDEX,
        method: HttpMethodEnum.POST,
        body,
      }),
    }),

    updateContact: builder.mutation<ResContact, ReqUpdateContact>({
      invalidatesTags: [__REDUX__.TAG_TYPES.CONTACT],
      query: ({ id, ...body }) => ({
        url: `${__ENDPOINT__.CONTACT.INDEX}/${id}`,
        method: HttpMethodEnum.PATCH,
        body,
      }),
    }),

    deleteContact: builder.mutation<ResPost, number>({
      invalidatesTags: [__REDUX__.TAG_TYPES.CONTACT],
      query: (id) => ({
        url: `${__ENDPOINT__.CONTACT.INDEX}/${id}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
  }),
})

export default contactService
export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactService

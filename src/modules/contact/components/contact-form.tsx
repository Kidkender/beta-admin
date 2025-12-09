import __ROUTE__ from '@constant/route.const.ts'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Textarea } from '@shared/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import 'react-quill-new/dist/quill.snow.css'
import { showToastError } from '@core/components/toast.core.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ReqCreateContact, reqCreateContactSchema } from '@modules/contact/request/contact.request.ts'
import {
  useCreateContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from '@modules/contact/services/contact.service.ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select.tsx'
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ContentEditorProps {
  contactId?: string
}

export default function ContactForm({ contactId }: ContentEditorProps) {
  const navigate = useNavigate()
  const form = useForm<ReqCreateContact>({
    resolver: zodResolver(reqCreateContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: '',
      subject: '',
      message: '',
    },
  })
  const isEditing = !!contactId

  const { data, isFetching } = useGetContactQuery(contactId, {
    skip: !isEditing,
    selectFromResult: (props) => {
      return { ...props, data: props.data }
    },
  })

  const [createContact] = useCreateContactMutation()
  const [updateContact] = useUpdateContactMutation()

  const onSubmit = (formData: ReqCreateContact) => {
    if (isEditing) {
      updateContact({ ...formData, id: contactId })
        .unwrap()
        .then(() => navigate(__ROUTE__.CONTACT.INDEX))
        .catch(showToastError)
    } else {
      createContact(formData)
        .unwrap()
        .then(() => navigate(__ROUTE__.CONTACT.INDEX))
        .catch(showToastError)
    }
  }

  useLayoutEffect(() => {
    if (isEditing && !isFetching) {
      form.reset(data)
    }
  }, [data, form, isEditing, isFetching])

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link to={__ROUTE__.CONTACT.INDEX}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold text-foreground'>
              {isEditing ? 'Chỉnh sửa liên hệ thông tin' : 'Tạo liên hệ thông tin mới'}
            </h1>
            <p className='text-muted-foreground'>
              {isEditing ? 'Cập nhật nội dung liên hệthông tin' : 'Tạo nội dung mới cho website'}
            </p>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button
            type={'submit'}
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            <Save className='h-4 w-4 mr-2' />
            {isEditing ? 'Cập nhật' : 'Lưu liên hệ'}
          </Button>
        </div>
      </div>

      <div>
        <div className={'font-bold text-xl mb-1.5'}>Nội dung chính</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-5 space-y-2'}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề liên hệ</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Nhập tiêu đề liên hệ...' className='mt-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-3 space-y-2'}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Từ khoá</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Nhập từ email...' className='mt-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-2 space-y-2'}>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thứ tự</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Nhập tiêu thứ tự...' className='mt-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-2 space-y-2 mx-auto'}>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng Thái</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className='mt-1 w-full'>
                            <SelectValue placeholder='Chọn trạng thái' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Trạng thái</SelectLabel>
                              <SelectItem value={'NEW'}>Mới</SelectItem>
                              <SelectItem value={'IN_PROGRESS'}>Đang xử lí</SelectItem>
                              <SelectItem value={'RESOLVED'}>Đã xử lí</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input disabled placeholder='Nhập tiêu subject...' className='mt-1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn</FormLabel>
                  <FormControl>
                    <Textarea disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

import __ROUTE__ from '@constant/route.const.ts'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select'
import { Switch } from '@shared/components/ui/switch.tsx'
import { Textarea } from '@shared/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'
import QuillResizeImage from 'quill-resize-image'
import ReactQuill, { Quill } from 'react-quill-new'
import { Link, useNavigate } from 'react-router'
import 'react-quill-new/dist/quill.snow.css'
import { showToastError } from '@core/components/toast.core.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { positionsList } from '@modules/posts/constants/positions-list.ts'
import { type ReqCreatePost, reqCreatePostSchema } from '@modules/posts/request/post.request.ts'
import { useCreatePostMutation, useGetPostQuery, useUpdatePostMutation } from '@modules/posts/services/post.service.ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form.tsx'
import { MultiSelect } from '@shared/components/ui/multi-select.tsx'
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'

Quill.register('modules/resize', QuillResizeImage)

interface ContentEditorProps {
  postId?: string
}

export default function ContentEditor({ postId }: ContentEditorProps) {
  const navigate = useNavigate()
  const form = useForm<ReqCreatePost>({
    resolver: zodResolver(reqCreatePostSchema),
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      category: '',
      thumbnail: '',
      published: false,
      files: [],
      positions: [],
    },
  })
  const isEditing = !!postId

  const { data, isFetching } = useGetPostQuery(postId, {
    skip: !isEditing,
    selectFromResult: (props) => {
      return { ...props, data: props.data }
    },
  })

  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const onSubmit = (formData: ReqCreatePost) => {
    const transformData = {
      ...formData,
      positions: formData.positions.map((item) => ({
        position: item,
        isActive: true,
        order: 0,
      })),
    } as unknown as ReqCreatePost

    if (isEditing) {
      updatePost({ id: postId, ...transformData })
        .unwrap()
        .then(() => navigate(__ROUTE__.POSTS.INDEX))
        .catch(showToastError)
    } else {
      createPost(transformData)
        .unwrap()
        .then(() => navigate(__ROUTE__.POSTS.INDEX))
        .catch(showToastError)
    }
  }

  console.info({ positionsList, formValue: form.getValues('positions') })

  useLayoutEffect(() => {
    if (isEditing && !isFetching) {
      form.reset({ ...data, positions: data?.positions?.map((item) => item.position) ?? [] })
    }
  }, [data, form, isEditing, isFetching])

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link to={__ROUTE__.POSTS.INDEX}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold text-foreground'>
              {isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
            </h1>
            <p className='text-muted-foreground'>
              {isEditing ? 'Cập nhật nội dung bài viết' : 'Tạo nội dung mới cho website'}
            </p>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            <Save className='h-4 w-4 mr-2' />
            {isEditing ? 'Cập nhật' : 'Lưu bài viết'}
          </Button>
        </div>
      </div>

      <div>
        <div className={'font-bold text-xl mb-1.5'}>Nội dung chính</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className={'grid grid-cols-12 gap-4'}>
              <div className={'col-span-8 space-y-2'}>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề bài viết</FormLabel>
                      <FormControl>
                        <Input id='title' placeholder='Nhập tiêu đề bài viết...' className='mt-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-3 space-y-2'}>
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className='mt-1 w-full'>
                            <SelectValue placeholder='Chọn danh mục' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Danh Mục</SelectLabel>
                              <SelectItem value='TIN_TUC'>Tin Tức</SelectItem>
                              <SelectItem value='NGHIEN_CUU'>Nghiên Cứu</SelectItem>
                              <SelectItem value='NHAN_SU'>Nhân Sự</SelectItem>
                              <SelectItem value='MINH_CHUNG'>Minh Chứng</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-1 space-y-2 mx-auto'}>
                <FormField
                  control={form.control}
                  name='published'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng Thái</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} disabled={field.disabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='positions'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Vị Trí Xuất Hiện</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={positionsList}
                        defaultValue={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder='Chọn vị trí xuất hiện...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='files'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh đại diện</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      // KHÔNG spread ...field để tránh truyền value
                      onChange={(event) => {
                        const fileList = event.target.files
                        const file = fileList && fileList[0] ? fileList[0] : null

                        // tuỳ theo schema của ReqCreatePost.files
                        // nếu là File[]:
                        field.onChange(file ? [file] : [])
                      }}
                      // nếu cần tên để RHF nhận diện:
                      name={field.name}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='summary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả ngắn</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className={'h-full'}>
                    <FormLabel>Nội dung</FormLabel>
                    <FormControl className={'min-h-80'}>
                      <ReactQuill
                        {...field}
                        formats={[
                          'header',
                          'bold',
                          'italic',
                          'underline',
                          'strike',
                          'blockquote',
                          'list',
                          // 'bullet',
                          'indent',
                          'link',
                          'image',
                        ]}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                            ['link', 'image'],
                            ['clean'],
                          ],
                          resize: {
                            locale: {},
                          },
                        }}
                        style={{ border: 'none' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

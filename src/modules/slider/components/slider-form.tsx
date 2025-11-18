import __ROUTE__ from '@constant/route.const.ts'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Switch } from '@shared/components/ui/switch.tsx'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import 'react-quill-new/dist/quill.snow.css'
import { showToastError } from '@core/components/toast.core.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ReqCreateSlider, reqCreateSliderSchema } from '@modules/slider/request/slider.request.ts'
import {
  useCreateSliderMutation,
  useGetSliderQuery,
  useUpdateSliderMutation,
} from '@modules/slider/services/slider.service.ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form.tsx'
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ContentEditorProps {
  sliderId?: string
}

export default function SliderForm({ sliderId }: ContentEditorProps) {
  const navigate = useNavigate()
  const form = useForm<ReqCreateSlider>({
    resolver: zodResolver(reqCreateSliderSchema),
    defaultValues: {
      title: '',
      link: '',
      image: '',
      order: 0,
      isActive: false,
      files: [],
    },
  })
  const isEditing = !!sliderId

  const { data, isFetching } = useGetSliderQuery(sliderId, {
    skip: !isEditing,
    selectFromResult: (props) => {
      return { ...props, data: props.data }
    },
  })

  const [createSlider] = useCreateSliderMutation()
  const [updateSlider] = useUpdateSliderMutation()

  const onSubmit = (formData: ReqCreateSlider) => {
    if (isEditing) {
      updateSlider({ ...formData, id: sliderId })
        .unwrap()
        .then(() => navigate(__ROUTE__.SLIDER.INDEX))
        .catch(showToastError)
    } else {
      createSlider(formData)
        .unwrap()
        .then(() => navigate(__ROUTE__.SLIDER.INDEX))
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
            <Link to={__ROUTE__.SLIDER.INDEX}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold text-foreground'>
              {isEditing ? 'Chỉnh sửa thông tin' : 'Tạo thông tin mới'}
            </h1>
            <p className='text-muted-foreground'>
              {isEditing ? 'Cập nhật nội dung thông tin' : 'Tạo nội dung mới cho website'}
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
            {isEditing ? 'Cập nhật' : 'Lưu thông tin'}
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
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề thông tin</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập tiêu đề thông tin...' className='mt-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-3 space-y-2'}>
                <FormField
                  control={form.control}
                  name='link'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Từ khoá</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập từ khoá...' className='mt-1' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-2 space-y-2'}>
                <FormField
                  control={form.control}
                  name='order'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thứ tự</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Nhập tiêu thứ tự...'
                          className='mt-1'
                          value={field.value ?? ''} // tránh lỗi undefined
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value === '' ? null : Number(value)) // ép number
                          }}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={'col-span-2 space-y-2 mx-auto'}>
                <FormField
                  control={form.control}
                  name='isActive'
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
              name='files'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      multiple
                      // KHÔNG spread ...field để tránh truyền value
                      onChange={(event) => {
                        const fileList = event.target.files
                        const file = fileList && fileList[0] ? fileList[0] : null

                        // tuỳ theo schema của ReqCreateSlider.files
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
          </form>
        </Form>
      </div>
    </div>
  )
}

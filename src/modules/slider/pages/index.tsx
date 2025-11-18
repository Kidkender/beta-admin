import type { ReqQuerySliders } from '@modules/slider/request/slider.request.ts'
import type { ResSlider } from '@modules/slider/response/slider.response.ts'
import { useGetSlidersQuery } from '@modules/slider/services/slider.service.ts'
import { Button } from '@shared/components/ui/button.tsx'
import { Card } from '@shared/components/ui/card.tsx'
import { Spinner } from '@shared/components/ui/spinner.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/components/ui/table'
import _ from 'lodash'
import { Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function SliderPage() {
  const [params, setParams] = useState<ReqQuerySliders>({
    page: 1,
    limit: 10,
  })

  const { sliders, isFetching } = useGetSlidersQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const sliders = _.get(data, 'data', [] as ResSlider[]).map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
      }))

      return { ...props, sliders }
    },
  })

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý banner</h1>
            <p className='text-muted-foreground'>Quản lý banner</p>
          </div>
          <Button className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2'>
            <Plus size={20} />
            Thêm banner
          </Button>
        </div>

        <Card className='bg-card border border-border p-4'>
          <div className='flex gap-4'>
            {/* Hàng 1: Search */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-3 text-muted-foreground' size={18} />
              <input
                type='text'
                placeholder='Tìm kiếm bài viết...'
                value={params.search}
                onChange={(e) => setParams((pre) => ({ ...pre, search: e.target.value }))}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground'
              />
            </div>
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Hình Ảnh</TableHead>
                  <TableHead>Thứ tự</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <Spinner />
                  </TableRow>
                ) : sliders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  sliders.map((slider) => (
                    <TableRow key={slider.id}>
                      <TableCell className='text-foreground font-medium'>{slider.title}</TableCell>
                      <TableCell className=''>
                        <img src={slider.image} alt={slider.title} className='w-20 h-20 object-cover rounded-md' />
                      </TableCell>
                      <TableCell className='text-muted-foreground'>{slider.order}</TableCell>
                      <TableCell className='text-foreground'>
                        {slider.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center justify-end gap-2'>
                          <Button variant='ghost' size='icon' className='text-destructive'>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </main>
  )
}

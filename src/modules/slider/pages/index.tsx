import __ROUTE__ from '@constant/route.const.ts'
import { showToastSuccess } from '@core/components/toast.core.tsx'
import SliderForm from '@modules/slider/components/slider-form.tsx'
import type { ReqQuerySlider } from '@modules/slider/request/slider.request.ts'
import type { ResSlider } from '@modules/slider/response/slider.response.ts'
import { useDeleteSliderMutation, useGetSlidersQuery } from '@modules/slider/services/slider.service.ts'
import { Button } from '@shared/components/ui/button.tsx'
import { Card } from '@shared/components/ui/card.tsx'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@shared/components/ui/pagination.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select.tsx'
import { Spinner } from '@shared/components/ui/spinner.tsx'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@shared/components/ui/table'
import { cn } from '@shared/lib/utils.ts'
import _ from 'lodash'
import { Edit2, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

export default function SliderPage() {
  const [params, setParams] = useState<ReqQuerySlider>({
    page: 1,
    limit: 10,
  })

  const { paginationValue, sliders, isFetching } = useGetSlidersQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const sliders = _.get(data, 'data', [] as ResSlider[]).map((slider) => ({
        ...slider,
        createdAt: new Date(slider.createdAt).toLocaleDateString(),
      }))
      const paginationValue = _.get(data, 'pagination')

      return { ...props, sliders, paginationValue }
    },
  })

  const [onDeleteSlider] = useDeleteSliderMutation()
  const handleDeleteSlider = (slider: ResSlider) => {
    onDeleteSlider(slider.id)
      .unwrap()
      .finally(() => showToastSuccess(`Xoá thành ${slider.title}`))
  }

  const currentPage = paginationValue?.page ?? params.page ?? 1
  const totalPages = paginationValue?.totalPages ?? 1

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    setParams((prev) => ({
      ...prev,
      page,
    }))
  }

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý thông tin công ty</h1>
            <p className='text-muted-foreground'>Quản lý các thông tin liên quan đến công ty</p>
          </div>
          <Link to={__ROUTE__.SLIDER.CREATE}>
            <Button className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2'>
              <Plus size={20} />
              Thêm thông tin
            </Button>
          </Link>
        </div>

        <Card className='bg-card border border-border p-4'>
          <div className='flex gap-4'>
            {/* Hàng 1: Search */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-3 text-muted-foreground' size={18} />
              <input
                type='text'
                placeholder='Tìm kiếm thông tin...'
                value={params.search}
                onChange={(e) => setParams((pre) => ({ ...pre, search: e.target.value }))}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground'
              />
            </div>

            <Select
              onValueChange={(value) => setParams((pre) => ({ ...pre, isActive: value === 'true' }))}
              value={`${params.isActive}`}
            >
              <SelectTrigger className='basis-1/8' size={'lg'}>
                <SelectValue placeholder='Trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trạng thái</SelectLabel>
                  <SelectItem value={'true'}>Đã kích hoạt</SelectItem>
                  <SelectItem value={'false'}>Chưa kích hoạt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Hàng 2: Filters và Sort */}
            {/* Sort theo ngày */}
            <Select
              onValueChange={(value) => setParams((pre) => ({ ...pre, sortOrder: value as 'asc' | 'desc' }))}
              value={params.sortOrder}
            >
              <SelectTrigger className='basis-1/8' size={'lg'}>
                <SelectValue placeholder='Sắp xêp' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Thứ tự sắp xếp theo ngày</SelectLabel>
                  <SelectItem value={'asc'}>Tăng dần</SelectItem>
                  <SelectItem value={'desc'}>Giảm dần</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sắp xếp</TableHead>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Đường dẫn</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : sliders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  sliders.map((slider) => (
                    <TableRow key={slider.id}>
                      <TableCell className='text-foreground font-medium'>{slider.order}</TableCell>
                      <TableCell className='text-foreground font-medium'>{slider.title}</TableCell>
                      <TableCell className='text-foreground font-medium'>{slider.link}</TableCell>
                      <TableCell className=''>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            slider.isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {slider.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                        </span>
                      </TableCell>
                      <TableCell className='text-muted-foreground'>{slider.createdAt}</TableCell>
                      <TableCell>
                        <div className='flex items-center justify-end gap-2'>
                          <Link to={`${__ROUTE__.SLIDER.INDEX}/${slider.id}`}>
                            <Button variant='ghost' size='icon' className='text-foreground'>
                              <Edit2 size={16} />
                            </Button>
                          </Link>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-destructive'
                            onClick={() => handleDeleteSlider(slider)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter className={'w-full'}>
                {paginationValue && totalPages > 1 && (
                  <Pagination className={'w-full bg-white pt-4'}>
                    <PaginationContent className={'w-full'}>
                      {/* Previous */}
                      <PaginationItem>
                        <PaginationPrevious
                          href='#'
                          onClick={(e) => {
                            e.preventDefault()
                            handleChangePage(currentPage - 1)
                          }}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                        />
                      </PaginationItem>

                      {/* Các số trang */}
                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              href='#'
                              onClick={(e) => {
                                e.preventDefault()
                                handleChangePage(pageNumber)
                              }}
                              isActive={pageNumber === currentPage}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}

                      {/* Next */}
                      <PaginationItem>
                        <PaginationNext
                          href='#'
                          onClick={(e) => {
                            e.preventDefault()
                            handleChangePage(currentPage + 1)
                          }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </TableFooter>
            </Table>
          </div>
        </Card>
      </div>
    </main>
  )
}

export function CreateSliderPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto'>
        <SliderForm />
      </div>
    </main>
  )
}

export function DetailSliderPage() {
  const { id } = useParams()

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <SliderForm sliderId={id} />
      </div>
    </main>
  )
}

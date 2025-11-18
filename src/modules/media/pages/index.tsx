import { showToastSuccess } from '@core/components/toast.core.tsx'
import MediaUpload from '@modules/media/components/media-upload.tsx'
import type { ReqQueryMedias } from '@modules/media/request/media.request.ts'
import type { ResMedia } from '@modules/media/response/media.response.ts'
import { useDeleteMediaMutation, useGetMediasQuery } from '@modules/media/services/media.service.ts'
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
import { Spinner } from '@shared/components/ui/spinner.tsx'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@shared/components/ui/table'
import _ from 'lodash'
import { Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function MediaPage() {
  const [params, setParams] = useState<ReqQueryMedias>({
    page: 1,
    limit: 10,
  })

  const { paginationValue, medias, isFetching } = useGetMediasQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const medias = _.get(data, 'data', [] as ResMedia[]).map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
      }))
      const paginationValue = _.get(data, 'pagination')

      return { ...props, medias, paginationValue }
    },
  })

  const currentPage = paginationValue?.page ?? params.page ?? 1
  const totalPages = paginationValue?.totalPages ?? 1

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    setParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const [onDeleteMedia, { isLoading }] = useDeleteMediaMutation()
  const handleDeleteMedia = (media: ResMedia) => {
    onDeleteMedia(media.id)
      .unwrap()
      .finally(() => {
        showToastSuccess(`Xoá thành ${media.fileName}`)
      })
  }

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý hình ảnh</h1>
            <p className='text-muted-foreground'>Quản lý hình ảnh</p>
          </div>
          <MediaUpload />
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
                  <TableHead>Tên Tệp</TableHead>
                  <TableHead>Hình Ảnh</TableHead>
                  <TableHead>Kích Thước</TableHead>
                  <TableHead>Loại</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <Spinner />
                  </TableRow>
                ) : medias.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  medias.map((media) => (
                    <TableRow key={media.id}>
                      <TableCell className='text-foreground font-medium'>{media.fileName}</TableCell>
                      <TableCell className=''>
                        <img src={media.url} alt={media.alt} className='w-10 h-10 object-cover rounded-md' />
                      </TableCell>
                      <TableCell className='text-muted-foreground'>{media.fileSize}</TableCell>
                      <TableCell className='text-foreground'>{media.type}</TableCell>
                      <TableCell>
                        <div className='flex items-center justify-end gap-2'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-destructive'
                            onClick={() => handleDeleteMedia({ ...media, createdAt: new Date(media.createdAt) })}
                            disabled={isLoading}
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

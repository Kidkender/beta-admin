import __ROUTE__ from '@constant/route.const.ts'
import { showToastSuccess } from '@core/components/toast.core.tsx'
import CompanyInfoForm from '@modules/company-info/components/company-info-form.tsx'
import type { ReqQueryCompanyInfo } from '@modules/company-info/request/company-info.request.ts'
import type { ResCompanyInfo } from '@modules/company-info/response/company-info.response.ts'
import {
  useDeleteCompanyInfoMutation,
  useGetCompanyInfosQuery,
} from '@modules/company-info/services/company-info.service.ts'
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

export default function CompanyInfoPage() {
  const [params, setParams] = useState<ReqQueryCompanyInfo>({
    page: 1,
    limit: 10,
  })

  const { paginationValue, companyInfos, isFetching } = useGetCompanyInfosQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const companyInfos = _.get(data, 'data', [] as ResCompanyInfo[]).map((companyInfo) => ({
        ...companyInfo,
        createdAt: new Date(companyInfo.createdAt).toLocaleDateString(),
      }))
      const paginationValue = _.get(data, 'pagination')

      return { ...props, companyInfos, paginationValue }
    },
  })

  const [onDeleteCompanyInfo] = useDeleteCompanyInfoMutation()
  const handleDeleteCompanyInfo = (companyInfo: ResCompanyInfo) => {
    onDeleteCompanyInfo(companyInfo.id)
      .unwrap()
      .finally(() => showToastSuccess(`Xoá thành ${companyInfo.title}`))
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
          <Link to={__ROUTE__.COMPANY_INFO.CREATE}>
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
                  <TableHead>Nội dung</TableHead>
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
                ) : companyInfos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className='text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  companyInfos.map((companyInfo) => (
                    <TableRow key={companyInfo.id}>
                      <TableCell className='text-foreground font-medium'>{companyInfo.order}</TableCell>
                      <TableCell className='text-foreground font-medium'>{companyInfo.title}</TableCell>
                      <TableCell className='text-foreground font-medium'>{companyInfo.content}</TableCell>
                      <TableCell className=''>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            companyInfo.isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {companyInfo.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                        </span>
                      </TableCell>
                      <TableCell className='text-muted-foreground'>{companyInfo.createdAt}</TableCell>
                      <TableCell>
                        <div className='flex items-center justify-end gap-2'>
                          <Link to={`${__ROUTE__.COMPANY_INFO.INDEX}/${companyInfo.id}`}>
                            <Button variant='ghost' size='icon' className='text-foreground'>
                              <Edit2 size={16} />
                            </Button>
                          </Link>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-destructive'
                            onClick={() => handleDeleteCompanyInfo(companyInfo)}
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

export function CreateCompanyInfoPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto'>
        <CompanyInfoForm />
      </div>
    </main>
  )
}

export function DetailCompanyInfoPage() {
  const { id } = useParams()

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <CompanyInfoForm companyInfoId={id} />
      </div>
    </main>
  )
}

import __ROUTE__ from '@constant/route.const.ts'
import { showToastSuccess } from '@core/components/toast.core.tsx'
import ContactForm from '@modules/contact/components/contact-form.tsx'
import type { ReqQueryContact } from '@modules/contact/request/contact.request.ts'
import type { ResContact } from '@modules/contact/response/contact.response.ts'
import { useDeleteContactMutation, useGetContactsQuery } from '@modules/contact/services/contact.service.ts'
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
import _ from 'lodash'
import { Edit2, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

const subjectListOption = {
  PROJECT_COLLABORATION: 'Dự án/hợp tác',
  BUSINESS_ADVICE: 'Lời khuyên kinh doanh',
  COPYRIGHT: 'Xin bản quyền âm nhạc/ Phim',
  JOB_OPPORTUNITY: 'Cơ hội việc làm',
  OTHER: 'Vấn đề khác',
}

export default function ContactPage() {
  const [params, setParams] = useState<ReqQueryContact>({
    page: 1,
    limit: 10,
  })

  const { paginationValue, contacts, isFetching } = useGetContactsQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const contacts = _.get(data, 'data', [] as ResContact[]).map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
      }))
      const paginationValue = _.get(data, 'pagination')

      return { ...props, contacts, paginationValue }
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

  const [onDeleteContact] = useDeleteContactMutation()
  const handleDeleteContact = (contact: ResContact) => {
    onDeleteContact(contact.id)
      .unwrap()
      .finally(() => {
        showToastSuccess(`Xoá thành ${contact.name}`)
      })
  }

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý liên hệ</h1>
            <p className='text-muted-foreground'>Quản lý thông tin người liên hệ</p>
          </div>
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

            <Select onValueChange={(value) => setParams((pre) => ({ ...pre, status: value }))} value={params.status}>
              <SelectTrigger className='basis-1/8' size={'lg'}>
                <SelectValue placeholder='Trạng thái' />
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

            <Select onValueChange={(value) => setParams((pre) => ({ ...pre, subject: value }))} value={params.subject}>
              <SelectTrigger className='basis-1/8' size={'lg'}>
                <SelectValue placeholder='Tiêu đề' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tiêu đề</SelectLabel>
                  <SelectItem className='text-primary' value={null}>
                    Tất cả
                  </SelectItem>
                  <SelectItem className='text-primary' value='PROJECT_COLLABORATION'>
                    Dự án/hợp tác
                  </SelectItem>
                  <SelectItem className='text-primary' value='BUSINESS_ADVICE'>
                    Lời khuyên kinh doanh
                  </SelectItem>
                  <SelectItem className='text-primary' value='COPYRIGHT'>
                    Xin bản quyền âm nhạc/ Phim
                  </SelectItem>
                  <SelectItem className='text-primary' value='JOB_OPPORTUNITY'>
                    Cơ hội việc làm
                  </SelectItem>
                  <SelectItem className='text-primary' value='OTHER'>
                    Vấn đề khác
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tựa dề</TableHead>
                  <TableHead>Nội dung</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className='text-foreground font-medium'>{contact.name}</TableCell>
                      <TableCell className='text-foreground font-medium'>
                        {contact.status === 'NEW'
                          ? 'Mới'
                          : contact.status === 'IN_PROGRESS'
                            ? 'Đang xử lí'
                            : contact.status === 'RESOLVED'
                              ? 'Đã xử lí'
                              : contact.status}
                      </TableCell>
                      <TableCell className=''>{contact.phone}</TableCell>
                      <TableCell className='text-muted-foreground'>{contact.email}</TableCell>
                      <TableCell className='text-foreground'>
                        {contact?.subject ? subjectListOption[contact.subject] : subjectListOption['OTHER']}
                      </TableCell>
                      <TableCell className='text-foreground'>{contact.message}</TableCell>
                      <TableCell>
                        <div className='flex items-center justify-end gap-2'>
                          <Link to={`${__ROUTE__.CONTACT.INDEX}/${contact.id}`}>
                            <Button variant='ghost' size='icon' className='text-foreground'>
                              <Edit2 size={16} />
                            </Button>
                          </Link>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='text-destructive'
                            onClick={() => handleDeleteContact(contact)}
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

export function CreateContactPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto'>
        <ContactForm />
      </div>
    </main>
  )
}

export function DetailContactPage() {
  const { id } = useParams()

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <ContactForm contactId={id} />
      </div>
    </main>
  )
}

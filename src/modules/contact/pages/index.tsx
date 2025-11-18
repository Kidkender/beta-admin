import type { ReqQueryContact } from '@modules/contact/request/contact.request.ts'
import type { ResContact } from '@modules/contact/response/contact.response.ts'
import { useGetContactsQuery } from '@modules/contact/services/contact.service.ts'
import { Button } from '@shared/components/ui/button.tsx'
import { Card } from '@shared/components/ui/card.tsx'
import { Spinner } from '@shared/components/ui/spinner.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/components/ui/table'
import _ from 'lodash'
import { Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [params, setParams] = useState<ReqQueryContact>({
    page: 1,
    limit: 10,
  })

  const { contacts, isFetching } = useGetContactsQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const contacts = _.get(data, 'data', [] as ResContact[]).map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
      }))

      return { ...props, contacts }
    },
  })

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
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tựa dề</TableHead>
                  <TableHead>Nội dung</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <Spinner />
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
                      <TableCell className=''>{contact.phone}</TableCell>
                      <TableCell className='text-muted-foreground'>{contact.email}</TableCell>
                      <TableCell className='text-foreground'>{contact.subject}</TableCell>
                      <TableCell className='text-foreground'>{contact.message}</TableCell>
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

import __ROUTE__ from '@constant/route.const.ts'
import ContentEditor from '@modules/posts/components/content-editor.tsx'
import type { ReqQueryPosts } from '@modules/posts/request/post.request.ts'
import type { ResPost } from '@modules/posts/response/post.response.ts'
import { useGetPostsQuery } from '@modules/posts/services/post.service.ts'
import { Button } from '@shared/components/ui/button.tsx'
import { Card } from '@shared/components/ui/card.tsx'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/components/ui/table'
import { cn } from '@shared/lib/utils.ts'
import _ from 'lodash'
import { Edit2, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

export default function ContentPage() {
  const [params, setParams] = useState<ReqQueryPosts>({
    page: 1,
    limit: 10,
  })

  const { posts, isFetching } = useGetPostsQuery(params, {
    selectFromResult: (props) => {
      const { data } = props
      const posts = _.get(data, 'data', [] as ResPost[]).map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
      }))

      return { ...props, posts }
    },
  })

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý bài viết</h1>
            <p className='text-muted-foreground'>Quản lý tin tức, nghiên cứu, nhân sự, minh chứng</p>
          </div>
          <Link to={__ROUTE__.POSTS.CREATE}>
            <Button className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2'>
              <Plus size={20} />
              Thêm bài viết
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
                placeholder='Tìm kiếm bài viết...'
                value={params.search}
                onChange={(e) => setParams((pre) => ({ ...pre, search: e.target.value }))}
                className='w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground'
              />
            </div>

            {/* Hàng 2: Filters và Sort */}
            {/* Filter Danh mục */}
            <Select
              onValueChange={(value) => setParams((pre) => ({ ...pre, category: value }))}
              value={params.category}
            >
              <SelectTrigger className='basis-1/8'>
                <SelectValue placeholder='Danh mục' />
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

            {/* Filter Trạng thái */}
            <Select
              onValueChange={(value) => setParams((pre) => ({ ...pre, published: value === 'true' }))}
              value={params.category}
            >
              <SelectTrigger className='basis-1/8'>
                <SelectValue placeholder='Trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trạng thái</SelectLabel>
                  <SelectItem value={'true'}>Đã xuất bản</SelectItem>
                  <SelectItem value={'false'}>Chưa xuất bản</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Sort theo ngày */}
            <Select
              onValueChange={(value) => setParams((pre) => ({ ...pre, sortOrder: value as 'asc' | 'desc' }))}
              value={params.sortOrder}
            >
              <SelectTrigger className='basis-1/8'>
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
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <Spinner />
                  </TableRow>
                ) : posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className='text-foreground font-medium'>{post.title}</TableCell>
                      <TableCell className=''>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            post ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {post ? 'Xuất bản' : 'Bản nháp'}
                        </span>
                      </TableCell>
                      <TableCell className='text-muted-foreground'>{post.createdAt}</TableCell>
                      <TableCell className='text-foreground'>{post.viewCount}</TableCell>
                      <TableCell>
                        <div className='flex items-center justify-end gap-2'>
                          <Link to={`${__ROUTE__.POSTS.DETAIL}/${post.id}`}>
                            <Button variant='ghost' size='icon' className='text-foreground'>
                              <Edit2 size={16} />
                            </Button>
                          </Link>
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

export function CreateContentPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto'>
        <ContentEditor />
      </div>
    </main>
  )
}

export function DetailContentPage() {
  const { id } = useParams()

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <ContentEditor postId={id} />
      </div>
    </main>
  )
}

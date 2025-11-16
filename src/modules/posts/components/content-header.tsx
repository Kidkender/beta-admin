import __ROUTE__ from '@constant/route.const.ts'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { Filter, Plus, Search } from 'lucide-react'
import { Link } from 'react-router'

export default function ContentHeader() {
  return (
    <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Quản lý nội dung</h1>
        <p className='text-muted-foreground mt-1'>Tạo và quản lý các bài viết, tin tức cho website</p>
      </div>

      <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
        <div className='flex gap-2'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input placeholder='Tìm kiếm bài viết...' className='pl-10 w-64' />
          </div>

          <Select>
            <SelectTrigger className='w-40'>
              <Filter className='h-4 w-4 mr-2' />
              <SelectValue placeholder='Lọc' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả</SelectItem>
              <SelectItem value='published'>Đã xuất bản</SelectItem>
              <SelectItem value='draft'>Bản nháp</SelectItem>
              <SelectItem value='archived'>Đã lưu trữ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button asChild>
          <Link to={__ROUTE__.POSTS.CREATE}>
            <Plus className='h-4 w-4 mr-2' />
            Tạo bài viết mới
          </Link>
        </Button>
      </div>
    </div>
  )
}

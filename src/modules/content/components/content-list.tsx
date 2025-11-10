import { Avatar, AvatarFallback, AvatarImage } from '@shared//components/ui/avatar'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent } from '@shared/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu'
import { Calendar, Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

// Mock data
const mockContent = [
  {
    id: '1',
    title: 'Hướng dẫn trading cơ bản cho người mới bắt đầu',
    excerpt: 'Tìm hiểu những kiến thức cơ bản về trading cryptocurrency và các chiến lược đầu tư hiệu quả...',
    status: 'published',
    author: 'Nguyễn Văn A',
    authorAvatar: '/user-avatar-1.png',
    publishedAt: '2024-01-15',
    views: 1234,
    category: 'Hướng dẫn',
  },
  {
    id: '2',
    title: 'Phân tích thị trường crypto tuần này',
    excerpt: 'Cập nhật những diễn biến mới nhất của thị trường cryptocurrency và dự đoán xu hướng...',
    status: 'draft',
    author: 'Trần Thị B',
    authorAvatar: '/diverse-user-avatar-set-2.png',
    publishedAt: null,
    views: 0,
    category: 'Phân tích',
  },
  {
    id: '3',
    title: 'Cập nhật tính năng mới của Beta Group Platform',
    excerpt: 'Giới thiệu các tính năng mới được cập nhật trong phiên bản mới nhất của Beta Group...',
    status: 'published',
    author: 'Lê Văn C',
    authorAvatar: '/diverse-user-avatars-3.png',
    publishedAt: '2024-01-10',
    views: 856,
    category: 'Tin tức',
  },
  {
    id: '4',
    title: 'Bảo mật tài khoản trading - Những điều cần biết',
    excerpt: 'Hướng dẫn chi tiết cách bảo vệ tài khoản trading và tránh các rủi ro bảo mật...',
    status: 'published',
    author: 'Phạm Thị D',
    authorAvatar: '/user-avatar-4.png',
    publishedAt: '2024-01-08',
    views: 2156,
    category: 'Bảo mật',
  },
]

const statusColors = {
  published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
}

const statusLabels = {
  published: 'Đã xuất bản',
  draft: 'Bản nháp',
  archived: 'Đã lưu trữ',
}

export default function ContentList() {
  const [content] = useState(mockContent)

  return (
    <div className='space-y-4'>
      {content.map((item) => (
        <Card key={item.id} className='hover:shadow-md transition-shadow'>
          <CardContent className='p-6'>
            <div className='flex items-start justify-between'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-3 mb-2'>
                  <h3 className='text-lg font-semibold text-foreground hover:text-primary cursor-pointer'>
                    <Link to={`/content/${item.id}`}>{item.title}</Link>
                  </h3>
                  <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                    {statusLabels[item.status as keyof typeof statusLabels]}
                  </Badge>
                </div>

                <p className='text-muted-foreground text-sm mb-4 line-clamp-2'>{item.excerpt}</p>

                <div className='flex items-center gap-6 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={item.authorAvatar || '/placeholder.svg'} />
                      <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{item.author}</span>
                  </div>

                  {item.publishedAt && (
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-4 w-4' />
                      <span>{new Date(item.publishedAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  )}

                  <div className='flex items-center gap-1'>
                    <Eye className='h-4 w-4' />
                    <span>{item.views.toLocaleString()} lượt xem</span>
                  </div>

                  <Badge variant='outline'>{item.category}</Badge>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link to={`/content/${item.id}`}>
                      <Eye className='h-4 w-4 mr-2' />
                      Xem
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/content/${item.id}/edit`}>
                      <Edit className='h-4 w-4 mr-2' />
                      Chỉnh sửa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-destructive'>
                    <Trash2 className='h-4 w-4 mr-2' />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

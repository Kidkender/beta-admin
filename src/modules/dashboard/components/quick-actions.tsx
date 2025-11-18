import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { FileText, Settings, Users } from 'lucide-react'

const actions = [
  {
    title: 'Tạo bài viết mới',
    description: 'Thêm nội dung mới cho website',
    icon: FileText,
    href: '/content/new',
  },
  {
    title: 'Thêm người dùng',
    description: 'Tạo tài khoản người dùng mới',
    icon: Users,
    href: '/user/new',
  },
  // {
  //   title: 'Xem báo cáo trading',
  //   description: 'Phân tích dữ liệu giao dịch',
  //   icon: TrendingUp,
  //   href: '/trading/reports',
  // },
  {
    title: 'Cấu hình hệ thống',
    description: 'Quản lý cài đặt CMS',
    icon: Settings,
    href: '/settings',
  },
]

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thao tác nhanh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {actions.map((action) => (
            <Button
              key={action.title}
              variant='outline'
              className='h-auto p-4 flex flex-col items-start space-y-2 text-left bg-transparent'
              asChild
            >
              <a href={action.href}>
                <action.icon className='h-5 w-5 text-primary' />
                <div>
                  <div className='font-medium text-sm'>{action.title}</div>
                  <div className='text-xs text-muted-foreground'>{action.description}</div>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'

const activities = [
  // {
  //   user: 'Nguyễn Văn A',
  //   action: 'đã tạo bài viết mới',
  //   target: 'Hướng dẫn trading cơ bản',
  //   time: '2 phút trước',
  //   avatar: '/assets/images/user-avatar-1.png',
  // },
  {
    user: 'Trần Thị B',
    action: 'đã thực hiện giao dịch',
    target: 'BTC/USDT',
    time: '5 phút trước',
    avatar: '/assets/images/diverse-user-avatar-set-2.png',
  },
  {
    user: 'Lê Văn C',
    action: 'đã đăng ký tài khoản',
    target: '',
    time: '10 phút trước',
    avatar: '/assets/images/diverse-user-avatars-3.png',
  },
  {
    user: 'Phạm Thị D',
    action: 'đã cập nhật profile',
    target: '',
    time: '15 phút trước',
    avatar: '/assets/images/user-avatar-4.png',
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {activities.map((activity, index) => (
            <div key={index} className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={activity.avatar || '/placeholder.svg'} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm text-foreground'>
                  <span className='font-medium'>{activity.user}</span> {activity.action}{' '}
                  {activity.target && <span className='font-medium text-primary'>{activity.target}</span>}
                </p>
                <p className='text-xs text-muted-foreground'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

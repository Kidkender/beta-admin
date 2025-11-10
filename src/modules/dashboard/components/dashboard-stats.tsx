import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { DollarSign, FileText, TrendingUp, Users } from 'lucide-react'

const stats = [
  {
    title: 'Tổng người dùng',
    value: '2,847',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Bài viết',
    value: '1,234',
    change: '+8%',
    icon: FileText,
    color: 'text-green-600',
  },
  {
    title: 'Liên hệ',
    value: '856',
    change: '+23%',
    icon: TrendingUp,
    color: 'text-purple-600',
  },
  {
    title: 'Lượt truy cập',
    value: '45,231',
    change: '+15%',
    icon: DollarSign,
    color: 'text-orange-600',
  },
]

export default function DashboardStats() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{stat.value}</div>
            <p className='text-xs text-green-600 mt-1'>{stat.change} từ tháng trước</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

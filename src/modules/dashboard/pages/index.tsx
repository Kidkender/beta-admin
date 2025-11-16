import { Card } from '@shared/components/ui/card.tsx'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const chartData = [
  { name: 'Thứ 2', articles: 12, media: 8, visitors: 240 },
  { name: 'Thứ 3', articles: 19, media: 12, visitors: 221 },
  { name: 'Thứ 4', articles: 15, media: 10, visitors: 229 },
  { name: 'Thứ 5', articles: 25, media: 18, visitors: 200 },
  { name: 'Thứ 6', articles: 22, media: 15, visitors: 250 },
  { name: 'Thứ 7', articles: 18, media: 14, visitors: 210 },
]

const pieData = [
  { name: 'Tin tức', value: 35 },
  { name: 'Nghiên cứu', value: 25 },
  { name: 'Nhân sự', value: 20 },
  { name: 'Minh chứng', value: 20 },
]

const COLORS = ['#6666ff', '#8884d8', '#82ca9d', '#ffc658']

export default function DashboardPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>Dashboard</h1>
          <p className='text-muted-foreground'>Xin chào! Đây là tổng quan quản trị nội dung của bạn.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <Card className='p-6 bg-card border border-border'>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-muted-foreground'>Tổng bài viết</p>
              <p className='text-3xl font-bold text-foreground'>127</p>
              <p className='text-xs text-muted-foreground'>+12 tuần này</p>
            </div>
          </Card>

          <Card className='p-6 bg-card border border-border'>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-muted-foreground'>Media</p>
              <p className='text-3xl font-bold text-foreground'>456</p>
              <p className='text-xs text-muted-foreground'>+45 tuần này</p>
            </div>
          </Card>

          <Card className='p-6 bg-card border border-border'>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-muted-foreground'>Slider/Banner</p>
              <p className='text-3xl font-bold text-foreground'>8</p>
              <p className='text-xs text-muted-foreground'>+2 tuần này</p>
            </div>
          </Card>

          <Card className='p-6 bg-card border border-border'>
            <div className='space-y-2'>
              <p className='text-sm font-medium text-muted-foreground'>Liên hệ</p>
              <p className='text-3xl font-bold text-foreground'>34</p>
              <p className='text-xs text-muted-foreground'>+8 tuần này</p>
            </div>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Card className='lg:col-span-2 p-6 bg-card border border-border'>
            <h2 className='text-lg font-semibold text-foreground mb-4'>Thống kê hoạt động</h2>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' stroke='var(--border)' />
                <XAxis dataKey='name' stroke='var(--muted-foreground)' />
                <YAxis stroke='var(--muted-foreground)' />
                <Tooltip />
                <Bar dataKey='articles' fill='var(--primary)' name='Bài viết' />
                <Bar dataKey='media' fill='var(--accent)' name='Media' />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className='p-6 bg-card border border-border'>
            <h2 className='text-lg font-semibold text-foreground mb-4'>Phân loại bài viết</h2>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </main>
  )
}

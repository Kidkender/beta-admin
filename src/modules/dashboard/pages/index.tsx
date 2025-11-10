import DashboardStats from '@modules/dashboard/components/dashboard-stats'
import QuickActions from '@modules/dashboard/components/quick-actions'
import RecentActivity from '@modules/dashboard/components/recent-activity'

export default function DashboardPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>Beta Group Dashboard</h1>
          <p className='text-muted-foreground'>Quản lý nội dung, người dùng và trading cho dự án</p>
        </div>

        <DashboardStats />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </main>
  )
}

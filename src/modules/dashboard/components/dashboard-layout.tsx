import AuthProvider from '@modules/auth/components/auth-provider.tsx'
import DashboardHeader from '@modules/dashboard/components/dashboard-header'
import DashboardSidebar from '@modules/dashboard/components/dashboard-sidebar'
import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <div className='flex h-screen bg-background'>
        <DashboardSidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <DashboardHeader />
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}

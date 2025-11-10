import __ROUTE__ from '@constant/route.const.ts'
import { Button } from '@shared/components/ui/button'
import { cn } from '@shared/lib/utils'
import { FileText, LayoutDashboard, Menu, Settings, UserLock, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'

const navigation = [
  { name: 'Dashboard', href: __ROUTE__.DASHBOARD, icon: LayoutDashboard },
  { name: 'Bài viết', href: __ROUTE__.CONTENT.INDEX, icon: FileText },
  { name: 'Người liên hệ', href: __ROUTE__.CUSTOMER.INDEX, icon: Users },
  { name: 'Cài đặt', href: __ROUTE__.SETTINGS, icon: Settings },
]

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant='ghost'
        size='icon'
        className='lg:hidden fixed top-4 left-4 z-50'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-center h-16 px-4 border-b border-border'>
            <h2 className='text-xl font-bold text-foreground'>Beta Group</h2>
          </div>

          <nav className='flex-1 px-4 py-6 space-y-2'>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                  onClick={() => setIsOpen(false)}
                  to={item.href}
                >
                  <item.icon className='mr-3 h-5 w-5' />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && <div className='fixed inset-0 z-30 bg-black/50 lg:hidden' onClick={() => setIsOpen(false)} />}
    </>
  )
}

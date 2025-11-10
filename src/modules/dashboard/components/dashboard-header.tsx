import useAuth from '@modules/auth/hooks/auth.hook.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@shared/components/ui/avatar'
import { Button } from '@shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu'
import { Input } from '@shared/components/ui/input'
import { Bell, LogOut, Search, Settings, User } from 'lucide-react'

export default function DashboardHeader() {
  const { handleLogout } = useAuth()

  const user = {
    fullName: 'Admin',
    email: 'example@gmail.com',
  }

  return (
    <header className='h-16 border-b border-border bg-card px-6 flex items-center justify-between'>
      <div className='flex items-center flex-1 max-w-md'>
        <div className='relative w-full'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input placeholder='Tìm kiếm...' className='pl-10 bg-background' />
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <Button variant='ghost' size='icon'>
          <Bell className='h-5 w-5' />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='/admin-avatar.png' />
                <AvatarFallback>{user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <div className='flex items-center justify-start gap-2 p-2'>
              <div className='flex flex-col space-y-1 leading-none'>
                <p className='font-medium'>{user?.fullName}</p>
                <p className='w-[200px] truncate text-sm text-muted-foreground'>{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <span>Hồ sơ</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Cài đặt</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

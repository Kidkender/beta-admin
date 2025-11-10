import __ROUTE__ from '@constant/route.const.ts'
import { Button } from '@shared/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'

export default function CustomerHeader() {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Quản lý khách hàng</h1>
        <p className='text-muted-foreground mt-1'>Quản lý thông tin khách hàng và gói bán của họ</p>
      </div>
      <Link to={__ROUTE__.CUSTOMER.NEW}>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Thêm khách hàng
        </Button>
      </Link>
    </div>
  )
}

import type { ReqBaseQuery } from '@core/types/request.type.ts'
import { type Customer, mapResCustomerToCustomer } from '@modules/customer/model/customer.model.ts'
import type { ResCustomer } from '@modules/customer/response/customer.response.ts'
import { useGetCustomersQuery } from '@modules/customer/services/customer.service.ts'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Card } from '@shared/components/ui/card'
import { Input } from '@shared/components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select.tsx'
import { Skeleton } from '@shared/components/ui/skeleton.tsx'
import _ from 'lodash'
import { Edit, Package, Search, Trash2, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

export default function CustomerList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const [params] = useState<ReqBaseQuery>({
    page: 1,
    size: 10,
  })

  const { customers, isLoadingData } = useGetCustomersQuery(params, {
    refetchOnMountOrArgChange: false,
    selectFromResult: (props) => {
      const { data, isFetching, isLoading } = props
      const res = _.get(data, 'data')
      const customersData = _.get(res, 'customers', [] as ResCustomer[])

      const isLoadingData = isLoading || isFetching

      const total = _.get(res, 'total', 0)
      const customers = customersData.map((customer): Customer => mapResCustomerToCustomer(customer))
      return { ...props, isLoadingData, total, customers }
    },
  })

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phoneNumber.includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm khách hàng...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10'
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='active'>Đang hoạt động</SelectItem>
            <SelectItem value='inactive'>Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid gap-4'>
        {isLoadingData ? (
          <Skeleton className={'h-10 w-full'} />
        ) : (
          filteredCustomers.map((customer) => (
            <Card key={customer.key} className='p-6 hover:shadow-lg transition-shadow'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-4 flex-1'>
                  <div className='p-3 bg-primary/10 rounded-lg'>
                    <User className='h-6 w-6 text-primary' />
                  </div>
                  <div className='flex-1 space-y-3'>
                    <div>
                      <div className='flex items-center gap-2 mb-1'>
                        <h3 className='font-semibold text-lg text-foreground'>{customer.fullName}</h3>
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                        </Badge>
                      </div>
                      <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
                        <span>{customer.email}</span>
                        <span>{customer.phoneNumber}</span>
                      </div>
                    </div>

                    <div className='grid grid-cols-3 gap-4 pt-3 border-t border-border'>
                      <div>
                        <p className='text-xs text-muted-foreground mb-1'>Gói bán</p>
                        <div className='flex items-center gap-2'>
                          <Package className='h-4 w-4 text-primary' />
                          <span className='text-sm font-medium text-foreground'>{customer.packageName}</span>
                        </div>
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground mb-1'>Người quản lý</p>
                        <span className='text-sm font-medium text-foreground'>{customer.broker}</span>
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground mb-1'>Tổng giao dịch</p>
                        <span className='text-sm font-medium text-primary'>{customer.totalTrades}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Link to={`/customer/${customer.key}`}>
                    <Button variant='outline' size='sm'>
                      <Edit className='mr-2 h-4 w-4' />
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <Button variant='outline' size='sm'>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {filteredCustomers.length === 0 && (
        <div className='text-center py-12'>
          <User className='mx-auto h-12 w-12 text-muted-foreground' />
          <h3 className='mt-4 text-lg font-semibold text-foreground'>Không tìm thấy khách hàng</h3>
          <p className='text-muted-foreground'>Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
        </div>
      )}
    </div>
  )
}

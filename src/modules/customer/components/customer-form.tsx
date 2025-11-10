import __ROUTE__ from '@constant/route.const.ts'
import { type Customer, mapResCustomerToCustomer } from '@modules/customer/model/customer.model.ts'
import type { ResCustomer } from '@modules/customer/response/customer.response.ts'
import { useGetCustomerDetailQuery } from '@modules/customer/services/customer.service.ts'
import { Button } from '@shared/components/ui/button'
import { Card } from '@shared/components/ui/card'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { Switch } from '@shared/components/ui/switch'
import _ from 'lodash'
import { ArrowLeft, Save } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

interface Props {
  customerId?: string
}

export default function CustomerForm({ customerId }: Readonly<Props>) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageId: '',
    userId: '',
    status: true,
  })

  const isEditing = !!customerId

  const { customer } = useGetCustomerDetailQuery(customerId, {
    skip: !isEditing,

    selectFromResult: (props) => {
      const { data } = props
      const res = _.get(data, 'data', {} as ResCustomer)
      const customer: Customer = mapResCustomerToCustomer(res)

      return { ...props, customer }
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link to={__ROUTE__.CUSTOMER.INDEX}>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>
            {customerId ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}
          </h1>
          <p className='text-muted-foreground mt-1'>
            {customerId ? 'Cập nhật thông tin khách hàng' : 'Thêm khách hàng mới vào hệ thống'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className='p-6'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Họ và tên</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder='Nguyễn Văn A'
                required
              />
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  value={customer.email ?? formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder='email@example.com'
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Số điện thoại</Label>
                <Input
                  id='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder='0901234567'
                  required
                />
              </div>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='packageId'>Gói bán</Label>
                <Select
                  value={formData.packageId}
                  onValueChange={(value) => setFormData({ ...formData, packageId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn gói bán' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Phí khách hàng VIP (2%)</SelectItem>
                    <SelectItem value='2'>Phí khách hàng thường (5%)</SelectItem>
                    <SelectItem value='3'>Phí khách hàng Premium (1%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='userId'>Người quản lý</Label>
                <Select value={formData.userId} onValueChange={(value) => setFormData({ ...formData, userId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn người quản lý' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Admin User</SelectItem>
                    <SelectItem value='2'>John Moderator</SelectItem>
                    <SelectItem value='3'>Jane User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex items-center justify-between p-4 bg-accent rounded-lg'>
              <div>
                <Label htmlFor='status' className='text-base'>
                  Trạng thái hoạt động
                </Label>
                <p className='text-sm text-muted-foreground'>Khách hàng có thể thực hiện giao dịch</p>
              </div>
              <Switch
                id='status'
                checked={formData.status}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
              />
            </div>
          </div>

          <div className='flex gap-4 mt-6'>
            <Button type='submit' className='flex-1'>
              <Save className='mr-2 h-4 w-4' />
              {customerId ? 'Cập nhật khách hàng' : 'Thêm khách hàng'}
            </Button>
            <Link to={__ROUTE__.CUSTOMER.INDEX} className='flex-1'>
              <Button type='button' variant='outline' className='w-full bg-transparent'>
                Hủy
              </Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  )
}

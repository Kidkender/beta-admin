import type { ResCustomer } from '@modules/customer/response/customer.response.ts'

export interface Customer {
  key: string
  fullName: string
  email: string
  phoneNumber: string
  status: string

  avatar: string
  role: string
  balance: number
  lastTrading: string
  totalTrades: number

  broker: string
  packageName: string

  createdAt: string
  updatedAt: string
}

export const mapResCustomerToCustomer = (customer: ResCustomer): Customer => ({
  key: customer._id,
  fullName: customer.email,
  email: customer.email,
  status: customer.status,
  phoneNumber: '',

  broker: '',
  packageName: '',

  avatar: '',
  role: 'user',
  balance: 0,
  lastTrading: Date.now().toString(),
  totalTrades: 0,
  createdAt: customer.createdAt,
  updatedAt: customer.updatedAt,
})

export interface ResCustomer {
  _id: string
  email: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ResCustomers {
  customers: ResCustomer[]
  total: number
}

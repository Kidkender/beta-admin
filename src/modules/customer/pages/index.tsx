import CustomerForm from '@modules/customer/components/customer-form'
import CustomerHeader from '@modules/customer/components/customer-header'
import CustomerList from '@modules/customer/components/customer-list'
import { useParams } from 'react-router'

export default function CustomerPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <CustomerHeader />
        <CustomerList />
      </div>
    </main>
  )
}

export function CreateCustomerPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <CustomerForm />
      </div>
    </main>
  )
}

export function DetailCustomerPage() {
  const { id } = useParams()

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <CustomerForm customerId={id} />
      </div>
    </main>
  )
}

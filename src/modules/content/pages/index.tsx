import ContentEditor from '@modules/content/components/content-editor.tsx'
import ContentHeader from '@modules/content/components/content-header.tsx'
import ContentList from '@modules/content/components/content-list.tsx'
import { useParams } from 'react-router'

export default function ContentPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <ContentHeader />
        <ContentList />
      </div>
    </main>
  )
}

export function CreateContentPage() {
  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <ContentEditor />
      </div>
    </main>
  )
}

export function DetailContentPage() {
  const { id } = useParams()

  return (
    <main className='flex-1 overflow-y-auto p-6'>
      <div className='max-w-4xl mx-auto'>
        <ContentEditor contentId={id} />
      </div>
    </main>
  )
}

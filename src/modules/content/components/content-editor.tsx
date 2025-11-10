import __ROUTE__ from '@constant/route.const.ts'
import logger from '@core/utils/logger.util'
import { Badge } from '@shared/components/ui/badge'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card'
import { Input } from '@shared/components/ui/input'
import { Label } from '@shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { Textarea } from '@shared/components/ui/textarea'
import { ArrowLeft, Eye, Save, Upload } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

interface ContentEditorProps {
  contentId?: string
}

export default function ContentEditor({ contentId }: ContentEditorProps) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('draft')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  const isEditing = !!contentId

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    logger.info('Saving content...', { title, excerpt, content, category, status, tags })
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link to={__ROUTE__.CONTENT.INDEX}>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold text-foreground'>
              {isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
            </h1>
            <p className='text-muted-foreground'>
              {isEditing ? 'Cập nhật nội dung bài viết' : 'Tạo nội dung mới cho website'}
            </p>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline'>
            <Eye className='h-4 w-4 mr-2' />
            Xem trước
          </Button>
          <Button onClick={handleSave}>
            <Save className='h-4 w-4 mr-2' />
            {isEditing ? 'Cập nhật' : 'Lưu bài viết'}
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Nội dung chính</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='title'>Tiêu đề bài viết</Label>
                <Input
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Nhập tiêu đề bài viết...'
                  className='mt-1'
                />
              </div>

              <div>
                <Label htmlFor='excerpt'>Mô tả ngắn</Label>
                <Textarea
                  id='excerpt'
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder='Nhập mô tả ngắn cho bài viết...'
                  className='mt-1'
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor='content'>Nội dung</Label>
                <Textarea
                  id='content'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Nhập nội dung bài viết...'
                  className='mt-1 min-h-96'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt xuất bản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='status'>Trạng thái</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className='mt-1'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Bản nháp</SelectItem>
                    <SelectItem value='published'>Xuất bản</SelectItem>
                    <SelectItem value='archived'>Lưu trữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='category'>Danh mục</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Chọn danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='guide'>Hướng dẫn</SelectItem>
                    <SelectItem value='analysis'>Phân tích</SelectItem>
                    <SelectItem value='news'>Tin tức</SelectItem>
                    <SelectItem value='security'>Bảo mật</SelectItem>
                    <SelectItem value='update'>Cập nhật</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex gap-2'>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder='Thêm tag...'
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} size='sm'>
                  Thêm
                </Button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <Badge key={tag} variant='secondary' className='cursor-pointer' onClick={() => handleRemoveTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ảnh đại diện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='border-2 border-dashed border-border rounded-lg p-6 text-center'>
                <Upload className='h-8 w-8 mx-auto text-muted-foreground mb-2' />
                <p className='text-sm text-muted-foreground mb-2'>Kéo thả ảnh vào đây hoặc click để chọn</p>
                <Button variant='outline' size='sm'>
                  Chọn ảnh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

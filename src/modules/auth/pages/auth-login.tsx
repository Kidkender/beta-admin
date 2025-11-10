import { zodResolver } from '@hookform/resolvers/zod'
import AuthProvider from '@modules/auth/components/auth-provider'
import useAuth from '@modules/auth/hooks/auth.hook.ts'
import { type ReqLogin, schemaLogin } from '@modules/auth/request/login.request.ts'
import { Button } from '@shared/components/ui/button.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/components/ui/form.tsx'
import { Input } from '@shared/components/ui/input.tsx'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AuthLoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const { isLoadingLogin, handleLogin } = useAuth()
  const form = useForm<ReqLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: 'admin@123.com', // admin@123.com
      password: 'Admin@123', // Admin@123
    },
  })

  return (
    <AuthProvider>
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='max-w-md w-full space-y-8 p-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-foreground'>Beta Group</h2>
            <p className='mt-2 text-muted-foreground'>Đăng nhập vào hệ thống quản lý</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Đăng nhập</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                            <Input
                              autoComplete={'email'}
                              placeholder='Nhập email của bạn'
                              className='pl-10'
                              required
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={'password'}
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                            <Input
                              id='password'
                              autoComplete={'current-password'}
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Nhập mật khẩu'
                              className='pl-10 pr-10'
                              required
                              {...field}
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='absolute right-0 top-0 h-full px-3'
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full hover:cursor-pointer' disabled={isLoadingLogin}>
                    {isLoadingLogin ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthProvider>
  )
}

import __ROUTE__ from '@constant/route.const.ts'
import { AuthLoginPage } from '@modules/auth/pages'
import CompanyInfoPage, { CreateCompanyInfoPage, DetailCompanyInfoPage } from '@modules/company-info/pages'
import ContactPage, { CreateContactPage, DetailContactPage } from '@modules/contact/pages'
import DashboardLayout from '@modules/dashboard/components/dashboard-layout.tsx'
import DashboardPage from '@modules/dashboard/pages'
import MediaPage from '@modules/media/pages'
import NotFoundPage from '@modules/not-found/pages'
import ContentPage, { CreateContentPage, DetailContentPage } from '@modules/posts/pages'
import SliderPage, { CreateSliderPage, DetailSliderPage } from '@modules/slider/pages'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootProvider from './provider'

import './global.css'
import '@configs/style.config.css'

const router = createBrowserRouter([
  // Not Defined Routes
  { path: '*', element: <NotFoundPage /> },

  // Default Route
  {
    path: __ROUTE__.AUTH.INDEX,
    children: [{ path: __ROUTE__.AUTH.LOGIN, Component: AuthLoginPage }],
  },

  // Admin Pages
  {
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      {
        path: __ROUTE__.POSTS.INDEX,
        children: [
          { index: true, Component: ContentPage },
          { path: __ROUTE__.POSTS.CREATE, Component: CreateContentPage },
          { path: __ROUTE__.POSTS.DETAIL, Component: DetailContentPage },
        ],
      },
      {
        path: __ROUTE__.CONTACT.INDEX,
        children: [
          { index: true, Component: ContactPage },
          { path: __ROUTE__.CONTACT.CREATE, Component: CreateContactPage },
          { path: __ROUTE__.CONTACT.DETAIL, Component: DetailContactPage },
        ],
      },
      {
        path: __ROUTE__.MEDIA.INDEX,
        children: [{ index: true, Component: MediaPage }],
      },
      {
        path: __ROUTE__.SLIDER.INDEX,
        children: [
          { index: true, Component: SliderPage },
          { path: __ROUTE__.SLIDER.CREATE, Component: CreateSliderPage },
          { path: __ROUTE__.SLIDER.DETAIL, Component: DetailSliderPage },
        ],
      },
      {
        path: __ROUTE__.COMPANY_INFO.INDEX,
        children: [
          { index: true, Component: CompanyInfoPage },
          { path: __ROUTE__.COMPANY_INFO.CREATE, Component: CreateCompanyInfoPage },
          { path: __ROUTE__.COMPANY_INFO.DETAIL, Component: DetailCompanyInfoPage },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <RouterProvider router={router} />
  </RootProvider>,
)

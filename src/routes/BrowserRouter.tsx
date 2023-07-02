import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout'
import NotFoundPage from '~/pages/404'
import AdminPage from '~/pages/admin'
import ForgotPasswordPage from '~/pages/auth/forgot-password'
import LoginPage from '~/pages/auth/login'
import RegisterPage from '~/pages/auth/register'
import DashboardPage from '~/pages/dashboard'
import HomePage from '~/pages/home'
import TeacherDetail from '~/pages/teacher-detail'
import TeacherListPage from '~/pages/teacher-list'
import { routePath } from './routePath'

const BrowserRouter = () => {
  const router = createBrowserRouter([
    {
      path: routePath.home,
      element: (
        <DefaultLayout>
          <HomePage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.login,
      element: (
        <DefaultLayout>
          <LoginPage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.register,
      element: (
        <DefaultLayout>
          <RegisterPage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.forgotPassword,
      element: (
        <DefaultLayout>
          <ForgotPasswordPage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.dashboard,
      element: (
        <DefaultLayout>
          <DashboardPage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.teacherList,
      element: (
        <DefaultLayout>
          <TeacherListPage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.admin,
      element: (
        <DefaultLayout>
          <AdminPage />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.teacherDetail,
      element: (
        <DefaultLayout>
          <TeacherDetail />
        </DefaultLayout>
      ),
    },
    {
      path: routePath.notFound,
      element: <NotFoundPage />,
    },
  ])

  return <RouterProvider router={router} />
}

export default BrowserRouter

import { lazy } from 'react'
import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { useUserInfoStore } from '~/stores'
import lazyLoad from './lazyLoad'
import Layout from '~/components/Layout'
import ErrorBoundary from '~/components/ErrorBoundary'

const authLoader = () => {
  const token = useUserInfoStore.getState().userInfo?.token

  if (!token) {
    return redirect(`/login?to=${window.location.pathname + window.location.search}`)
  }

  return null
}

const routes: RouteObject[] = [
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('~/pages/Login'))),
  },
  {
    path: '/',
    element: <Layout />,
    // loader: authLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        loader: () => ({ isAuth: false, ac: 'ac' }),
        element: lazyLoad(lazy(() => import('~/pages/Home'))),
      },
      {
        path: 'about',
        element: lazyLoad(lazy(() => import('~/pages/About'))),
      },
      {
        path: 'hotnews',
        element: lazyLoad(lazy(() => import('~/pages/HotNews'))),
      },
    ],
  },
]

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL,
})

export default router

import { useEffect } from 'react'
import { AppRoutes } from './routes'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { setAuth, logout } from './store/authSlice'
import { authApi } from './api/authApi'
import { Loader } from './components/common/Loader'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.getMe()
        if (response.success && response.data?.user) {
          dispatch(setAuth(response.data.user))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        dispatch(logout())
      }
    }

    checkAuth()
  }, [dispatch])

  // We let ProtectedRoute handle the redirect if not authenticated during navigation
  return <AppRoutes />
}

export default App


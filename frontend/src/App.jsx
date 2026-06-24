import { useEffect } from 'react'
import { AppRoutes } from './routes'
import { useAuthStore } from './store/authStore'
import { authApi } from './api/authApi'
import { Loader } from './components/common/Loader'

function App() {
  const { setAuth, logout, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.getMe()
        if (response.success && response.data?.user) {
          setAuth(response.data.user)
        } else {
          logout()
        }
      } catch (error) {
        logout()
      }
    }

    checkAuth()
  }, [setAuth, logout])

  // We let ProtectedRoute handle the redirect if not authenticated during navigation
  return <AppRoutes />
}

export default App

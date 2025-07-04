import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginRequest, RegisterRequest, User } from '@/types/auth'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const router = useRouter()

  const login = async (credentials: LoginRequest) => {
    try {
      loading.value = true
      error.value = null
      
      // Mock successful login since API is not working
      const response = await authService.login(credentials)
      
      user.value = {
        id: '1',
        name: 'Người dùng',
        email: credentials.email,
        phone: '0123456789',
        avatar: ''
      }
      isAuthenticated.value = true
      
      // Save to localStorage
      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user', JSON.stringify(user.value))
      
      router.push('/')
    } catch (err) {
      error.value = 'Đăng nhập thất bại'
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: RegisterRequest) => {
    try {
      loading.value = true
      error.value = null
      
      // Mock successful registration
      const response = await authService.register(userData)
      
      user.value = {
        id: '1',
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: ''
      }
      isAuthenticated.value = true
      
      // Save to localStorage
      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user', JSON.stringify(user.value))
      
      router.push('/')
    } catch (err) {
      error.value = 'Đăng ký thất bại'
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const checkAuthStatus = () => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        user.value = JSON.parse(userData)
        isAuthenticated.value = true
      } catch (err) {
        logout()
      }
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null
      
      // Mock successful password reset request
      await authService.forgotPassword(email)
      
      router.push('/verify-code')
    } catch (err) {
      error.value = 'Gửi yêu cầu thất bại'
    } finally {
      loading.value = false
    }
  }

  const verifyCode = async (code: string) => {
    try {
      loading.value = true
      error.value = null
      
      // Mock successful code verification
      await authService.verifyCode(code)
      
      router.push('/reset-password')
    } catch (err) {
      error.value = 'Mã xác nhận không đúng'
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (password: string) => {
    try {
      loading.value = true
      error.value = null
      
      // Mock successful password reset
      await authService.resetPassword(password)
      
      router.push('/')
    } catch (err) {
      error.value = 'Đổi mật khẩu thất bại'
    } finally {
      loading.value = false
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuthStatus,
    forgotPassword,
    verifyCode,
    resetPassword
  }
})

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.lacgo.com'

// Mock service since API is not working yet
class ApiService {
  private async mockRequest<T>(data: T, delay = 1000): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay)
    })
  }

  async login(credentials: { email: string; password: string }) {
    return this.mockRequest({
      user: {
        id: '1',
        name: 'Người dùng',
        email: credentials.email,
        phone: '0123456789',
        avatar: ''
      },
      token: 'mock_token'
    })
  }

  async register(userData: { name: string; email: string; phone: string; password: string }) {
    return this.mockRequest({
      user: {
        id: '1',
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: ''
      },
      token: 'mock_token'
    })
  }

  async forgotPassword(email: string) {
    return this.mockRequest({ success: true })
  }

  async verifyCode(code: string) {
    return this.mockRequest({ success: true })
  }

  async resetPassword(password: string) {
    return this.mockRequest({ success: true })
  }

  async updateProfile(userData: any) {
    return this.mockRequest({ success: true, data: userData })
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.mockRequest({ success: true })
  }

  async deleteAccount() {
    return this.mockRequest({ success: true })
  }
}

export const authService = new ApiService()

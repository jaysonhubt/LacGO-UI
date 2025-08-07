import api from './api'
import { AUTH_API_ENDPOINTS } from './endpoints'

// Mock service since API is not working yet
class ApiService {
    private async mockRequest<T>(data: T, delay = 1000): Promise<unknown> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(data), delay)
        })
    }

    async login(credentials: { email: string; password: string }) {
        const response = await api.post(AUTH_API_ENDPOINTS.login, credentials)
        return response.data
    }

    async checkAuthStatus() {
        const response = await api.get(AUTH_API_ENDPOINTS.me)
        return response.data
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

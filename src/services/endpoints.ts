const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost'

export const AUTH_API_ENDPOINTS = {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    logout: `${API_BASE_URL}/logout`,
    me: `${API_BASE_URL}/user`,
}
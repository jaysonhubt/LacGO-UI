import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const updateProfile = async (userData: Partial<User>) => {
    try {
      loading.value = true
      // Mock successful profile update
      if (user.value) {
        user.value = { ...user.value, ...userData }
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      loading.value = true
      // Mock successful password change
      return true
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async () => {
    try {
      loading.value = true
      // Mock successful account deletion
      return true
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    updateProfile,
    changePassword,
    deleteAccount
  }
})

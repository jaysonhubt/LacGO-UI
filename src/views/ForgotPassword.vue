<template>
  <!-- Forgot Password Form -->
  <v-card class="auth-card" elevation="12">
    <v-card-text class="auth-form">
      <div class="form-header">
        <v-icon size="64" color="primary" class="mb-4">
          mdi-lock-reset
        </v-icon>
        <h2 class="form-title text-primary">Quên mật khẩu?</h2>
        <p class="form-subtitle">
          Nhập email hoặc số điện thoại để nhận mã xác nhận
        </p>
      </div>

      <v-form @submit.prevent="handleForgotPassword" ref="forgotPasswordForm">
        <v-text-field
            v-model="form.emailOrPhone"
            label="Email hoặc số điện thoại"
            variant="outlined"
            prepend-inner-icon="mdi-account"
            :rules="[rules.required, rules.emailOrPhone]"
            class="mb-6"
            hide-details="auto"
            rounded="12"
            density="comfortable"
        />

        <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            class="mb-6 submit-btn"
            :loading="loading"
            rounded="xl"
        >
          <v-icon class="mr-2">mdi-send</v-icon>
          Tiếp tục
        </v-btn>
      </v-form>

      <!-- Help Text -->
      <div class="text-center">
        <p class="text-body-2 text-medium-emphasis mb-4">
          Chúng tôi sẽ gửi mã xác nhận 6 số đến email hoặc số điện thoại của bạn
        </p>
      </div>
    </v-card-text>
  </v-card>

  <!-- Back to Login Link -->
  <div class="text-center mt-6">
    <router-link
        to="/login"
        class="text-white font-weight-bold text-decoration-none d-flex align-center justify-center"
        style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    >
      <v-icon class="mr-2" color="white">mdi-arrow-left</v-icon>
      Quay lại đăng nhập
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '@/assets/css/auth.css'

const router = useRouter()

const form = ref({
  emailOrPhone: ''
})

const loading = ref(false)
const forgotPasswordForm = ref(null)

const rules = {
  required: value => !!value || 'Trường này là bắt buộc',
  emailOrPhone: value => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phonePattern = /^[0-9]{10,11}$/
    return emailPattern.test(value) || phonePattern.test(value) || 'Email hoặc số điện thoại không hợp lệ'
  }
}

const handleForgotPassword = async () => {
  const { valid } = await forgotPasswordForm.value.validate()
  if (!valid) return

  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Navigate to verify code page
    router.push({
      name: 'VerifyCode',
      query: { emailOrPhone: form.value.emailOrPhone }
    })
  } catch (error) {
    console.error('Forgot password error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>

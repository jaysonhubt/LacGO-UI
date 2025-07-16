<template>
  <!-- Verify code Form -->
  <v-card class="auth-card" elevation="12">
    <v-card-text class="auth-form">
      <div class="form-header">
        <h2 class="form-title text-primary">Xác nhận mã</h2>
        <p class="form-subtitle">Nhập mã xác nhận đã được gửi đến email hoặc số điện thoại của bạn</p>
      </div>

      <v-form @submit.prevent="handleVerifyCode" ref="form">
        <v-text-field
            v-model="verificationCode"
            label="Mã xác nhận"
            variant="outlined"
            :rules="codeRules"
            prepend-inner-icon="mdi-shield-key"
            class="mb-4"
            required
            maxlength="6"
            counter
        />

        <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            class="mb-4"
            :loading="authStore.loading"
            rounded="lg"
        >
          Xác nhận
        </v-btn>
      </v-form>

      <div class="text-center">
        <span class="text-medium-emphasis">Không nhận được mã? </span>
        <a href="#" class="text-primary text-decoration-none" @click.prevent="resendCode">
          Gửi lại
        </a>
      </div>

      <div class="text-center mt-3">
        <router-link to="/forgot-password" class="text-primary text-decoration-none">
          <v-icon class="mr-2" color="primary">mdi-arrow-left</v-icon>
          Quay lại
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import '@/assets/css/auth.css'

const authStore = useAuthStore()
const form = ref()
const verificationCode = ref('')

const showError = computed(() => !!authStore.error)

const codeRules = [
  (v: string) => !!v || 'Mã xác nhận là bắt buộc',
  (v: string) => v.length === 6 || 'Mã xác nhận phải có 6 số',
  (v: string) => /^\d+$/.test(v) || 'Mã xác nhận chỉ được chứa số'
]

const handleVerifyCode = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    await authStore.verifyCode(verificationCode.value)
  }
}

const resendCode = () => {
  // Mock resend code functionality
  console.log('Resending verification code...')
}
</script>

<style scoped>
@media (max-width: 600px) {
  .verify-code-form .v-card-text {
    padding: 24px !important;
  }
}
</style>

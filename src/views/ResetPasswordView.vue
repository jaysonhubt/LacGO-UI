<template>
  <!-- Reset password Form -->
  <v-card class="auth-card" elevation="12">
    <v-card-text class="auth-form">
      <div class="form-header">
        <h2 class="form-title text-primary">Đặt lại mật khẩu</h2>
        <p class="form-subtitle">Nhập mật khẩu mới cho tài khoản của bạn</p>
      </div>

      <v-form @submit.prevent="handleResetPassword" ref="form">
        <v-text-field
            v-model="newPassword"
            label="Mật khẩu mới"
            variant="outlined"
            :type="showNewPassword ? 'text' : 'password'"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showNewPassword = !showNewPassword"
            class="mb-4"
            required
        />

        <v-text-field
            v-model="confirmPassword"
            label="Xác nhận mật khẩu mới"
            variant="outlined"
            :type="showConfirmPassword ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            prepend-inner-icon="mdi-lock-check"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
            class="mb-4"
            required
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
          Đặt lại mật khẩu
        </v-btn>
      </v-form>

      <div class="text-center">
        <router-link to="/login" class="text-primary text-decoration-none">
          <v-icon class="mr-2" color="primary">mdi-arrow-left</v-icon>
          Quay lại đăng nhập
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogoComponent from '@/components/LogoComponent.vue'
import '@/assets/css/auth.css'

const authStore = useAuthStore()
const form = ref()
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const showError = computed(() => !!authStore.error)

const passwordRules = [
  (v: string) => !!v || 'Mật khẩu là bắt buộc',
  (v: string) => v.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Xác nhận mật khẩu là bắt buộc',
  (v: string) => v === newPassword.value || 'Mật khẩu xác nhận không khớp'
]

const handleResetPassword = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    await authStore.resetPassword(newPassword.value)
  }
}
</script>

<style scoped>
.reset-password-container {
  height: 100vh;
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mountain-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%);
  background-image: 
    radial-gradient(ellipse at 30% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 90%, rgba(255,255,255,0.05) 0%, transparent 60%);
}

.reset-password-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.logo-section {
  display: flex;
  justify-content: center;
  margin-bottom: -30px;
  position: relative;
  z-index: 2;
}

.reset-password-form {
  margin-top: 0;
  padding-top: 40px;
}

@media (max-width: 600px) {
  .reset-password-content {
    max-width: 350px;
    padding: 16px;
  }
  
  .reset-password-form .v-card-text {
    padding: 24px !important;
  }
}
</style>

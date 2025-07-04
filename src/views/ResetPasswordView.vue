<template>
  <v-container fluid class="reset-password-container">
    <div class="mountain-background"></div>
    <div class="reset-password-content">
      <div class="logo-section">
        <LogoComponent />
      </div>
      
      <v-card class="reset-password-form" elevation="8" rounded="xl">
        <v-card-text class="pa-8">
          <h2 class="text-center mb-6 text-h4 font-weight-bold">Đặt lại mật khẩu</h2>
          <p class="text-center text-medium-emphasis mb-6">
            Nhập mật khẩu mới cho tài khoản của bạn
          </p>
          
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
              Quay về đăng nhập
            </router-link>
          </div>
        </v-card-text>
      </v-card>
    </div>
    
    <v-snackbar v-model="showError" color="error" :timeout="3000">
      {{ authStore.error }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogoComponent from '@/components/LogoComponent.vue'

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

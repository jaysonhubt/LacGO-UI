<template>
  <v-container fluid class="register-container">
    <div class="mountain-background"></div>
    <div class="register-content">
      <div class="logo-section">
        <LogoComponent />
      </div>
      
      <v-card class="register-form" elevation="8" rounded="xl">
        <v-card-text class="pa-8">
          <h2 class="text-center mb-6 text-h4 font-weight-bold">Tạo tài khoản</h2>
          
          <v-form @submit.prevent="handleRegister" ref="form">
            <v-text-field
              v-model="userData.name"
              label="Họ và tên"
              variant="outlined"
              :rules="nameRules"
              prepend-inner-icon="mdi-account"
              class="mb-4"
              required
            />
            
            <v-text-field
              v-model="userData.email"
              label="Email"
              variant="outlined"
              :rules="emailRules"
              prepend-inner-icon="mdi-email"
              class="mb-4"
              required
            />
            
            <v-text-field
              v-model="userData.phone"
              label="Số điện thoại"
              variant="outlined"
              :rules="phoneRules"
              prepend-inner-icon="mdi-phone"
              class="mb-4"
              required
            />
            
            <v-text-field
              v-model="userData.password"
              label="Mật khẩu"
              variant="outlined"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              class="mb-4"
              required
            />
            
            <v-text-field
              v-model="confirmPassword"
              label="Xác nhận mật khẩu"
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
              Tạo tài khoản
            </v-btn>
          </v-form>
          
          <div class="text-center">
            <span class="text-medium-emphasis">Đã có tài khoản? </span>
            <router-link to="/login" class="text-primary text-decoration-none font-weight-medium">
              Đăng nhập
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
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const confirmPassword = ref('')

const userData = ref({
  name: '',
  email: '',
  phone: '',
  password: ''
})

const showError = computed(() => !!authStore.error)

const nameRules = [
  (v: string) => !!v || 'Họ và tên là bắt buộc',
  (v: string) => v.length >= 2 || 'Họ và tên phải có ít nhất 2 ký tự'
]

const emailRules = [
  (v: string) => !!v || 'Email là bắt buộc',
  (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || 'Email không hợp lệ'
  }
]

const phoneRules = [
  (v: string) => !!v || 'Số điện thoại là bắt buộc',
  (v: string) => {
    const pattern = /^[0-9]{10,11}$/
    return pattern.test(v) || 'Số điện thoại không hợp lệ'
  }
]

const passwordRules = [
  (v: string) => !!v || 'Mật khẩu là bắt buộc',
  (v: string) => v.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Xác nhận mật khẩu là bắt buộc',
  (v: string) => v === userData.value.password || 'Mật khẩu xác nhận không khớp'
]

const handleRegister = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    await authStore.register(userData.value)
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  position: relative;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mountain-background {
  position: fixed;
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

.register-content {
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

.register-form {
  margin-top: 0;
  padding-top: 40px;
}

@media (max-width: 600px) {
  .register-content {
    max-width: 350px;
    padding: 16px;
  }
  
  .register-form .v-card-text {
    padding: 24px !important;
  }
}
</style>

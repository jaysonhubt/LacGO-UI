<template>
  <!-- Login Form -->
  <v-card class="login-card" elevation="0">
    <v-card-text class="login-form">
      <div class="form-header">
        <h2 class="form-title">Đăng nhập</h2>
        <p class="form-subtitle">Chào mừng bạn quay lại</p>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-text-field
            v-model="form.email"
            label="Email hoặc số điện thoại"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            density="comfortable"
            class="login-input"
            :rules="[rules.required]"
        />

        <v-text-field
            v-model="form.password"
            label="Mật khẩu"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            class="login-input"
            :rules="[rules.required]"
            @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            class="login-btn"
            :loading="loading"
        >
          <v-icon class="mr-2">mdi-login</v-icon>
          Đăng nhập
        </v-btn>
      </v-form>

      <div class="divider">
        <span class="divider-text">hoặc</span>
      </div>

      <!-- Social Login -->
      <div class="social-login">
        <v-btn
            variant="outlined"
            size="large"
            block
            class="social-btn google-btn"
            @click="loginWithGoogle"
        >
          <v-icon class="mr-2">mdi-google</v-icon>
        </v-btn>

        <v-btn
            variant="outlined"
            size="large"
            block
            class="social-btn apple-btn"
            @click="loginWithApple"
        >
          <v-icon class="mr-2">mdi-apple</v-icon>

        </v-btn>
      </div>

      <!-- Links -->
      <div class="form-links">
        <router-link to="/forgot-password" class="forgot-link">
          Quên mật khẩu?
        </router-link>
        <router-link to="/register" class="register-link">
          Tạo tài khoản mới
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref,inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const triggerError = inject('triggerError')

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

const rules = {
  required: value => !!value || 'Trường này là bắt buộc',
}

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    triggerError('Vui lòng nhập đầy đủ thông tin');
    return
  }

  loading.value = true
  try {
    const result = await authStore.login(form.value)
    if (result.success) {
      await router.push('/')
    } else {
      triggerError(result.error || 'Đăng nhập thất bại');
    }
  } catch (error) {
    triggerError('Có lỗi xảy ra, vui lòng thử lại');
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = () => {
  // Handle Google login
}

const loginWithApple = () => {
  // Handle Apple login
}
</script>

<style scoped>

.login-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.login-form {
  padding: 32px 24px 24px;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-title {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.form-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.login-input {
  margin-bottom: 15px;
}

.login-btn {
  height: 56px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  /*background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);*/
  margin-bottom: 24px;
  text-transform: none;
}

.divider {
  text-align: center;
  margin: 18px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
}

.divider-text {
  background: white;
  padding: 0 16px;
  color: #64748b;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.social-login {
  display: inline-flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 24px;
}

.social-btn {
  height: 48px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: none;
  border: 1px solid #e2e8f0;
}

.google-btn:hover {
  background: #f8f9fa;
}

.apple-btn:hover {
  background: #f8f9fa;
}

.form-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.forgot-link, .register-link {
  color: #2e7d32;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.forgot-link:hover, .register-link:hover {
  color: #1b5e20;
  text-decoration: underline;
}

.register-link {
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 480px) {
  .login-form {
    padding: 14px 20px 20px;
  }

  .form-title {
    font-size: 24px;
  }
}
</style>

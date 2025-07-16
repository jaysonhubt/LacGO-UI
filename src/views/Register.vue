<template>
  <v-card class="auth-card" elevation="12">
    <v-card-text class="auth-form">
      <div class="form-header">
        <h2 class="form-title text-primary">Tạo tài khoản</h2>
      </div>

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
            class="mb-4 submit-btn"
            :loading="authStore.loading"
            rounded="xl"
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import '@/assets/css/auth.css'

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
.submit-btn {
  height: 48px !important;
  font-weight: 600;
}

</style>


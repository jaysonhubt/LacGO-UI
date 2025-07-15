<template>
  <v-card class="verify-code-form" elevation="8" rounded="xl">
    <v-card-text>
      <div class="text-center mb-6">
        <h2 class="text-h5 font-weight-bold text-primary mb-2">Xác nhận mã</h2>
        <p class="text-body-2 text-medium-emphasis">
          Nhập mã xác nhận đã được gửi đến email hoặc số điện thoại của bạn
        </p>
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
          Quay lại
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogoComponent from '@/components/LogoComponent.vue'

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
.verify-code-container {
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

.verify-code-content {
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

.verify-code-form {
  margin-top: 0;
  padding-top: 40px;
}

@media (max-width: 600px) {
  .verify-code-content {
    max-width: 350px;
    padding: 16px;
  }
  
  .verify-code-form .v-card-text {
    padding: 24px !important;
  }
}
</style>

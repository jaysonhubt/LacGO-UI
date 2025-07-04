<template>
  <v-container fluid class="profile-container">
    <v-app-bar color="primary" dark flat>
      <v-app-bar-title>Cá nhân</v-app-bar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    
    <div class="content-wrapper">
      <!-- User Profile Header -->
      <v-card class="profile-header mb-4" elevation="2" rounded="lg">
        <v-card-text class="text-center pa-6">
          <v-avatar size="80" class="mb-4">
            <v-img
              v-if="authStore.user?.avatar"
              :src="authStore.user.avatar"
              alt="Avatar"
            />
            <v-icon v-else size="40" color="grey-lighten-1">mdi-account</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold mb-2">
            {{ authStore.user?.name || 'Người dùng' }}
          </h2>
          <p class="text-medium-emphasis">{{ authStore.user?.email }}</p>
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            class="mt-2"
            @click="editProfile"
          >
            Chỉnh sửa
          </v-btn>
        </v-card-text>
      </v-card>
      
      <!-- Menu Items -->
      <v-card elevation="1" rounded="lg">
        <v-list>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :subtitle="item.subtitle"
            @click="handleMenuClick(item.action)"
          >
            <template v-slot:append>
              <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
      
      <!-- Logout Button -->
      <v-btn
        color="error"
        variant="outlined"
        size="large"
        block
        class="mt-6"
        @click="confirmLogout"
        rounded="lg"
      >
        <v-icon left>mdi-logout</v-icon>
        Đăng xuất
      </v-btn>
    </div>
    
    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="logoutDialog" max-width="400">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Xác nhận đăng xuất</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            @click="logoutDialog = false"
          >
            Hủy
          </v-btn>
          <v-btn
            color="error"
            variant="text"
            @click="handleLogout"
          >
            Đăng xuất
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Account Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card rounded="lg">
        <v-card-title class="text-h6 text-error">Xóa tài khoản</v-card-title>
        <v-card-text>
          <p class="mb-3">Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.</p>
          <v-text-field
            v-model="confirmDeleteText"
            label="Nhập 'XOA TAI KHOAN' để xác nhận"
            variant="outlined"
            :rules="deleteConfirmRules"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            @click="deleteDialog = false"
          >
            Hủy
          </v-btn>
          <v-btn
            color="error"
            variant="text"
            :disabled="confirmDeleteText !== 'XOA TAI KHOAN'"
            @click="handleDeleteAccount"
          >
            Xóa tài khoản
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Change Password Dialog -->
    <v-dialog v-model="passwordDialog" max-width="400">
      <v-card rounded="lg">
        <v-card-title class="text-h6">Đổi mật khẩu</v-card-title>
        <v-card-text>
          <v-form ref="passwordForm">
            <v-text-field
              v-model="passwordForm.current"
              label="Mật khẩu hiện tại"
              type="password"
              variant="outlined"
              :rules="passwordRules"
              class="mb-3"
            />
            <v-text-field
              v-model="passwordForm.new"
              label="Mật khẩu mới"
              type="password"
              variant="outlined"
              :rules="passwordRules"
              class="mb-3"
            />
            <v-text-field
              v-model="passwordForm.confirm"
              label="Xác nhận mật khẩu mới"
              type="password"
              variant="outlined"
              :rules="confirmPasswordRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            @click="passwordDialog = false"
          >
            Hủy
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="handleChangePassword"
            :loading="userStore.loading"
          >
            Đổi mật khẩu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const authStore = useAuthStore()
const userStore = useUserStore()

const logoutDialog = ref(false)
const deleteDialog = ref(false)
const passwordDialog = ref(false)
const confirmDeleteText = ref('')

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const menuItems = ref([
  {
    title: 'Thông tin cá nhân',
    subtitle: 'Chỉnh sửa thông tin tài khoản',
    icon: 'mdi-account-edit',
    action: 'editProfile'
  },
  {
    title: 'Xe yêu thích',
    subtitle: 'Quản lý danh sách xe yêu thích',
    icon: 'mdi-heart',
    action: 'favoriteVehicles'
  },
  {
    title: 'Địa chỉ của tôi',
    subtitle: 'Quản lý địa chỉ thường dùng',
    icon: 'mdi-map-marker',
    action: 'myAddresses'
  },
  {
    title: 'Giới thiệu bạn bè',
    subtitle: 'Mời bạn bè và nhận ưu đãi',
    icon: 'mdi-account-plus',
    action: 'referFriends'
  },
  {
    title: 'Đổi mật khẩu',
    subtitle: 'Cập nhật mật khẩu tài khoản',
    icon: 'mdi-lock-reset',
    action: 'changePassword'
  },
  {
    title: 'Xóa tài khoản',
    subtitle: 'Xóa vĩnh viễn tài khoản',
    icon: 'mdi-delete',
    action: 'deleteAccount'
  }
])

const deleteConfirmRules = [
  (v: string) => v === 'XOA TAI KHOAN' || 'Vui lòng nhập đúng nội dung xác nhận'
]

const passwordRules = [
  (v: string) => !!v || 'Mật khẩu là bắt buộc',
  (v: string) => v.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Xác nhận mật khẩu là bắt buộc',
  (v: string) => v === passwordForm.value.new || 'Mật khẩu xác nhận không khớp'
]

const editProfile = () => {
  console.log('Edit profile')
}

const handleMenuClick = (action: string) => {
  switch (action) {
    case 'editProfile':
      editProfile()
      break
    case 'favoriteVehicles':
      console.log('Favorite vehicles')
      break
    case 'myAddresses':
      console.log('My addresses')
      break
    case 'referFriends':
      console.log('Refer friends')
      break
    case 'changePassword':
      passwordDialog.value = true
      break
    case 'deleteAccount':
      deleteDialog.value = true
      break
  }
}

const confirmLogout = () => {
  logoutDialog.value = true
}

const handleLogout = () => {
  authStore.logout()
  logoutDialog.value = false
}

const handleDeleteAccount = async () => {
  if (confirmDeleteText.value === 'XOA TAI KHOAN') {
    await userStore.deleteAccount()
    authStore.logout()
    deleteDialog.value = false
  }
}

const handleChangePassword = async () => {
  await userStore.changePassword(passwordForm.value.current, passwordForm.value.new)
  passwordDialog.value = false
  passwordForm.value = { current: '', new: '', confirm: '' }
}
</script>

<style scoped>
.profile-container {
  padding: 0;
  height: 100vh;
  overflow-y: auto;
}

.content-wrapper {
  padding: 16px;
  padding-top: 80px; /* Account for app bar */
}

.profile-header {
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  color: white;
}

.profile-header .v-card-text {
  background: rgba(255, 255, 255, 0.95);
  color: inherit;
  border-radius: 12px;
  margin: 16px;
}

.profile-header h2,
.profile-header p {
  color: #2E7D32;
}
</style>

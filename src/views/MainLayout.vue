<template>
  <v-app>
    <v-main class="main-content">
      <router-view />
    </v-main>
    
    <v-bottom-navigation
      v-model="activeTab"
      grow
      color="primary"
      class="bottom-nav"
      fixed
      app
      height="70"
    >
      <v-btn @click="navigateTo('/')" :value="0">
        <v-icon>mdi-home</v-icon>
        <span>Trang chủ</span>
      </v-btn>
      
      <v-btn @click="navigateTo('/messages')" :value="1">
        <v-icon>mdi-message</v-icon>
        <span>Tin nhắn</span>
      </v-btn>
      
      <v-btn @click="navigateTo('/trips')" :value="2">
        <v-icon>mdi-car</v-icon>
        <span>Chuyến đi</span>
      </v-btn>
      
      <v-btn @click="navigateTo('/promotions')" :value="3">
        <v-icon>mdi-gift</v-icon>
        <span>Khuyến mãi</span>
      </v-btn>
      
      <v-btn @click="navigateTo('/profile')" :value="4">
        <v-icon>mdi-account</v-icon>
        <span>Cá nhân</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeTab = ref(0)

// Map routes to tab indices
const routeToTabMap: Record<string, number> = {
  '/': 0,
  '/messages': 1,
  '/trips': 2,
  '/promotions': 3,
  '/profile': 4
}

// Set active tab based on current route
watch(() => route.path, (newPath) => {
  activeTab.value = routeToTabMap[newPath] ?? 0
}, { immediate: true })

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.main-content {
  padding-bottom: 70px; /* Height of bottom navigation */
  min-height: 100vh;
}

.bottom-nav {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000 !important;
  height: 70px !important;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  background: white !important;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.bottom-nav .v-btn {
  flex-direction: column;
  height: 70px !important;
  padding: 8px 4px !important;
}

.bottom-nav .v-btn span {
  font-size: 0.75rem;
  margin-top: 4px;
  font-weight: 500;
}

.bottom-nav .v-btn .v-icon {
  font-size: 24px;
}

/* Active tab styling */
.bottom-nav .v-btn--active {
  color: #667eea !important;
}

.bottom-nav .v-btn--active .v-icon {
  transform: scale(1.1);
}
</style>

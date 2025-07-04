<template>
  <v-app>
    <component :is="layoutComponent">
      <router-view />
    </component>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  return route.meta.requiresGuest ? AuthLayout : DefaultLayout
})

const authStore = useAuthStore()

onMounted(() => {
  // Check if user is already logged in
  authStore.checkAuthStatus()
})
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>

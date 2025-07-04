<template>
  <div class="logo-container">
    <div class="logo-circle">
      <v-icon size="48" color="white">mdi-car</v-icon>
    </div>
<!--    <img class="logo" src="../assets/lacgo.png" alt="lacgo">-->
<!--    <h1 class="app-name">Lạc GO</h1>-->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logo-container {
  text-align: center;
  margin-bottom: 32px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  top: 20px;
}

.app-name {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.logo {
  max-width: 350px;
  max-height: 200px;
}
</style>

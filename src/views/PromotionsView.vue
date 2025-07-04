<template>
  <v-container fluid class="promotions-container">
    <v-app-bar color="primary" dark flat>
      <v-app-bar-title>Khuyến mãi</v-app-bar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </v-app-bar>
    
    <div class="content-wrapper">
      <v-card class="promo-banner mb-4" elevation="4" rounded="lg">
        <v-img
          height="150"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 150'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234CAF50'/%3E%3Cstop offset='100%25' stop-color='%232E7D32'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='150' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' fill='white' font-size='24' font-weight='bold'%3EKhuyến mãi đặc biệt%3C/text%3E%3C/svg%3E"
          cover
        >
          <div class="promo-overlay">
            <h2 class="text-h5 font-weight-bold text-white mb-2">
              Giảm 50% chuyến đi đầu tiên
            </h2>
            <p class="text-white">Dành cho khách hàng mới</p>
          </div>
        </v-img>
      </v-card>
      
      <div class="promo-sections">
        <div class="section-header mb-4">
          <h3 class="text-h6 font-weight-bold">Mã giảm giá của bạn</h3>
        </div>
        
        <v-card
          v-for="promo in userPromotions"
          :key="promo.id"
          class="promo-card mb-3"
          elevation="2"
          rounded="lg"
        >
          <v-card-text>
            <div class="d-flex align-center">
              <div class="promo-icon">
                <v-icon :color="promo.color" size="40">{{ promo.icon }}</v-icon>
              </div>
              <div class="promo-details flex-grow-1 ml-4">
                <h4 class="text-subtitle-1 font-weight-bold">{{ promo.title }}</h4>
                <p class="text-caption text-medium-emphasis mb-1">{{ promo.description }}</p>
                <v-chip size="small" color="primary" variant="outlined">
                  {{ promo.code }}
                </v-chip>
              </div>
              <div class="promo-action">
                <v-btn
                  size="small"
                  color="primary"
                  variant="outlined"
                  @click="usePromotion(promo)"
                >
                  Sử dụng
                </v-btn>
              </div>
            </div>
            <v-divider class="my-3" />
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption text-medium-emphasis">
                Hết hạn: {{ promo.expiry }}
              </span>
              <v-progress-linear
                :model-value="promo.usage"
                color="primary"
                height="4"
                rounded
                class="flex-grow-1 mx-3"
              />
              <span class="text-caption">{{ promo.usage }}%</span>
            </div>
          </v-card-text>
        </v-card>
        
        <div v-if="userPromotions.length === 0" class="empty-state">
          <v-icon size="64" color="grey-lighten-2">mdi-gift-outline</v-icon>
          <h3 class="text-h6 text-medium-emphasis mt-4">Chưa có mã giảm giá</h3>
          <p class="text-medium-emphasis">Kiểm tra lại sau để nhận ưu đãi mới</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userPromotions = ref([
  {
    id: 1,
    title: 'Giảm 30%',
    description: 'Áp dụng cho chuyến đi dưới 50km',
    code: 'SAVE30',
    expiry: '31/12/2024',
    usage: 0,
    color: 'primary',
    icon: 'mdi-percent'
  },
  {
    id: 2,
    title: 'Miễn phí giao hàng',
    description: 'Giao hàng trong nội thành',
    code: 'FREESHIP',
    expiry: '25/12/2024',
    usage: 50,
    color: 'green',
    icon: 'mdi-truck-delivery'
  }
])

const usePromotion = (promo: any) => {
  console.log('Using promotion:', promo.code)
}
</script>

<style scoped>
.promotions-container {
  padding: 0;
  height: 100vh;
  overflow-y: auto;
}

.content-wrapper {
  padding: 16px;
  padding-top: 80px; /* Account for app bar */
}

.promo-banner {
  position: relative;
}

.promo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
}

.promo-card {
  border-left: 4px solid #4CAF50;
}

.promo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  text-align: center;
}
</style>
